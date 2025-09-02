"use client"
import Image from "next/image";
import { Section } from "../ui/Section";
import { H0, H1, H2, H3, H4, Small } from "../ui/Typography";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Services() {
    const services = [
        {
            title: "Documentários",
            description: "Produção de documentários para o seu negócio",
            image: "/services/documentary.jpg",
        },
        {
            title: "Conteúdo para redes sociais",
            description: "Produção de reels para o seu negócio e redes sociais",
            image: "/services/reels.png",
        },
        {
            title: "Institucionais",
            description: "Produção de institucionais para o seu negócio",
            image: "/services/institucional.jpg",
        },
        {
            title: "Manifestos",
            description: "Produção de manifestos para o seu negócio",
            image: "/services/manifesto.jpg",
        },
        {
            title: "Comerciais para TV e streaming",
            description: "Produção de comerciais para TV e streaming para o seu negócio",
            image: "/services/commercial.png",
        },
        {
            title: "Video de ativação da marca",
            description: "Produção de video de ativação da marca para o seu negócio",
            image: "/services/brand.jpg",
        }
    ]
    return (
        <Section spacing="xl" className="md:px-8 px-6 bg-foreground text-background">
            <H1 className="font-semibold text-background">Seu parceiro de confiança para inovação em seis ofertas de serviços estratégicos:</H1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-20 md:pt-32 md:space-y-20">
                {services.map((service, index) => (
                    <motion.div key={service.title} className={cn(
                        "relative group",
                        index % 2 === 0 ? "translate-y-0" : "translate-y-20"
                    )}
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.8, 0.25, 1],
                            delay: 0.1 * index
                        }}
                        viewport={{ once: true }}
                    >
                        <H0 className="font-black absolute right-0 -top-12 -z-10 text-white brightness-125 group-hover:-translate-y-5 transition-all duration-500" as="span">
                            0{index + 1}
                        </H0>
                        <motion.div className={cn("w-full max-h-[371px] rounded-md overflow-hidden",
                        )}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.225, 0.8, 0.25, 1],
                                delay: 0.1 * index
                            }}
                            viewport={{ once: true }}
                        >
                            <Image src={service.image} alt={service.title} width={500} height={500} className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500" />
                        </motion.div>
                        <H4 className="font-bold text-background py-4">{service.title}</H4>
                        <Small className="text-background/80">{service.description}</Small>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}