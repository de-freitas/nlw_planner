import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { ClientError } from "../errors/client-error";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activity",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(3),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { title, occurs_at } = request.body;

      const trip = await prisma.trips.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new ClientError(`Trip not found!`);
      }

      if (dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new ClientError(
          `Invalid activity date! 'occurs_at' param is before 'starts_at' trip`
        );
      }

      if (dayjs(occurs_at).isAfter(trip.ends_at)) {
        throw new ClientError(
          `Invalid activity date! 'occurs_at' param is after 'ends_at' trip`
        );
      }

      const activity = await prisma.activities.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId,
        },
      });

      return { activityId: activity.id };
    }
  );
}
