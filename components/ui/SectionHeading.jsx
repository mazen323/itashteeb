// light = the heading sits on a dark band
export default function SectionHeading({ title, description, light = false }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
      <h2
        className={`text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ${
          light ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-base leading-relaxed md:text-lg ${
          light ? "text-brand-100/85" : "text-stone-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
