'use client'

import { Small, Caption, Body, Lead, H4, H2 } from '@/app/components/ui/Typography'
import Image from 'next/image'
import { Section } from '../ui/Section'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// Types
interface FooterSection {
    title: string
    href: string
}

interface SocialLink {
    label: string
    href: string
    icon?: string
}

interface FooterProps {
    logo?: string
    description?: string
    sections?: FooterSection[]
    socialLinks?: SocialLink[]
    copyright?: string
}

// Constants for better maintainability
const DEFAULT_SECTIONS: FooterSection[] = [
    {
        title: 'O que fazemos',
        href: '#o-que-fazemos'
    },
    {
        title: 'Serviços',
        href: '#servicos'
    },
    {
        title: 'Contato',
        href: '#contato'
    },

    {
        title: 'Projetos',
        href: '#projetos'
    },
    {
        title: 'Connect',
        href: '#connect'
    }
] as const

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { label: 'Twitter', href: 'https://twitter.com/alisfilmes', icon: '/socials/twitter.svg' },
    { label: 'Instagram', href: 'https://instagram.com/alisfilmes', icon: '/socials/insta.svg' },
    { label: 'TikTok', href: 'https://tiktok.com/@alisfilmes', icon: '/socials/tiktok.svg' },
] as const

const DEFAULT_PROPS = {
    logo: 'AlisFilmes',
    description: 'Criamos filmes únicos que contam histórias memoráveis.',
    sections: DEFAULT_SECTIONS,
    socialLinks: DEFAULT_SOCIAL_LINKS,
    copyright: '© Copyright 2025'
} as const

const ANIMATION_CONFIG = {
    star: {
        initial: {
            opacity: 0,
            scale: 0,
            y: '-100%',
            rotate: -45
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: '-50%',
            rotate: 0
        },
        exit: {
            opacity: 0,
            scale: 0,
            y: '100%',
            rotate: 45
        },
        transition: {
            duration: 0.3,
            ease: "easeOut" as const
        }
    },
    seal: {
        animate: { rotate: 360 },
        transition: {
            duration: 10,
            ease: "linear" as const,
            repeat: Infinity
        }
    }
} as const

// Sub-components for better organization
const NavigationSection = ({
    sections,
    hoveredItem,
    setHoveredItem
}: {
    sections: FooterSection[];
    hoveredItem: string | null;
    setHoveredItem: (href: string | null) => void;
}) => (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-3 pb-8 md:pb-16">
        <Small className='pb-4'>
            Continue explorando...
        </Small>
        <ul className='flex flex-col md:gap-6 gap-3'>
            {sections.map((section) => (
                <NavigationItem
                    key={section.title}
                    section={section}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                />
            ))}
        </ul>
    </div>
)

const NavigationItem = ({
    section,
    hoveredItem,
    setHoveredItem
}: {
    section: FooterSection;
    hoveredItem: string | null;
    setHoveredItem: (href: string | null) => void;
}) => (
    <div>
        <li>
            <Link
                href={section.href}
                className="text-foreground hover:text-foreground/80 transition-colors font-semibold flex items-center justify-between relative"
                onMouseEnter={() => setHoveredItem(section.href)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <H2>
                    {section.title}
                </H2>

                <span className={cn(
                    "md:hidden flex items-center justify-center text-sm group-hover:opacity-100 opacity-100 group-hover:translate-x-5 transition-all duration-500 rounded-full md:p-4 p-2 bg-foreground text-background",
                )}>
                    <ArrowRightIcon className="w-5 h-5" />
                </span>

                <AnimatePresence>
                    {hoveredItem === section.href && (
                        <motion.div
                            className="absolute -left-10 top-1/2"
                            {...ANIMATION_CONFIG.star}
                        >
                            <Image
                                src="/estrela-branca.png"
                                alt="Star"
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Link>
        </li>
    </div>
)

const DescriptionSection = () => (
    <div className='flex flex-col-reverse md:flex-row justify-between items-start md:items-center max-md:gap-4'>
        <Lead className='text-foreground/80 max-md:leading-tight'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus illo porro voluptatum cum.
        </Lead>

        <motion.div
            {...ANIMATION_CONFIG.seal}
        >
            <Image
                src="/selo2.png"
                alt="selo2"
                width={100}
                height={100}
                className='md:w-20 md:h-20 w-15 h-15'
            />
        </motion.div>
    </div>
)

const SocialLinks = ({
    socialLinks
}: {
    socialLinks: SocialLink[];
}) => (
    <div className="flex max-md:flex-row-reverse gap-2 items-center max-md:justify-between max-md:w-full">
        {socialLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className='h-10 md:w-15 w-10 md:h-15 flex items-center justify-center rounded-full border border-foreground/30 object-cover overflow-hidden'
            >
                {link.icon && (
                    <Image
                        src={link.icon}
                        alt={link.label}
                        width={100}
                        height={100}
                    />
                )}
            </Link>
        ))}
        <Body className='text-foreground/80 ml-2 flex-1'>
            Siga-nos
        </Body>
    </div>
)

const CopyrightSection = ({
    copyright
}: {
    copyright: string;
}) => (
    <div className="flex items-baseline gap-2 max-md:justify-between max-md:w-full max-md:border-t border-foreground/30 md:pt-0 pt-4">
        <Body className="text-center">
            {copyright}
        </Body>
        <Image
            src="/alishorizontal-branca.png"
            alt="AlisFilmes"
            width={100}
            height={100}
        />
    </div>
)

const FooterBottom = ({
    socialLinks,
    copyright
}: {
    socialLinks: SocialLink[];
    copyright: string;
}) => (
    <div className="mt-8 md:pt-8 pt-4 border-t border-foreground/30 flex md:flex-row flex-col md:gap-2 gap-4 justify-between items-center h-full">
        {socialLinks.length > 0 && (
            <SocialLinks socialLinks={socialLinks} />
        )}
        <CopyrightSection copyright={copyright} />
    </div>
)

export function Footer({
    logo = DEFAULT_PROPS.logo,
    description = DEFAULT_PROPS.description,
    sections = DEFAULT_PROPS.sections,
    socialLinks = DEFAULT_PROPS.socialLinks,
    copyright = DEFAULT_PROPS.copyright
}: FooterProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <footer className="bg-background min-h-screen">
            <Section spacing='md' className="md:px-12 px-6">
                <NavigationSection
                    sections={sections}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                />

                <DescriptionSection />

                <FooterBottom
                    socialLinks={socialLinks}
                    copyright={copyright}
                />
            </Section>
        </footer>
    )
}
