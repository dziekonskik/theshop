import { useLayoutEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
export const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef<Element | null>(document.querySelector("#portal"));

  useLayoutEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && mountRef.current
    ? createPortal(children, mountRef.current)
    : null;
};
