"use client";

import { useState } from "react";

const questions = [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. FancyBGR is designed to process your images directly in your browser. Your images do not need to be uploaded to a processing server.",
  },
  {
    question: "Is FancyBGR free to use?",
    answer:
      "Yes. The goal of FancyBGR is to provide background removal without requiring an account, subscription, or watermark.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "The initial version supports PNG, JPG, JPEG, and WEBP images. Additional formats such as HEIC can be added later.",
  },
  {
    question: "Does the output keep the original image size?",
    answer:
      "Yes. The AI may use a controlled working resolution during inference, but the final transparent image is reconstructed at the original image dimensions.",
  },
  {
    question: "Can I process multiple images?",
    answer:
      "Yes. Multiple images can be selected at once. FancyBGR processes them sequentially to keep memory usage under control.",
  },
  {
    question: "Will it work without an internet connection?",
    answer:
      "After the required AI model and browser resources have been downloaded and cached, the processing pipeline can work locally without sending your images to a server.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="border-t border-neutral-200 bg-neutral-50 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Questions, answered.
          </h2>

          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Everything you need to know about how FancyBGR handles your
            images.
          </p>
        </div>

        <div className="mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-neutral-950 md:text-lg">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-xl text-neutral-600 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-200 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pr-12 text-sm leading-7 text-neutral-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}