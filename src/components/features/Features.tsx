const features = [
  {
    number: "01",
    title: "Runs in your browser",
    description:
      "The image-processing engine runs directly on your device instead of sending your images to a remote server.",
  },
  {
    number: "02",
    title: "AI-powered segmentation",
    description:
      "An AI segmentation model identifies the subject and generates a precise mask for background removal.",
  },
  {
    number: "03",
    title: "Original dimensions",
    description:
      "Inference can use a controlled working size while the final result keeps the dimensions of your original image.",
  },
  {
    number: "04",
    title: "Built for multiple images",
    description:
      "Process several images sequentially to keep memory usage under control, especially on mobile devices.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-neutral-200 bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Features
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              Powerful processing.
              <br />
              Simple experience.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
              FancyBGR combines local browser processing with AI segmentation
              to make background removal simple without requiring a traditional
              image editor.
            </p>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group grid gap-5 py-8 sm:grid-cols-[64px_1fr] sm:gap-8"
              >
                <span className="text-sm font-medium text-neutral-400">
                  {feature.number}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}