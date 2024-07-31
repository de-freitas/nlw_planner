import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export default function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[40rem] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-100 font-semibold">{}</span> , nas datas
            de <span className="text-zinc-100 font-semibold">{}</span>, preencha
            seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-5 gap-2 flex-1 p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              onChange={(event) => setOwnerName(event.target.value)}
              name="name"
              required
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="h-14 px-5 gap-2 flex-1 p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              onChange={(event) => setOwnerEmail(event.target.value)}
              name="email"
              required
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              placeholder="Seu e-mail pessoal"
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Criar confirmação da viagem{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}
