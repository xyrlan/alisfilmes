import { Hero } from "@/app/components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import BrandMarquee, { defaultBrands } from "./components/ui/BrandMarquee";
import { Body, Small } from "./components/ui/Typography";
import { Services } from "./components/sections/Services";
import { Call } from "./components/sections/Call";

export default async function Home() {

  // await delay(2000);

  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <Services />
      <Call />
      <Projects />
      <div className="grid grid-cols-12 border-t border-foreground/30 py-12 md:py-24 md:px-12 px-6">
        <Body className="font-semibold col-span-2">Trusted by</Body>
        <BrandMarquee
          brands={defaultBrands}
          speed={25}
          direction="left"
          pauseOnHover={true}
          className="col-span-10"
        />
      </div>
    </Suspense>
  );
}
