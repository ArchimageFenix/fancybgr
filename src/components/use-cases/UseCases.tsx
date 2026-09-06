const useCases = [
  {
    number: "01",
    title: "E-commerce",
    description:
      "Create clean product images ready for online stores, catalogs, and marketplaces.",
  },
  {
    number: "02",
    title: "Social media",
    description:
      "Prepare subjects for posts, stories, thumbnails, and digital content in seconds.",
  },
  {
    number: "03",
    title: "Design & marketing",
    description:
      "Separate subjects from backgrounds for campaigns, presentations, and creative work.",
  },
  {
    number: "04",
    title: "Photography",
    description:
      "Turn portraits and photographs into clean transparent images without complex editing.",
  },
];

export default function UseCases() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Use cases
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              One tool. Many ways to use it.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-400 md:text-right">
            Whether you are preparing products, creating content, or working
            with photographs, FancyBGR keeps the process simple and local.
          </p>
        </div>

        <div className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <article
              key={useCase.number}
              className={`group relative p-8 transition-colors hover:bg-white/[0.04] md:p-10 ${
                index === 0
                  ? "border-b border-white/10 md:border-r"
                  : index === 1
                    ? "border-b border-white/10"
                    : index === 2
                      ? "border-b border-white/10 md:border-r md:border-b-0"
                      : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-neutral-500">
                  {useCase.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <div className="mt-16 max-w-md">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {useCase.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {useCase.description}
                </p>
              </div>

              <div className="mt-10 h-px w-12 bg-white/20 transition-all duration-300 group-hover:w-20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}