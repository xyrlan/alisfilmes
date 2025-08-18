import { Container } from '@/app/components/ui/Container'
import { Small, Caption } from '@/app/components/ui/Typography'

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
    icon?: React.ComponentType<{ className?: string }>
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

export function Footer({
    logo = 'AlisFilmes',
    description = 'Criamos filmes únicos que contam histórias memoráveis.',
    sections = defaultSections,
    socialLinks = [],
    copyright = '© 2024 AlisFilmes. Todos os direitos reservados.'
}: FooterProps) {
    return (
        <footer className="border-t bg-background">
            <Container className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{logo}</h3>
                        <Small className="max-w-xs">{description}</Small>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <div className="flex space-x-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={link.label}
                                    >
                                        {link.icon && <link.icon className="h-5 w-5" />}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer Sections */}
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
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t">
                    <Small className="text-center">{copyright}</Small>
                </div>
            </Container>
        </footer>
    )
}
