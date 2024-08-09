'use client';

import AuthLayout from "@/components/layouts/AuthLayout";
import { ChildrenProp } from "@/types";
import React, { useEffect } from "react";

const Layout = ({ children }: ChildrenProp) => {
  useEffect(() => {
    // Save original styles
    const originalBodyStyle = document.body.style.cssText;

    // Apply new styles
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    // Restore original styles when the component unmounts
    return () => {
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
