import { Hero } from "@/app/components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Suspense } from "react";
import Loading from "./loading";
import { Services } from "./components/sections/Services";
import { Call } from "./components/sections/Call";
import { Brands } from "./components/sections/Brands";
import { Call2 } from "./components/sections/Call2";

export default async function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <Services />
      <Call />
      <Projects />
      <Brands />
      <Call2 />
    </Suspense>
  );
}
