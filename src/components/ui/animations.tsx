"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  [key: string]: any;
}

interface SlideInProps extends AnimationProps {
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

interface HoverScaleProps extends AnimationProps {
  scale?: number;
}

// フェードインアニメーション
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// スライドインアニメーション
export const SlideIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 20,
  ...props
}: SlideInProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? -distance : direction === "down" ? distance : 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 要素をラップしてホバー効果を追加
export const HoverScale = ({ children, scale = 1.05, ...props }: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// スクロールトリガーアニメーション
export const ScrollReveal = ({ children, ...props }: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ステガーアニメーション（子要素を順番に表示）
export const Stagger = ({ children, staggerChildren = 0.1, delayChildren = 0, ...props }: AnimationProps) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggerコンポーネントの子要素用
export const StaggerItem = ({ children, ...props }: AnimationProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
