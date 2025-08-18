"use client"

import { motion } from "motion/react";
import { Section } from "../ui/Section";
import { VideoLoader } from "../ui/VideoLoader";
import Image from "next/image";

export function Hero() {
    return (
        <Section className="h-screen relative" spacing="sm">
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="border-white border-2 absolute inset-0 z-40 m-6 rounded">

                </motion.div>

            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.8] }}
                transition={{ duration: 10, ease: "easeInOut", times: [0, 0.5, 1] }}
                className="bg-black/50 absolute inset-0 h-full w-full z-10"></motion.div>
            <VideoLoader
                src="/alisteaser.mov"
                autoPlay
                muted
                loop
                className="w-full h-full"
                videoClassName="w-full h-full object-cover"
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.2,
                        bottom: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "50%"
                    }}
                    animate={{
                        opacity: [0, 1, 1],
                        scale: [0.2, 1.1, 0.6],
                        bottom: ["50%", "50%", 0],
                        left: ["50%", "50%", 0],
                        translateX: ["-50%", "-50%", 0],
                        translateY: ["50%", "50%", 0]
                    }}
                    transition={{
                        duration: 3,
                        times: [0, 0.4, 1],
                        ease: ["easeOut", "easeInOut", "easeInOut"],
                        delay: 0
                    }}
                    className="absolute flex items-center justify-center z-20"
                >
                    <Image
                        src="/logobranconobg.png"
                        alt="Hero"
                        width={300}
                        height={300}
                        className="object-cover drop-shadow-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 3 }}
                        className="absolute -right-[110%] bottom-9"
                    >
                        <Image
                            src="/alisvertical.png"
                            alt="Hero"
                            width={400}
                            height={300}
                            className="object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            </VideoLoader>
        </Section>
    )
}   