'use client'

import InfiniteMarquee from './InfiniteMarquee'
import Image from 'next/image'

interface Brand {
    name: string
    logo: string
    width?: number
    height?: number
}

interface BrandMarqueeProps {
    brands: Brand[]
    speed?: number
    direction?: 'left' | 'right'
    pauseOnHover?: boolean
    className?: string
    logoClassName?: string
}

export default function BrandMarquee({
    brands,
    speed = 30,
    direction = 'left',
    pauseOnHover = true,
    className = '',
    logoClassName = ''
}: BrandMarqueeProps) {
    return (
        <InfiniteMarquee
            speed={speed}
            direction={direction}
            pauseOnHover={pauseOnHover}
            className={`${className}`}
        >
            {brands.map((brand, index) => (
                <div
                    key={`${brand.name}-${index}`}
                    className={`flex items-center justify-center px-12 ${logoClassName}`}
                >
                    <Image
                        src={brand.logo}
                        alt={`Logo da ${brand.name}`}
                        width={brand.width || 120}
                        height={brand.height || 60}
                        className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                    />
                </div>
            ))}
        </InfiniteMarquee>
    )
}

// Exemplo de marcas padrão (você pode personalizar com suas próprias marcas)
export const defaultBrands: Brand[] = [
    {
        name: 'Frango no Pote',
        logo: '/sponsors/fnp.png',
        width: 140,
        height: 140
    },
    {
        name: 'Pilotis Imóveis',
        logo: '/sponsors/pilotis.png',
        width: 120,
        height: 60
    },
    {
        name: 'Isofen',
        logo: '/sponsors/isofen.png',
        width: 120,
        height: 60
    },
    {
        name: 'Açaí Puríssimo',
        logo: '/sponsors/acai.png',
        width: 120,
        height: 60
    },
    {
        name: 'Natura',
        logo: '/sponsors/natura.png',
        width: 80,
        height: 80
    },
    // Duplicar algumas marcas para ter mais variedade no loop
    {
        name: 'Pump',
        logo: '/sponsors/pump.png',
        width: 140,
        height: 70
    },
    {
        name: 'Vise',
        logo: '/sponsors/vise.png',
        width: 140,
        height: 70
    }
]
