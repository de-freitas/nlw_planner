import { ArrowRight, UserRoundPlus } from "lucide-react";
import Button from "../../../components/button";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  emailsToInvite: string[];
  openConfirmTripModal: () => void;
}

export default function InviteGuestsStep({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shap gap-3">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length === 0 ? (
          <span className="text-zinc-400 text-lg ">Quem estará na viagem?</span>
        ) : (
          <span className="text-zinc-100 text-lg ">
            {emailsToInvite.length === 1
              ? `${emailsToInvite.length} pessoa convidada`
              : `${emailsToInvite.length} pessoas convidadas`}
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmTripModal} variant="primary" size="default">
        Confirmar Viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
