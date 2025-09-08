"use client";

import { useState, useEffect } from "react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  isDark?: boolean;
}

const defaultNavItems: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Works", href: "/works" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOnTop, setIsOnTop] = useState(true);

  const pathname = usePathname();
  const isDarkPages = ["/works"];
  const isDarkPage = isDarkPages.includes(pathname);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsOnTop(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOnTop(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{
        duration: 0.2,
        ease: "circInOut",
      }}
    >
      <motion.div
        className={cn(
          "flex items-center justify-between px-4 md:px-6 py-4 md:py-6",
          isOnTop ? "bg-transparent" : "bg-foreground text-background delay-200"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-foreground">
            {isOnTop && !isDarkPage ? (
              <Image
                src="/alishorizontal-branca.png"
                alt="Hero"
                width={100}
                height={50}
                className="object-contain drop-shadow-2xl"
              />
            ) : (
              <Image
                src="/alishorizontal-preta.png"
                alt="Hero"
                width={100}
                height={50}
                className="object-contain drop-shadow-2xl"
              />
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-15">
          {defaultNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              className="relative text-shadow-2xs"
              onHoverStart={() => setHoveredItem(item.href)}
              onHoverEnd={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.div
                whileHover={{
                  y: [0, 3, 0],
                  transition: { duration: 0.4 },
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-lg font-semibold transition-colors relative z-10",
                    isDarkPage && "text-background"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>

              <AnimatePresence>
                {hoveredItem === item.href && (
                  <motion.div
                    className="absolute -left-8 top-1/2"
                    initial={{
                      opacity: 0,
                      scale: 0,
                      y: "-100%",
                      rotate: -45,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: "-50%",
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      y: "100%",
                      rotate: 45,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {isOnTop && !isDarkPage ? (
                      <Image
                        src="/estrela-branca.png"
                        alt="Star"
                        width={25}
                        height={25}
                        className="object-contain"
                      />
                    ) : (
                      <Image
                        src="/estrela-preta.png"
                        alt="Star"
                        width={25}
                        height={25}
                        className="object-contain"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="flex items-center group cursor-pointer">
            <Button
              size="md"
              className={cn(
                "rounded-full  shadow-lg",
                isOnTop && !isDarkPage ? "bg-foreground" : "bg-background",
                isOnTop && !isDarkPage ? "text-background" : "text-foreground"
              )}
            >
              <p>Conecte-se</p>
            </Button>
            <span
              className={cn(
                "flex items-center justify-center text-sm group-hover:opacity-100 opacity-100 group-hover:translate-x-5 transition-all duration-500 rounded-full p-2",
                isOnTop && !isDarkPage ? "bg-foreground" : "bg-background",
                isOnTop && !isDarkPage ? "text-background" : "text-foreground"
              )}
            >
              <ArrowRight
                className={cn(
                  "w-5 h-5",
                  isOnTop && !isDarkPage ? "text-background" : "text-foreground"
                )}
              />
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t bg-black/30 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container className="py-4">
              <nav className="flex flex-col space-y-4">
                {defaultNavItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredItem(item.href)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <motion.div
                      whileHover={{
                        x: [0, -2, 2, -1, 1, 0],
                        transition: { duration: 0.4 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative z-10 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>

                    <AnimatePresence>
                      {hoveredItem === item.href && (
                        <motion.div
                          className="absolute -left-6 top-1/2"
                          initial={{
                            opacity: 0,
                            scale: 0,
                            y: "-50%",
                            rotate: -45,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: "-50%",
                            rotate: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0,
                            y: ["50%", "100%"],
                            rotate: 45,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Image
                            src="/estrela.png"
                            alt="Star"
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button className="w-full mt-4">Fale Conosco</Button>
                </motion.div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "border-b border-background/40 transition-all duration-300 origin-center ",
          isOnTop ? "w-0" : "w-full"
        )}
      />
    </motion.header>
  );
}
