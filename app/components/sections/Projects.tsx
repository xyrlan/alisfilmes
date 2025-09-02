"use client"
import { cn } from "@/lib/utils";
import { Section } from "../ui/Section";
import { H0, H4 } from "../ui/Typography";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

export function Projects() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const [lastHoveredProject, setLastHoveredProject] = useState<number | null>(null)

    const projects = [
        {
            title: "Lançamento para a marca já estabelecida Frango no Pote",
            description: "Descrição do projeto 1",
            image: "https://alisfilmes.s3.sa-east-1.amazonaws.com/fnp.mp4",
            bgcolor: "bg-red-200",
            color: "text-red-950"

        },
        {
            title: "Reels para Pilotis Imóveis",
            description: "Descrição do projeto 3",
            image: "https://alisfilmes.s3.sa-east-1.amazonaws.com/pilotis2.mp4",
            bgcolor: "bg-orange-200",
            type: "reels",
            color: "text-green-950"
        },
        {
            title: "Isofen 10 anos - Teaser",
            description: "Descrição do projeto 4",
            image: "https://alisfilmes.s3.sa-east-1.amazonaws.com/isofen.mp4",
            bgcolor: "bg-green-200",
            color: "text-amber-950"
        },
        {
            title: "Reels para Açaí Puríssimo",
            description: "Descrição do projeto 2",
            image: "https://alisfilmes.s3.sa-east-1.amazonaws.com/acai.mp4",
            type: "reels",
            bgcolor: "bg-purple-200",
            color: "text-purple-950"
        },
    ]

    return (
        <Section spacing="xl" className={cn(
            "overflow-hidden relative max-h-full max-w-full md:px-8 px-6 transition-all duration-700",
            // hoveredProject !== null && projects[hoveredProject].color
        )}>
            <div className={cn(
                "absolute top-0 left-0 w-full h-full -z-20 ransition-all duration-500",
                //  hoveredProject !== null && projects[hoveredProject].bgcolor
            )} />
            <H4>Projetos</H4>
            <div className="flex flex-col items-start w-full z-10">
                {projects.map((project, index) => (
                    <div key={project.title} className={cn(
                        "flex border-b w-full",
                        index === projects.length - 1 && "border-b-0", hoveredProject !== null ? "border-background/30" : "border-foreground/30"
                    )}>
                        <Link
                            href={`/projects/${project.title}`}
                            onMouseEnter={() => {
                                setHoveredProject(index)
                                setLastHoveredProject(index)
                            }}
                            onMouseLeave={() => {
                                setHoveredProject(null)
                            }}
                            className="py-14 flex items-center gap-5 group"
                        >
                            <H0 className={cn(
                                "font-medium group-hover:opacity-100 group-hover:brightness-125 transition-all duration-300 opacity-60",
                                index === lastHoveredProject && "opacity-100 brightness-110",
                                hoveredProject !== null && "opacity-70",
                                // hoveredProject !== null && projects[hoveredProject].color
                            )}>
                                {project.title}
                            </H0>
                            <span className={cn("flex items-center justify-center text-sm group-hover:opacity-100 group-hover:translate-x-0 opacity-0 translate-x-10 transition-all duration-500 rounded-full p-4 hover:",
                                // hoveredProject !== null && projects[hoveredProject].color,
                                hoveredProject !== null && "bg-foreground/40"
                            )}>
                                <ArrowRight className={cn(
                                    "w-7 h-7",
                                    // hoveredProject !== null && projects[hoveredProject].color
                                )} />
                            </span>
                        </Link>

                    </div>
                ))}
                <div className="flex items-center group cursor-pointer mt-5">
                    <Button size="xl" className={cn("rounded-full p-8 group shadow-lg bg-foreground text-background",
                        //  hoveredProject !== null && projects[hoveredProject].color,
                        // hoveredProject !== null ? "bg-background/10" : "bg-foreground",
                        // hoveredProject !== null ? projects[hoveredProject].color : "text-background"
                    )}>
                        <p>Ver mais projetos</p>
                    </Button>
                    <span className={cn("flex items-center justify-center text-sm group-hover:opacity-100 opacity-100 group-hover:translate-x-5 transition-all duration-500 rounded-full p-4 bg-foreground text-background",
                        // hoveredProject !== null && projects[hoveredProject].color,
                        // hoveredProject !== null ? "bg-background/10" : "bg-foreground",
                        // hoveredProject !== null ? projects[hoveredProject].color : "text-background"
                    )}>
                        <ArrowRight className={cn("w-7 h-7")} />
                    </span>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 w-[70%] h-full antialiased -z-10">
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={cn(
                                "w-full h-full transition-all duration-500 overflow-hidden opacity-90",
                            )}
                        >
                            {/* <div className="absolute inset-0 w-full h-full bg-black/20 scale-110" /> */}
                            <video
                                src={project.image}
                                className={cn(`mask-l-from-90% absolute right-0 bottom-0 object-cover transition-all origin-center duration-300 z-10 delay-200`,
                                    index === lastHoveredProject ? "opacity-100 translate-x-0" : "opacity-0 translate-x-50",
                                    project.type === "reels" ? "h-full" : "  h-full",
                                )}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                poster={project.image}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </Section>
    )
}