"use client";

import icons from "@/data/icons/icons.json";
import {
  Icon as Iconify,
  type IconProps as IconifyProps,
  addCollection,
} from "@iconify/react";
import { forwardRef } from "react";
import { cx } from "styled-system/css";
import { engine } from "styled-system/jsx";

export type IconProps = IconifyProps;

const InternalIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => {
    addCollection(icons);

    return (
      <Iconify
        //@ts-expect-error ref is not a valid prop
        ref={ref}
        className={cx("__icon", className)}
        aria-hidden={true}
        focusable={false}
        pointerEvents={"none"}
        {...props}
      />
    );
  }
);
InternalIcon.displayName = "Icon";

export const Icon = engine(InternalIcon);
