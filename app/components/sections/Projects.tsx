"use client"

import { cn } from "@/lib/utils";
import { Section } from "../ui/Section";
import { H0, H4 } from "../ui/Typography";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

// Constants for better maintainability
const PROJECTS_DATA = [
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
] as const;

const INTERSECTION_CONFIG = {
    rootMargin: '-30% 0px -30% 0px', // More restrictive center focus
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    centerZoneThreshold: 0.4, // Within 40% of viewport height
    minVisibility: 0.5, // At least 50% visible
};

const ANIMATION_CONFIG = {
    video: {
        transition: {
            type: 'spring' as const,
            stiffness: 300,
            damping: 30
        },
    },
    button: {
        transition: {
            duration: 0.5,
            ease: "easeOut" as const
        },
    },
} as const;

// Custom hook for mobile detection and intersection observer
const useProjectIntersection = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [lastHoveredProject, setLastHoveredProject] = useState<number | null>(0);
    const [isMobile, setIsMobile] = useState(false);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detect mobile and setup intersection observer
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let maxVisibility = 0;
                let mostVisibleIndex = 0;
                let hasValidCandidate = false;

                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute('data-project-index') || '0');
                    const visibility = entry.intersectionRatio;

                    // Get the bounding rect to check if element is properly in the center area
                    const rect = entry.boundingClientRect;
                    const viewportHeight = window.innerHeight;
                    const elementCenter = rect.top + rect.height / 2;
                    const viewportCenter = viewportHeight / 2;
                    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

                    // Only consider elements that are:
                    // 1. At least 50% visible
                    // 2. Not too far from viewport center (within 40% of viewport height)
                    const isInCenterZone = distanceFromCenter < viewportHeight * INTERSECTION_CONFIG.centerZoneThreshold;
                    const hasGoodVisibility = visibility > INTERSECTION_CONFIG.minVisibility;

                    if (hasGoodVisibility && isInCenterZone && visibility > maxVisibility) {
                        maxVisibility = visibility;
                        mostVisibleIndex = index;
                        hasValidCandidate = true;
                    }
                });

                // Only update if we have a valid candidate
                if (hasValidCandidate) {
                    setHoveredProject(mostVisibleIndex);
                    setLastHoveredProject(mostVisibleIndex);
                }
            },
            {
                root: null,
                rootMargin: INTERSECTION_CONFIG.rootMargin,
                threshold: INTERSECTION_CONFIG.threshold,
            }
        );

        projectRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [isMobile]);

    return {
        hoveredProject,
        lastHoveredProject,
        isMobile,
        projectRefs,
        containerRef,
        setHoveredProject,
        setLastHoveredProject,
    };
};

// Sub-components for better organization
const ProjectLink = ({
    project,
    index,
    isMobile,
    hoveredProject,
    lastHoveredProject,
    onMouseEnter,
    onMouseLeave
}: {
    project: typeof PROJECTS_DATA[number];
    index: number;
    isMobile: boolean;
    hoveredProject: number | null;
    lastHoveredProject: number | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) => (
    <Link
        href={`/projects/${project.title}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="md:py-14 py-8 group w-full"
    >
        <H0 className={cn(
            "font-semibold transition-all duration-300 inline-flex items-center gap-5",
            isMobile
                ? index === lastHoveredProject
                    ? "opacity-100 brightness-110"
                    : "opacity-60"
                : "group-hover:opacity-100 group-hover:brightness-125 opacity-60",
            !isMobile && index === lastHoveredProject && "opacity-100 brightness-110",
            !isMobile && hoveredProject !== null && "opacity-70",
        )}>
            {project.title}
            <span className={cn(
                "flex items-center justify-center text-sm transition-all duration-500 rounded-full md:p-4 p-2",
                isMobile
                    ? index === lastHoveredProject
                        ? "opacity-100 translate-x-0 bg-foreground/40"
                        : "opacity-0 translate-x-10"
                    : "group-hover:opacity-100 group-hover:translate-x-0 opacity-0 translate-x-10",
                !isMobile && hoveredProject !== null && "bg-foreground/40"
            )}>
                <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
            </span>
        </H0>
    </Link>
);

const ProjectItem = ({
    project,
    index,
    isLast,
    hoveredProject,
    projectRefs,
    isMobile,
    lastHoveredProject,
    setHoveredProject,
    setLastHoveredProject
}: {
    project: typeof PROJECTS_DATA[number];
    index: number;
    isLast: boolean;
    hoveredProject: number | null;
    projectRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    isMobile: boolean;
    lastHoveredProject: number | null;
    setHoveredProject: (index: number | null) => void;
    setLastHoveredProject: (index: number) => void;
}) => (
    <div
        ref={(el) => { projectRefs.current[index] = el; }}
        data-project-index={index}
        className={cn(
            "flex border-b w-full",
            isLast && "border-b-0",
            hoveredProject !== null ? "border-background/30" : "border-foreground/30"
        )}
    >
        <ProjectLink
            project={project}
            index={index}
            isMobile={isMobile}
            hoveredProject={hoveredProject}
            lastHoveredProject={lastHoveredProject}
            onMouseEnter={() => {
                if (!isMobile) {
                    setHoveredProject(index);
                    setLastHoveredProject(index);
                }
            }}
            onMouseLeave={() => {
                if (!isMobile) {
                    setHoveredProject(null);
                }
            }}
        />
    </div>
);

const ViewMoreButton = () => (
    <div className="flex items-center max-md:justify-center max-md:w-full group cursor-pointer mt-5">
        <Button size="xl" className="rounded-full p-8 group shadow-lg bg-foreground text-background">
            <p>Ver mais projetos</p>
        </Button>
        <span className={cn(
            "flex items-center justify-center text-sm group-hover:opacity-100 opacity-100 group-hover:translate-x-5 transition-all duration-500 rounded-full p-4 bg-foreground text-background",
        )}>
            <ArrowRight className="w-7 h-7" />
        </span>
    </div>
);

const ProjectVideo = ({
    project,
    index,
    lastHoveredProject
}: {
    project: typeof PROJECTS_DATA[number];
    index: number;
    lastHoveredProject: number | null;
}) => (
    <motion.div
        key={project.title}
        initial={false}
        transition={ANIMATION_CONFIG.video.transition}
        className="w-full h-full transition-all duration-500 overflow-hidden opacity-90"
    >
        <video
            src={project.image}
            className={cn(
                "mask-l-from-90% absolute right-0 bottom-0 object-cover transition-all origin-center duration-300 z-10 delay-200",
                index === lastHoveredProject ? "opacity-100 translate-x-0" : "opacity-0 translate-x-50",
                (project as any).type === "reels" ? "h-full" : "h-full",
            )}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={project.image}
        />
    </motion.div>
);

const ProjectList = ({
    projects,
    hoveredProject,
    projectRefs,
    isMobile,
    lastHoveredProject,
    setHoveredProject,
    setLastHoveredProject
}: {
    projects: typeof PROJECTS_DATA;
    hoveredProject: number | null;
    projectRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    isMobile: boolean;
    lastHoveredProject: number | null;
    setHoveredProject: (index: number | null) => void;
    setLastHoveredProject: (index: number) => void;
}) => (
    <div className="flex flex-col items-start w-full z-10">
        {projects.map((project, index) => (
            <ProjectItem
                key={project.title}
                project={project}
                index={index}
                isLast={index === projects.length - 1}
                hoveredProject={hoveredProject}
                projectRefs={projectRefs}
                isMobile={isMobile}
                lastHoveredProject={lastHoveredProject}
                setHoveredProject={setHoveredProject}
                setLastHoveredProject={setLastHoveredProject}
            />
        ))}
        <ViewMoreButton />
    </div>
);

const VideoBackground = ({
    projects,
    lastHoveredProject
}: {
    projects: typeof PROJECTS_DATA;
    lastHoveredProject: number | null;
}) => (
    <div className="absolute right-0 bottom-0 w-full md:w-[70%] h-full antialiased -z-10">
        <AnimatePresence>
            {projects.map((project, index) => (
                <ProjectVideo
                    key={project.title}
                    project={project}
                    index={index}
                    lastHoveredProject={lastHoveredProject}
                />
            ))}
        </AnimatePresence>
    </div>
);

export function Projects() {
    const {
        hoveredProject,
        lastHoveredProject,
        isMobile,
        projectRefs,
        containerRef,
        setHoveredProject,
        setLastHoveredProject,
    } = useProjectIntersection();

    return (
        <Section spacing="xl" className={cn(
            "overflow-hidden relative max-h-full max-w-full md:px-8 px-6 transition-all duration-700",
        )}>
            <div className={cn(
                "absolute top-0 left-0 w-full h-full -z-20 transition-all duration-500",
            )} />

            <H4>Projetos</H4>

            <div ref={containerRef}>
                <ProjectList
                    projects={PROJECTS_DATA}
                    hoveredProject={hoveredProject}
                    projectRefs={projectRefs}
                    isMobile={isMobile}
                    lastHoveredProject={lastHoveredProject}
                    setHoveredProject={setHoveredProject}
                    setLastHoveredProject={setLastHoveredProject}
                />
            </div>

            <VideoBackground
                projects={PROJECTS_DATA}
                lastHoveredProject={lastHoveredProject}
            />
        </Section>
    );
}