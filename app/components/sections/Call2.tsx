import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { H1, Small } from "../ui/Typography";
import { cn } from "@/lib/utils";
import circle from "@/public/circle.svg";
import Image from "next/image";

export function Call2() {
  return (
    <Section
      spacing="xl"
      className="bg-foreground text-background md:px-12 px-6"
    >
      <div className="flex max-md:flex-col items-start gap-10 md:gap-20 py-10 relative">
        <H1 className="font-bold text-background">
          De asas a sua história,
          <br /> vamos criar{" "}
          <span className="relative">
            <Image
              src={circle}
              alt="Circle"
              className="absolute right-3 bottom-0 w-60 h-auto z-10"
            />
            juntos.
          </span>
        </H1>
      </div>
      <Image
        src={"/alisjacket.png"}
        alt="Alis Jacket"
        className=""
        width={500}
        height={500}
      />
    </Section>
  );
}
