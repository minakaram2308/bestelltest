"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
import { Link } from "@/components";
import { cx, css } from "styled-system/css";

type LogoT = {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};
export const Logo = ({
  src = "",
  alt = "Bestell gastro ",
  className,
  width = 268,
  height = 116,
}: LogoT) => {
  const [logoPath, setLogoPath] = useState(src || "/logos/logo.svg");
  //   const { theme } = useTheme();
  //   useEffect(() => {
  //     if (!src) {
  //       setLogoPath(() =>
  //         theme === "dark"
  //           ? "/images/logos/ads_logo_dark.svg"
  //           : "/images/logos/ads_logo.svg"
  //       );
  //     } else setLogoPath(src);
  //   }, [theme, src]);
  const logoClasses = cx(
    css({
      //   height: "auto",
    }),
    className
  );
  return (
    <Link href="#">
      <Image
        className={logoClasses}
        width={width}
        height={height}
        priority
        src={logoPath}
        alt={alt}
      />
    </Link>
  );
};

export default Logo;
