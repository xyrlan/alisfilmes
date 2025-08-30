"use client"

import { motion } from "motion/react";
import { Section } from "../ui/Section";
import { VideoLoader } from "../ui/VideoLoader";
import Image from "next/image";
import { H1, H2 } from "../ui/Typography";

export function Hero() {
    return (
        <Section className="h-screen relative overflow-hidden" spacing="sm">
            <VideoLoader
                src="https://alisfilmes.s3.sa-east-1.amazonaws.com/alisteaser.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full"
                videoClassName="w-full h-full object-cover"
            >
                <div className="absolute inset-0 w-full h-full bg-black/40 scale-y-110" />
                <div
                    className="z-20 mix-blend-hard-light flex origin-top flex-col w-full h-full items-center justify-between">
                    <div className="flex flex-col items-center justify-center flex-1">
                        <motion.div
                            initial={{ scale: 0, opacity: 0, y: 50 }}
                            animate={{
                                scale: [0, 0.8, 1.1, 1],
                                opacity: [0, 0.7, 1, 1],
                                y: [50, 0, -10, 0]
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 0.8, 0.25, 1],
                                times: [0, 0.5, 0.8, 1],
                                delay: 0.3
                            }}
                        >
                            <Image
                                src="/alishorizontal-branca.png"
                                alt="Hero"
                                width={750}
                                height={750}
                                className="object-contain drop-shadow-2xl -translate-x-10"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.8, 0.25, 1],
                                delay: 1.2
                            }}
                        >
                            <H2 className="max-w-6xl text-center mt-20 font-light">
                                Acelerando crescimento atraves de marketing e tecnologia.
                            </H2>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 1.8
                        }}
                        whileHover={{
                            scale: 1.1,
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                        className="cursor-pointer"
                    >
                        <Image
                            src="/scroll.svg"
                            alt="Scroll"
                            width={100}
                            height={100}
                            className="drop-shadow-lg"
                        />
                    </motion.div>
                </div>
            </VideoLoader>
        </Section>
    )
}   