"use client"

import Image from "next/image";
import { Section } from "../ui/Section";
import { H0, H1, H4, Small } from "../ui/Typography";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Constants for better maintainability
const SERVICES_DATA = [
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
] as const;

const SCROLL_CONFIG = {
    gap: 24, // 6 * 4px = 24px gap
    snapDelay: 150, // Wait 150ms after scroll stops
    cardWidth: 0.85, // 85% of viewport width for mobile
} as const;

const ANIMATION_CONFIG = {
    desktop: {
        initial: { y: 30, scale: 1.1 },
        animate: { y: 0, scale: 1 },
        transition: {
            duration: 0.3,
            ease: [0.25, 0.8, 0.25, 1] as const,
        },
        viewport: { once: true },
    },
    image: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
            duration: 0.3,
            ease: [0.225, 0.8, 0.25, 1] as const,
        },
        viewport: { once: true },
    },
    number: {
        initial: {
            opacity: 0,
            scale: 0.3,
            rotateX: -90,
            y: 30
        },
        animate: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            rotateX: 90,
            y: -30
        },
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1] as const,
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
            rotateX: { duration: 0.5 }
        },
    },
    progress: {
        initial: { width: "0%" },
        transition: { duration: 0.1, ease: "easeOut" as const },
    },
} as const;

// Custom hook for scroll management
const useScrollManager = (servicesLength: number) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeCard, setActiveCard] = useState(0);

    // Motion values for scroll-based rotation
    const scrollX = useMotionValue(0);
    const scrollVelocity = useMotionValue(0);

    useEffect(() => {
        let previousScrollLeft = 0;
        let isScrolling = false;
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                const maxScroll = scrollWidth - clientWidth;
                const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
                setScrollProgress(progress);

                // Update motion values for rotation effect
                scrollX.set(scrollLeft);

                // Calculate velocity for rotation intensity
                const velocity = scrollLeft - previousScrollLeft;
                scrollVelocity.set(velocity);
                previousScrollLeft = scrollLeft;

                // Calculate active card based on scroll position
                const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
                const cardWithGap = cardWidth + SCROLL_CONFIG.gap;
                const currentCard = Math.round(scrollLeft / cardWithGap);
                const newActiveCard = Math.min(Math.max(currentCard, 0), servicesLength - 1);

                // Only update if the active card actually changed and is valid
                if (newActiveCard !== activeCard && newActiveCard >= 0 && newActiveCard < servicesLength) {
                    setActiveCard(newActiveCard);
                }

                // Handle snap to nearest card after scroll ends
                isScrolling = true;
                clearTimeout(scrollTimeout);

                scrollTimeout = setTimeout(() => {
                    if (scrollRef.current && isScrolling) {
                        const scrollLeft = scrollRef.current.scrollLeft;
                        const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
                        const cardWithGap = cardWidth + SCROLL_CONFIG.gap;

                        // Find the nearest card
                        const nearestCard = Math.round(scrollLeft / cardWithGap);
                        const targetScroll = nearestCard * cardWithGap;

                        // Snap to the nearest card
                        scrollRef.current.scrollTo({
                            left: targetScroll,
                            behavior: 'smooth'
                        });

                        isScrolling = false;
                    }
                }, SCROLL_CONFIG.snapDelay);
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                scrollElement.removeEventListener('scroll', handleScroll);
                clearTimeout(scrollTimeout);
            };
        }
    }, [servicesLength, scrollX, scrollVelocity, activeCard]);

    return { scrollRef, scrollProgress, activeCard, scrollVelocity };
};

// Sub-components for better organization
const ServiceCard = ({
    service,
    index,
    isEven
}: {
    service: typeof SERVICES_DATA[number];
    index: number;
    isEven: boolean;
}) => (
    <motion.div
        className={cn(
            "relative group",
            isEven ? "translate-y-0" : "translate-y-20"
        )}
        initial={ANIMATION_CONFIG.desktop.initial}
        whileInView={ANIMATION_CONFIG.desktop.animate}
        transition={{
            ...ANIMATION_CONFIG.desktop.transition,
            delay: 0.1 * index
        }}
        viewport={ANIMATION_CONFIG.desktop.viewport}
    >
        <H0
            className="font-black absolute right-2 -top-12 -z-10 text-white brightness-125 group-hover:-translate-y-5 transition-all duration-500"
            as="span"
        >
            0{index + 1}
        </H0>

        <motion.div
            className="md:max-h-[371px] rounded-md overflow-hidden"
            initial={ANIMATION_CONFIG.image.initial}
            whileInView={ANIMATION_CONFIG.image.animate}
            transition={{
                ...ANIMATION_CONFIG.image.transition,
                delay: 0.1 * index
            }}
            viewport={ANIMATION_CONFIG.image.viewport}
        >
            <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={500}
                className="object-contain group-hover:scale-105 transition-all duration-500"
            />
        </motion.div>

        <H4 className="font-bold text-background py-4">{service.title}</H4>
        <Small className="text-background/80">{service.description}</Small>
    </motion.div>
);

const MobileServiceCard = ({
    service,
    index,
    activeCard,
    scrollVelocity
}: {
    service: typeof SERVICES_DATA[number];
    index: number;
    activeCard: number;
    scrollVelocity: any;
}) => {
    // Calculate card width more accurately
    const cardWidth = typeof window !== 'undefined' ? window.innerWidth * SCROLL_CONFIG.cardWidth : 350;
    const gap = SCROLL_CONFIG.gap;
    const cardOffset = index * (cardWidth + gap);

    // Simple rotation effect based on scroll velocity (balancing effect)
    const rotate = useTransform(
        scrollVelocity,
        [-50, -25, 0, 25, 50],
        [-8, -4, 0, 4, 8]
    );

    // Smooth spring animation for natural feel
    const smoothRotate = useSpring(rotate, {
        stiffness: 100,
        damping: 10,
        restDelta: 0.01
    });

    return (
        <motion.div
            className="flex-none w-[85vw] snap-start relative group"
            style={{
                rotate: smoothRotate,
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always'
            }}
        >
            <div className="-z-10 self-end relative overflow-hidden">
                {/* Always render the number with conditional styling */}
                <motion.div
                    key={`number-${index}`}
                    initial={false}
                    animate={{
                        opacity: activeCard === index ? 1 : 0.2,
                        scale: activeCard === index ? 1 : 0.7,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    style={{ transformOrigin: 'center bottom' }}
                >
                    <H0 className="font-black text-white brightness-125 text-6xl" as="span">
                        0{index + 1}
                    </H0>
                </motion.div>
            </div>

            <div className="rounded-md overflow-hidden mb-6">
                <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500"
                />
            </div>

            <H4 className="font-bold text-background py-4">{service.title}</H4>
            <Small className="text-background/80">{service.description}</Small>
        </motion.div>
    );
};

const ProgressBar = ({
    scrollProgress,
    activeCard,
    totalCards
}: {
    scrollProgress: number;
    activeCard: number;
    totalCards: number;
}) => (
    <div className="mt-8 px-6">
        <div className="flex justify-center items-center space-x-4">
            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
                <div className="w-full bg-background/20 rounded-full h-1 overflow-hidden">
                    <motion.div
                        className="h-full bg-background rounded-full"
                        initial={ANIMATION_CONFIG.progress.initial}
                        animate={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
                        transition={ANIMATION_CONFIG.progress.transition}
                    />
                </div>
            </div>

            {/* Card Counter */}
            <div className="text-background/60 text-sm font-medium min-w-[3rem] text-center">
                {activeCard + 1}/{totalCards}
            </div>
        </div>
    </div>
);

const DesktopGrid = () => (
    <div className="hidden md:grid xl:grid-cols-4 md:grid-cols-3 gap-12 pt-20 md:pt-32 md:space-y-20 px-8">
        {SERVICES_DATA.map((service, index) => (
            <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isEven={index % 2 === 0}
            />
        ))}
    </div>
);

const MobileScroll = ({
    scrollRef,
    scrollProgress,
    activeCard,
    scrollVelocity
}: {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    scrollProgress: number;
    activeCard: number;
    scrollVelocity: any;
}) => (
    <div className="md:hidden pt-20">
        <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide gap-6 px-6 cursor-grab"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapStop: 'always'
            }}
        >
            {SERVICES_DATA.map((service, index) => (
                <MobileServiceCard
                    key={service.title}
                    service={service}
                    index={index}
                    activeCard={activeCard}
                    scrollVelocity={scrollVelocity}
                />
            ))}
        </div>

        <ProgressBar
            scrollProgress={scrollProgress}
            activeCard={activeCard}
            totalCards={SERVICES_DATA.length}
        />
    </div>
);

export function Services() {
    const { scrollRef, scrollProgress, activeCard, scrollVelocity } = useScrollManager(SERVICES_DATA.length);

    return (
        <Section spacing="xl" className="md:px-8 px-0 bg-foreground text-background">
            <div className="md:px-8 px-6">
                <H1 className="font-semibold text-background">
                    Seu parceiro de confiança para inovação em seis ofertas de serviços estratégicos:
                </H1>
            </div>

            <DesktopGrid />
            <MobileScroll
                scrollRef={scrollRef}
                scrollProgress={scrollProgress}
                activeCard={activeCard}
                scrollVelocity={scrollVelocity}
            />
        </Section>
    );
}