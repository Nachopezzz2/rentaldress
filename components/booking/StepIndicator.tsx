type Props = {
  currentStep: 1 | 2 | 3;
  type?: string;
};

const STEPS = [
  { n: 1, label: "Categoría" },
  { n: 2, label: "Fecha y hora" },
  { n: 3, label: "Tus datos" },
];

export default function StepIndicator({ currentStep, type }: Props) {
  const visibleSteps =
    type === "accesorios"
      ? [STEPS[0], STEPS[2]] // skip step 2 for accessories
      : STEPS;

  return (
    <div className="flex items-center gap-0 mb-14">
      {visibleSteps.map((step, i) => {
        const isActive = currentStep === step.n;
        const isDone = currentStep > step.n;

        return (
          <div key={step.n} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-6 h-px transition-colors duration-300 ${
                  isActive || isDone ? "bg-foreground" : "bg-border"
                }`}
              />
              <span
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : isDone
                    ? "text-primary"
                    : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < visibleSteps.length - 1 && (
              <div className="w-12 md:w-20 h-px bg-border mx-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}
