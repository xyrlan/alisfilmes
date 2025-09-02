"use client"

import { motion } from "motion/react";
import { Section } from "../ui/Section";
import { VideoLoader } from "../ui/VideoLoader";
import Image from "next/image";
import { H2 } from "../ui/Typography";

// Constants for better maintainability
const VIDEO_CONFIG = {
    src: "https://alisfilmes.s3.sa-east-1.amazonaws.com/alisteaser.mp4",
    autoPlay: true,
    muted: true,
    loop: true,
};

const LOGO_CONFIG = {
    src: "/alishorizontal-branca.png",
    alt: "Alis Filmes Logo",
    width: 750,
    height: 750,
};

const SCROLL_CONFIG = {
    src: "/scroll.svg",
    alt: "Scroll indicator",
    width: 100,
    height: 100,
};

const TAGLINE = "Acelerando crescimento atraves de marketing e tecnologia.";

// Animation variants
const logoAnimation = {
    initial: { scale: 0, opacity: 0, y: 50 },
    animate: {
        scale: [0, 0.8, 1.1, 1],
        opacity: [0, 0.7, 1, 1],
        y: [50, 0, -10, 0],
    },
    transition: {
        duration: 1.2,
        ease: [0.25, 0.8, 0.25, 1] as const,
        times: [0, 0.5, 0.8, 1],
        delay: 0.3,
    },
};

const taglineAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1] as const,
        delay: 1.2,
    },
};

const scrollAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 1.8,
    },
    whileHover: {
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 },
    },
};

// Sub-components for better organization
const HeroLogo = () => (
    <motion.div {...logoAnimation}>
        <Image
            src={LOGO_CONFIG.src}
            alt={LOGO_CONFIG.alt}
            width={LOGO_CONFIG.width}
            height={LOGO_CONFIG.height}
            className="object-contain drop-shadow-2xl -translate-x-10 md:block hidden"
            priority
        />
    </motion.div>
);

const HeroTagline = () => (
    <motion.div {...taglineAnimation}>
        <H2 className="max-w-6xl text-center mt-20 font-light">
            {TAGLINE}
        </H2>
    </motion.div>
);

const HeroScrollIndicator = () => (
    <motion.div {...scrollAnimation} className="cursor-pointer">
        <Image
            src={SCROLL_CONFIG.src}
            alt={SCROLL_CONFIG.alt}
            width={SCROLL_CONFIG.width}
            height={SCROLL_CONFIG.height}
            className="drop-shadow-lg"
        />
    </motion.div>
);

const HeroOverlay = () => (
    <div className="absolute inset-0 w-full h-full bg-black/40 scale-y-110" />
);

const HeroContent = () => (
    <div className="z-20 mix-blend-hard-light flex origin-top flex-col w-full h-full items-center justify-between">
        <div className="flex flex-col items-center justify-center flex-1">
            <HeroLogo />
            <HeroTagline />
        </div>
        <HeroScrollIndicator />
    </div>
);

export function Hero() {
    return (
        <Section className="h-screen relative overflow-hidden" spacing="sm">
            <VideoLoader
                {...VIDEO_CONFIG}
                className="w-full h-full"
                videoClassName="w-full h-full object-cover"
            >
                <HeroOverlay />
                <HeroContent />
            </VideoLoader>
        </Section>
    );
}   