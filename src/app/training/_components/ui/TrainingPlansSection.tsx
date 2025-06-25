import { Button } from "@/app/_components/ui/button";

interface TrainingPlansSectionProps {
  onShowAddPlanDialog: () => void;
  trainingPlanTable: React.ReactNode;
}

export default function TrainingPlansSection({
  onShowAddPlanDialog,
  trainingPlanTable
}: TrainingPlansSectionProps) {
  return (
    <div className="space-y-4 flex flex-col items-start mt-16 mb-18">
      <div className="w-[90%] max-w-6xl mx-auto">
        <div className="border border-slate-200 rounded-lg bg-white shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">Training Plans</h3>
              <Button 
                onClick={onShowAddPlanDialog}
                className="bg-blue-600 hover:bg-blue-700 w-fit"
              >
                Add Training Plan
              </Button>
            </div>
          </div>
          <div className="p-6">
            {trainingPlanTable}
          </div>
        </div>
      </div>
    </div>
  );
} 