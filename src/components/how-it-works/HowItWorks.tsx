const steps = [
  {
    number: "01",
    title: "Drag your Image to the Drop area",
    description:
      "Select one or multiple images from your device, or simply drag them into FancyBGR.",
  },
  {
    number: "02",
    title: "AI removes the background",
    description:
      "FancyBGR processes your images directly in your browser using an AI segmentation model.",
  },
  {
    number: "03",
    title: "Download your result",
    description:
      "Preview the result and download your image as a transparent PNG.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-neutral-200 bg-neutral-50 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Background removal without the complicated workflow.
          </h2>

          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Upload your images, let FancyBGR process them locally, and
            download the finished result.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-neutral-200 bg-white p-8"
            >
              <span className="text-sm font-semibold text-neutral-400">
                {step.number}
              </span>

              <h3 className="mt-8 text-xl font-semibold tracking-tight text-neutral-950">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}