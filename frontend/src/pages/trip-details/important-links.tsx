import { Link2, Plus } from "lucide-react";
import Button from "../../components/button";

export default function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-bold text-zinc-100">
              Reserva AirBnB
            </span>
            <a
              href="#"
              className="block text-xm text-zinc-400 truncate hover:text-zinc-200"
            >
              https://airbnb.com/reserva/...................................
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-bold text-zinc-100">Reserva Avião</span>
            <a
              href="#"
              className="block text-xm text-zinc-400 truncate hover:text-zinc-200"
            >
              https://airfrance.com/reserve/...................................
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>
      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
