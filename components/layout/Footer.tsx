import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GithubIcon, EmailIcon, LinkedinIcon } from "../Svg/Feather";
import { MessageIcon } from "../Svg";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { ContactForm } from "../Forms/ContactFormPortal";
import useMediaQuery from "../../util/useMediaquery";
import { AnimatePresence } from "framer-motion";

interface PortalCoords {
  x: number;
  y: number;
}

const portalOffset = {
  x: 87,
  y: 470,
};

export const Footer = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [portalCoords, setPortalCoords] = useState<PortalCoords>();
  const contactFormTriggerRef = useRef<HTMLDivElement | null>(null);
  const matches = useMediaQuery("(max-width: 448px)");
  const router = useRouter();

  useEffect(() => {
    if (!contactFormTriggerRef.current) return;
    const { x, top } = contactFormTriggerRef.current.getBoundingClientRect();

    setPortalCoords({
      x: matches ? 0 : x - portalOffset.x,
      y: top + window.scrollY - portalOffset.y,
    });
  }, [matches, router.pathname]);

  return (
    <footer className="bg-bermuda min-h-40 px-4" id="footer">
      <div className="h-full w-full md:container mx-auto flex items-center md:items-start flex-col text-midnight pt-4">
        <section className="h-full flex flex-col md:flex-row w-full">
          <article className="h-full w-full flex flex-col justify-between md:justify-around items-center md:items-start">
            <h3 className="font-anonymous text-lg text-center px-1">
              Designed and manufactured by Konrad Dziekoński
            </h3>
            <div className="flex mt-6 px-4 lg:px-0">
              <Link href="https://github.com/dziekonskik">
                <a className="text-purple relative">
                  <GithubIcon />
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/konrad-dziekonski/">
                <a className="text-purple relative mx-4">
                  <LinkedinIcon />
                </a>
              </Link>
              <Link href="mailto:jaseveen@gmail.com">
                <a className="text-purple relative">
                  <EmailIcon />
                </a>
              </Link>
            </div>
          </article>
          <div className="flex w-full justify-center xl:justify-start my-6 px-4 items-center relative">
            <AnimatePresence exitBeforeEnter>
              {contactFormOpen && (
                <ContactForm
                  x={portalCoords?.x}
                  y={portalCoords?.y}
                  contactFormOpen={contactFormOpen}
                  setContactFormOpen={setContactFormOpen}
                />
              )}
            </AnimatePresence>
            <div ref={contactFormTriggerRef}>
              <ButtonWithIcon
                type="submit"
                onClick={() => setContactFormOpen(!contactFormOpen)}
                svgMarkup={<MessageIcon className="ml-2 h-9 w-9" />}
                side="right"
                bgColor="#F4E13E"
              >
                Contact me !
              </ButtonWithIcon>
            </div>
          </div>
        </section>
        <aside className="p-3 mx-auto text-center font-anonymous">
          ©
          <a className="mx-2" href="mailto:jaseveen@gmail.com">
            vseven
          </a>
          and the state of California
        </aside>
      </div>
    </footer>
  );
};
