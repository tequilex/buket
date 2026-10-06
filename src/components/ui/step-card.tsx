interface Step {
  /** Двузначный номер шага, «01» … «05». */
  n: string;
  title: string;
  text: string;
}

interface StepsProps {
  steps: Step[];
}

/**
 * «Пунктир»: кружки в ряд, соединённые штриховой линией через их центры.
 * Последний шаг — тёмный, он закрывает цепочку.
 *
 * На мобильном линия разворачивается в вертикальный таймлайн слева.
 */
/** Колонок столько же, сколько шагов. Инлайн-стиль здесь нельзя: он перебил бы
 *  мобильный `grid-cols-1`. */
const columns: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
};

export function StepsDotted({ steps }: StepsProps) {
  return (
    <div
      className={[
        'relative grid gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-0',
        columns[steps.length] ?? 'grid-cols-4',
      ].join(' ')}
    >
      {/* Пунктир через центры кружков: горизонтальный на десктопе, вертикальный на мобильном */}
      <span
        aria-hidden="true"
        className="absolute top-10 right-[10%] left-[10%] border-t-2 border-dashed border-ink opacity-30 max-md:inset-y-6 max-md:top-6 max-md:right-auto max-md:left-5.75 max-md:border-t-0 max-md:border-l-2"
      />
      {steps.map((step, index) => {
        const last = index === steps.length - 1;

        return (
          <div
            key={step.n}
            className="relative flex flex-col items-center gap-2.5 text-center max-md:grid max-md:grid-cols-[48px_1fr] max-md:items-start max-md:gap-x-4 max-md:gap-y-1 max-md:pb-6 max-md:text-left"
          >
            <span
              className={[
                'flex size-22 items-center justify-center rounded-full border-[6px] border-page font-display text-[20px] font-bold',
                'max-md:size-12 max-md:border-4 max-md:text-[16px]',
                last ? 'bg-ink text-primary' : 'bg-primary text-ink',
              ].join(' ')}
            >
              {step.n}
            </span>
            <h3 className="mt-1.5 font-display text-[18px] leading-[1.2] font-bold text-ink max-md:col-start-2 max-md:mt-2 max-md:text-[16px]">
              {step.title}
            </h3>
            <p className="max-w-[24ch] text-[14px] text-mute text-pretty max-md:col-start-2 max-md:max-w-none">
              {step.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

interface StepsBandProps extends StepsProps {
  title: string;
}

/** «Жёлтый блок»: заголовок и белые карточки шагов на жёлтой плитке. */
export function StepsBand({ title, steps }: StepsBandProps) {
  return (
    <section className="mx-3 rounded-2xl bg-primary p-12 max-md:mx-2 max-md:rounded-xl max-md:px-4 max-md:pt-6 max-md:pb-4">
      <h2 className="font-display text-[40px] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance max-md:text-[24px]">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:mt-4 max-md:grid-cols-1">
        {steps.map((step) => (
          <div
            key={step.n}
            className="flex min-h-50 flex-col gap-2.5 rounded-xl bg-card p-6 max-md:grid max-md:min-h-0 max-md:grid-cols-[40px_1fr] max-md:items-start max-md:gap-x-3 max-md:gap-y-0.5 max-md:rounded-[20px] max-md:p-4"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-ink text-[15px] font-bold text-primary max-md:size-10 max-md:text-[14px]">
              {step.n}
            </span>
            <h3 className="mt-3 font-display text-[18px] font-bold text-ink max-md:col-start-2 max-md:mt-0 max-md:text-[15px]">
              {step.title}
            </h3>
            <p className="text-[15px] text-mute text-pretty max-md:col-start-2 max-md:text-[14px]">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
