'use client'
import { Small, Caption, Body, Lead } from '@/app/components/ui/Typography'
import Image from 'next/image'
import { Section } from '../ui/Section'
import Link from 'next/link'
import { motion } from 'motion/react'


interface FooterLink {
    label: string
    href: string
}

interface FooterSection {
    title: string
    links: FooterLink[]
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

const defaultSections: FooterSection[] = [
    {
        title: 'Empresa',
        links: [
            { label: 'Sobre', href: '#sobre' },
            { label: 'Equipe', href: '#equipe' },
            { label: 'Carreiras', href: '#carreiras' }
        ]
    },
    {
        title: 'Serviços',
        links: [
            { label: 'Filmagem', href: '#filmagem' },
            { label: 'Edição', href: '#edicao' },
            { label: 'Produção', href: '#producao' }
        ]
    },
    {
        title: 'Contato',
        links: [
            { label: 'Fale Conosco', href: '#contato' },
            { label: 'Suporte', href: '#suporte' },
            { label: 'Orçamento', href: '#orcamento' }
        ]
    }
]

const defaultSocialLinks: SocialLink[] = [
    { label: 'Twitter', href: 'https://twitter.com/alisfilmes', icon: '/socials/twitter.svg' },
    { label: 'Instagram', href: 'https://instagram.com/alisfilmes', icon: '/socials/insta.svg' },
    { label: 'TikTok', href: 'https://tiktok.com/@alisfilmes', icon: '/socials/tiktok.svg' },
]


export function Footer({
    logo = 'AlisFilmes',
    description = 'Criamos filmes únicos que contam histórias memoráveis.',
    sections = defaultSections,
    socialLinks = defaultSocialLinks,
    copyright = '© Copyright 2025'
}: FooterProps) {
    return (
        <footer className="bg-background min-h-screen">
            <Section spacing='md' className="md:px-12 px-6">
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{logo}</h3>
                        <Small className="max-w-xs">{description}</Small>


                    </div>

                    {sections.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <Caption className="text-foreground">{section.title}</Caption>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div> */}

                <div className='flex justify-between items-center'>
                    <Lead className='text-foreground/80'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus illo porro voluptatum cum.</Lead>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    >
                        <Image src="/selo2.png" alt="selo2" width={100} height={100} className='w-20 h-20' />
                    </motion.div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-foreground/30 flex gap-2 justify-between items-center">
                    {socialLinks.length > 0 && (
                        <div className="flex gap-2 items-center">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-label={link.label}
                                    className='h-15 w-15 flex items-center justify-center rounded-full border border-foreground/30 object-cover overflow-hidden'
                                >
                                    {link.icon && <Image src={link.icon} alt={link.label} width={100} height={100} className='' />}
                                </Link>
                            ))}
                            <Body className='text-foreground/80 ml-2'>Siga-nos</Body>
                        </div>
                    )}
                    <div className="flex items-baseline gap-2">
                        <Body className="text-center">{copyright}</Body>
                        <Image src="/alishorizontal-branca.png" alt="AlisFilmes" width={100} height={100} />
                    </div>
                </div>
            </Section>
        </footer>
    )
}
