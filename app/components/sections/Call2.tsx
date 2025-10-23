import { Section } from "../ui/Section";
import { H1 } from "../ui/Typography";
import { ProgressiveForm } from "../ui/ProgressiveForm";
import circle from "@/public/circle.svg";
import Image from "next/image"

export function Call2() {
  return (
    <Section
      id="contato"
      spacing="xl"
      className="bg-foreground text-background md:px-12 px-6"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 py-10">
        {/* Left Column - Header */}
        <div className="relative">
          <H1 className="font-bold text-background mb-6">
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
          <p className="text-background/80 text-lg leading-relaxed">
            Preencha o formulário ao lado e vamos começar a transformar suas ideias em realidade.
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="relative">
          <ProgressiveForm />
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
            <Image
              src={"/alisjacket.png"}
              alt="Alis Jacket"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
