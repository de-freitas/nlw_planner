import { useState } from "react";

import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { capitalizeMonths } from "../../../utils/formatMonthsToCapitalize";
import Button from "../../../components/button";

import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isGestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export default function DestinationAndDateStep({
  isGestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? capitalizeMonths(
          format(eventStartAndEndDates.from, "d LLL", { locale: ptBR })
        )
          .concat(" até ")
          .concat(
            capitalizeMonths(
              format(eventStartAndEndDates.to, "d LLL ' de '", { locale: ptBR })
            )
          )
          .concat(eventStartAndEndDates?.to.getFullYear().toString())
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shap gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          disabled={isGestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          onChange={(event) => setDestination(event?.target.value)}
        />
      </div>

      <button
        disabled={isGestsInputOpen}
        className="flex items-center gap-2 text-left"
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg text-zinc-400 w-56">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary" size="default">
          Alterar local/data
          <Settings2 className="size-5" />{" "}
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary" size="default">
          {" "}
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
