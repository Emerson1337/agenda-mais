"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  children: JSX.Element;
}

const CustomMotion: React.FC<Props> = (props) => {
  const { children, className } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default CustomMotion;
