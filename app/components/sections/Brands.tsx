import BrandMarquee, { defaultBrands } from "../ui/BrandMarquee";
import { Body } from "../ui/Typography";

export function Brands() {
    return (
        <div className="grid grid-cols-12 max-md:gap-8 border-t border-foreground/30 py-12 md:py-24 md:px-12 px-6">
            <Body className="font-semibold md:col-span-2 col-span-12">Trusted by</Body>
            <BrandMarquee
                brands={defaultBrands}
                speed={25}
                direction="left"
                pauseOnHover={true}
                className="md:col-span-10 col-span-12"
            />
        </div>
    )
}