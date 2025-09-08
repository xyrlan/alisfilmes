"use client";
import { H0, H1, Small } from "@/app/components/ui/Typography";
import Image from "next/image";
import circle from "@/public/circle.svg";
import { motion } from "framer-motion";

export default function WorksHeader() {
  return (
    <div className="gap-10 md:gap-20 py-10 relative max-w-7xl mx-auto">
      <H0 className="font-semibold text-background">
        <Small className="font-thin align-text-top text-nowrap md:mr-20 mr-10 tracking-normal ">
          Our Work
        </Small>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          viewport={{ once: true }}
        >
          Experiências
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          de
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          marca
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          integradas
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          que
        </motion.span>{" "}
        <motion.span
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            src={circle}
            alt="Circle"
            className="absolute right-3 -bottom-4 w-96 h-auto z-10"
          />
          emocionam
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          —
        </motion.span>{" "}
        <motion.em
          className="font-serif font-thin"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          e
        </motion.em>{" "}
        <motion.em
          className="font-serif font-thin"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          geram
        </motion.em>{" "}
        <motion.em
          className="font-serif font-thin"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
        >
          resultados.
        </motion.em>
      </H0>
    </div>
  );
}
