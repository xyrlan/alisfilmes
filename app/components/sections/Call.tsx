import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { H1, Small } from "../ui/Typography";
import { cn } from "@/lib/utils";
import circle from "@/public/circle.svg";
import Image from "next/image";

export function Call() {
    return (
        <Section spacing="xl" className="bg-foreground text-background">
            <Container>
                <div className="flex items-start gap-20 py-10 relative">
                    <Small className="text-semibold" >Connect</Small>
                    <H1 className="font-semibold text-background">O que nos podemos fazer por você?</H1>
                    <Image src={circle} alt="Circle" className="absolute right-5 bottom-7 w-52 z-10" />
                </div>
                <div className="flex items-center group cursor-pointer py-10">
                    <Button size="xl" className={cn("rounded-full p-8 group shadow-lg bg-background text-foreground",
                    )}>
                        <p>Fale conosco</p>
                    </Button>
                    <span className={cn("flex items-center justify-center text-sm group-hover:opacity-100 opacity-100 group-hover:translate-x-5 transition-all duration-500 rounded-full p-4 bg-background text-foreground",
                    )}>
                        <ArrowRight className={cn("w-7 h-7")} />
                    </span>
                </div>
            </Container>
        </Section>
    )
}   