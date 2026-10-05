interface StepCardProps {
  /** Двузначный номер шага, «01» … «04». */
  n: string;
  title: string;
  text: string;
}

/** Нумерованный шаг для зелёной полосы. Полупрозрачная белая заливка. */
export function StepCard({ n, title, text }: StepCardProps) {
  return (
    <div className="flex flex-col bg-fill-on-dark px-4.5 pt-6.5 pb-10">
      <b className="mb-4.5 font-display text-numeral tracking-[-0.01em] text-[rgb(255_255_255_/_0.42)]">
        {n}
      </b>
      <h3 className="type-heading-md text-white">{title}</h3>
      <p className="mt-2 text-sm text-[rgb(255_255_255_/_0.8)] text-pretty">{text}</p>
    </div>
  );
}
