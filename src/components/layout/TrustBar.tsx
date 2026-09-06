const benefits = [
  {
    title: "100% local",
    description: "Processing happens in your browser",
  },
  {
    title: "Private",
    description: "Your images never leave your device",
  },
  {
    title: "Full resolution",
    description: "Keep the original image dimensions",
  },
  {
    title: "No account",
    description: "Use FancyBGR without signing up",
  },
];

export default function TrustBar() {
  return (
    <div className="mt-8 grid w-full max-w-4xl grid-cols-1 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="px-5 py-5 text-center">
          <p className="text-sm font-semibold text-neutral-950">
            {benefit.title}
          </p>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
}