import Header from "@/components/layout/Header";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import UploadArea from "@/components/upload/UploadArea";
import UseCases from "@/components/use-cases/UseCases";
import TrustBar from "@/components/layout/TrustBar";
import Features from "@/components/features/Features";
import FAQ from "@/components/faq/FAQ";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="px-6 pb-24 pt-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              AI background removal
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
              Remove image backgrounds
              <br />
              directly in your browser.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Remove backgrounds from your images locally with AI.
              Your images never leave your device.
            </p>

            <div className="mt-12 w-full">
              <UploadArea />
            </div>

            <TrustBar />
          </div>
        </section>

        <HowItWorks />

        <UseCases />

        <Features />
        <FAQ />
      </main>
    </>
  );
}