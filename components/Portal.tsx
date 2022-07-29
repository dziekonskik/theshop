import { useLayoutEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
export const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef<Element | null>(null);

  useLayoutEffect(() => {
    setMounted(true);
    mountRef.current = document.getElementById("portal");
    return () => setMounted(false);
  }, []);

  return mounted && mountRef.current
    ? createPortal(children, mountRef.current)
    : null;
};
