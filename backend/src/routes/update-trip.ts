import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";

import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer";

import { capitalizeMonths } from "../utils/formatToCapitalize";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId/update-trip",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(3),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { destination, starts_at, ends_at } = request.body;

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new ClientError(`Invalid trip start date.`);
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new ClientError(`Invalid trip end date`);
      }

      const trip = await prisma.trips.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new ClientError(`Trip not found!`);
      }

      await prisma.trips.update({
        where: { id: tripId },
        data: {
          destination,
          starts_at,
          ends_at,
        },
      });

      const participantsNotOwners = await prisma.participants.findMany({
        where: {
          trip_id: tripId,
          is_owner: false,
        },
      });

      if (participantsNotOwners.length > 0) {
        await prisma.participants.updateMany({
          where: {
            id: {
              in: participantsNotOwners?.map((participant) => participant.id),
            },
          },
          data: {
            is_confirmed: false,
          },
        });

        const formattedStartDateToBR = dayjs(starts_at).format("LL");
        const formattedEndDateToBR = dayjs(ends_at).format("LL");

        const formattedStartDate = capitalizeMonths(formattedStartDateToBR);
        const formattedEndDate = capitalizeMonths(formattedEndDateToBR);

        const mail = await getMailClient();

        await Promise.all([
          participantsNotOwners.map(async (participant) => {
            const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

            const message = await mail.sendMail({
              from: {
                name: "Equipe Plann.er",
                address: "oi@planner.com.br",
              },
              to: participant.email,
              subject: `Sua Viagem Foi Atualizada`,
              html: `<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
                    <p>Prezado(a), sua viagem foi atualizada.</p>
                    <p></p>
                    <p>Destino: <strong>${trip.destination}</strong></p> 
                    <p>Datas: <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
                    <p></p>
                    <p>Será necessário confirmar novamente sua presença no link abaixo:</p>
                    <p></p>
                    <p><a href=${confirmationLink}>Confirmar viagem</a></p>
                    <p></p>
                    <p>Caso você não saiba do que se trata esse e-mail, apenas ignore.</p>
                  </div>
                  `.trim(),
            });

            console.log(nodemailer.getTestMessageUrl(message));
          }),
        ]);
      }

      return `Viagem atualizada`;
    }
  );
}
