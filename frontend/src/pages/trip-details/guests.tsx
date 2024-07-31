import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CircleDashed, CircleCheck, UserCog } from "lucide-react";
import Button from "../../components/button";
import { api } from "../../lib/axios";

interface GuestsProps {
  openCreateActivityModal: () => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export default function Guests({ openCreateActivityModal }: GuestsProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-bold text-zinc-100">
                  {participant.name ? participant.name : `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="text-lime-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          );
        })}

        {/* <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-bold text-zinc-100">Daniel Craig</span>
            <span className="block text-sm text-zinc-400 truncate">
              craig.daniel@gmail.com
            </span>
          </div>
          <CircleCheck className="text-lime-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-bold text-zinc-100">Shakira</span>
            <span className="block text-sm text-zinc-400 truncate">
              shakira.2014@gmail.com
            </span>
          </div>
          <CircleCheck className="text-lime-400 size-5 shrink-0" />
        </div> */}
      </div>

      <Button onClick={openCreateActivityModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
