export default function SectionHeading({ title, description }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-stone-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}
