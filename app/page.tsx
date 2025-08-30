import { Hero } from "@/app/components/sections/Hero";
import { Projects } from "./components/Projects";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import BrandMarquee, { defaultBrands } from "./components/ui/BrandMarquee";
import { Section } from "./components/ui/Section";
import { Body, Small } from "./components/ui/Typography";
import { Services } from "./components/sections/Services";

export default async function Home() {

  await delay(2000);

  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <Services />
      <Projects />
      <div className="border-t border-white py-12 md:py-24 flex gap-20 md:px-12 px-6">
        <Body className="font-semibold">Trusted by</Body>
        <BrandMarquee
          brands={defaultBrands}
          speed={25}
          direction="left"
          pauseOnHover={true}
        />
      </div>
    </Suspense>
  );
}
