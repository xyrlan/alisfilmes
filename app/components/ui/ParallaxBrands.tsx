'use client'

import BrandMarquee from './BrandMarquee'
import { Section } from './Section'

interface Brand {
    name: string
    logo: string
    width?: number
    height?: number
}

interface ParallaxBrandsProps {
    brands: Brand[]
    className?: string
}

export default function ParallaxBrands({ brands, className = '' }: ParallaxBrandsProps) {
    // Dividir as marcas em grupos para diferentes velocidades
    const firstRow = brands.slice(0, Math.ceil(brands.length / 2))
    const secondRow = brands.slice(Math.ceil(brands.length / 2))

    return (
        <Section className={`py-16 bg-gradient-to-b from-transparent via-black/5 to-transparent dark:via-white/5 ${className}`}>
            <div className="space-y-8">
                {/* Primeira fileira - movimento para a esquerda */}
                <BrandMarquee
                    brands={firstRow}
                    speed={30}
                    direction="left"
                    pauseOnHover={false}
                    className="opacity-80"
                />

                {/* Segunda fileira - movimento para a direita, velocidade diferente */}
                <BrandMarquee
                    brands={secondRow}
                    speed={25}
                    direction="right"
                    pauseOnHover={false}
                    className="opacity-60"
                />

                {/* Terceira fileira - movimento para a esquerda, mais lenta */}
                <BrandMarquee
                    brands={brands}
                    speed={40}
                    direction="left"
                    pauseOnHover={true}
                    className="opacity-90"
                />
            </div>

            {/* Gradiente overlay para suavizar as bordas */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </Section>
    )
}
