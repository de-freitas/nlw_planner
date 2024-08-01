import { CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: Date;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export default function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities?.map((category, index) => {
        return (
          <div key={index} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="font-semibold text-xl text-zinc-300">
                Dia {format(category.date, "dd")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>

            {category.activities.length > 0 ? (
              <div>
                {category.activities.map((activity) => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, "kk:mm")}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>

    // <div className="space-y-8">
    //       <div className="space-y-2.5">
    //         <div className="flex gap-2 items-baseline">
    //           <span className="font-semibold text-xl text-zinc-300">Dia 17</span>
    //           <span className="text-xs text-zinc-500">Sábado</span>
    //         </div>
    //         <p className="text-zinc-500 text-sm">
    //           Nenhuma atividade cadastrada nessa data.
    //         </p>
    //       </div>

    //       <div className="space-y-2.5">
    //         <div className="flex gap-2 items-baseline">
    //           <span className="font-semibold text-xl text-zinc-300">Dia 18</span>
    //           <span className="text-xs text-zinc-500">Domingo</span>
    //         </div>

    //         <div className="space-y-2.5">
    //           <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
    //             <CircleCheck className="size-5 text-lime-300" />
    //             <span className="text-zinc-100">Academia em grupo</span>
    //             <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
    //           </div>
    //         </div>

    //         <div className="space-y-2.5">
    //           <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
    //             <CircleCheck className="size-5 text-lime-300" />
    //             <span className="text-zinc-100">Academia em grupo</span>
    //             <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
}
