"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ShaderBg() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorBack = mounted && theme === "light" ? "#ffffff" : "#000000";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <GrainGradient
        key={theme}
        width="100%"
        height="100%"
        colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff", "#33cc99", "#3399cc", "#3333cc"]}
        colorBack={colorBack}
        softness={0.35}
        intensity={0.4}
        noise={0}
        shape="corners"
        speed={1.28}
        scale={1}
        rotation={0}
        offsetX={0}
        offsetY={0}
      />
    </div>
  );
}
