import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/all";

gsap.registerPlugin(CSSPlugin, Physics2DPlugin, TextPlugin);

const InteractiveTextLines = ({ textParts }) => {
  const containerRef = useRef(null);
  const partRefs = useRef([]);
  const lineRefs = useRef([]);

  useGSAP(
    () => {
      if (lineRefs.current.length > 0) {
        gsap.from(lineRefs.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out",
          scrollTrigger: {
            trigger: containerRef.current,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const handleHover = contextSafe((el, effect) => {
    if (!el) return;
    switch (effect) {
      case "spotlight":
        gsap.to(el, { y: -6, scale: 1.02, duration: 0.28, ease: "power1.out" });
        gsap.to(el, {
          "--spot-opacity": 0.28,
          duration: 0.8,
          ease: "power1.out",
        });
        break;
      case "underline":
        gsap.to(el.querySelector(".ih-underline-bar"), {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.3,
          ease: "power1.out",
        });
        break;
      case "paint":
        gsap.to(el, {
          backgroundPosition: "100% 50%",
          duration: 0.6,
          ease: "power1.out",
        });
        gsap.to(el, { y: -4, duration: 0.28, ease: "power1.out" });
        break;
      case "shift": {
        // Use GSAP SplitText to split into characters
        const split = SplitText.create(el, { type: "chars" });
        const chars = split.chars;

        chars.forEach((char, i) => {
          gsap.to(char, {
            physics2D: {
              angle: gsap.utils.random(235, 295),
              velocity: gsap.utils.random(400, 700),
              gravity: 1500,
            },
            autoAlpha: 0,
            duration: 1,
            ease: "power1.in",
            delay: i * 0.02
          });
        });
        break;
      }
      default:
    }
  });

  const handleLeave = contextSafe((el, effect) => {
    if (!el) return;
    switch (effect) {
      case "spotlight":
        gsap.to(el, { y: 0, scale: 1, duration: 0.28, ease: "power1.out" });
        gsap.to(el, {
          "--spot-opacity": 0.08,
          duration: 0.28,
          ease: "power1.out",
        });
        break;
      case "underline":
        gsap.to(el.querySelector(".ih-underline-bar"), {
          scaleX: 0,
          duration: 0.28,
          ease: "power1.out",
        });
        break;
      case "paint":
        gsap.to(el, {
          backgroundPosition: "0% 50%",
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(el, { y: 0, duration: 0.28, ease: "power1.out" });
        break;
      case "shift": {
        // Restore original text with SplitText revert
        const originalText = el.getAttribute("data-original-text");
        if (originalText) {
          el.innerHTML = originalText;
          gsap.from(el, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
          });
        }
        break;
      }
      default:
    }
  });

  const handleMove = contextSafe((e, el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  });

  return (
    <div
      ref={containerRef}
      className="font-light uppercase value-text-responsive"
    >
      {textParts.map((line, lineIdx) => (
        <div
          key={lineIdx}
          ref={(el) => (lineRefs.current[lineIdx] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line.map((part, pIdx) => {
            const key = `p-${lineIdx}-${pIdx}`;
            const effect = part.effect || "default";
            return (
              <span
                key={key}
                ref={(el) => partRefs.current.push(el)}
                className={`ih-part ih-${effect} inline-block relative mr-0 mx-2`}
                data-original-text={part.text}
                tabIndex={0}
                onMouseEnter={(e) => handleHover(e.currentTarget, effect)}
                onMouseLeave={(e) => handleLeave(e.currentTarget, effect)}
                onFocus={(e) => handleHover(e.currentTarget, effect)}
                onBlur={(e) => handleLeave(e.currentTarget, effect)}
                onMouseMove={(e) =>
                  effect === "spotlight" && handleMove(e, e.currentTarget)
                }
                aria-label={part.text}
              >
                {part.text}
                {effect === "underline" && (
                  <span className="ih-underline-bar absolute left-0 bottom-0 h-[2px] w-full bg-white/80 origin-left scale-x-0" />
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default InteractiveTextLines;
