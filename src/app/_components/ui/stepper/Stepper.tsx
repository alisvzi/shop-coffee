import Link from "next/link";

const Stepper = ({ steps, currentStep }) => {
  const getStatus = (stepId) => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    const stepIndex = steps.findIndex((s) => s.id === stepId);
    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  return (
    <div className="bg-gradient-to-r from-gradient-first to-base-content text-white p-8 shadow-lg">
      <nav className="flex justify-center items-center rtl:space-x-reverse">
        {steps.map((step, index) => {
          const status = getStatus(step.id);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {status !== "pending" ? (
                <Link
                  href={step.href}
                  className={`text-2xl font-extrabold transition-colors duration-300 ${
                    status === "active"
                      ? "text-white underline decoration-accent-content decoration-4"
                      : "text-success"
                  }`}
                >
                  {step.label}
                </Link>
              ) : (
                <p className="text-base-25/70 text-2xl font-semibold cursor-default">
                  {step.label}
                </p>
              )}

              {!isLast && (
                <div className="mx-6 flex items-center">
                  <svg
                    width={22}
                    height={22}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.248 17.648a1.2 1.2 0 0 1-1.696 0l-4.8-4.8a1.2 1.2 0 0 1 0-1.696l4.8-4.8a1.2 1.2 0 0 1 1.696 1.696L6.497 10.8H20.4a1.2 1.2 0 1 1 0 2.4H6.497l2.751 2.752a1.2 1.2 0 0 1 0 1.696Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Stepper;
