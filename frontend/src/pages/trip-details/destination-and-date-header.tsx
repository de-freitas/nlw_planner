import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { capitalizeMonths } from "../../utils/formatMonthsToCapitalize";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export default function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  let displayedDate =
    trip?.starts_at && trip.ends_at
      ? capitalizeMonths(format(trip?.starts_at, "d LLL", { locale: ptBR }))
          .concat(" até ")
          .concat(
            capitalizeMonths(format(trip.ends_at, "d LLL", { locale: ptBR }))
          )
      : null;

  if (
    trip?.starts_at == trip?.ends_at &&
    trip?.starts_at != null &&
    trip.ends_at != null
  ) {
    displayedDate = capitalizeMonths(
      format(trip?.starts_at, "d LLL", { locale: ptBR })
    );
  }

  console.log(typeof displayedDate);
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100"> {trip?.destination} </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100"> {displayedDate} </span>
        </div>

        <div className="w-px h-6 bg-zinc-800"></div>
        <Button variant="secondary">
          {" "}
          Alterar local/data <Settings2 />{" "}
        </Button>
      </div>
    </div>
  );
}
