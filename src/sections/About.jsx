import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const About = () => {
  const text = `Passionate about distributed systems
    I build scalable, cloud-native solutions
    with modern architectures`;
  const aboutText = `Full-stack developer specializing in microservices architecture and real-time systems. Experience with TypeScript, Node.js, C#, Java, and cloud-native technologies. Building everything from collaborative canvas platforms to enterprise stock management systems.
  When I'm not jobing:`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Engineering solutions, Architecting systems"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-1 sm:px-1 md:px-3 lg:px-6 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60 ultra-small-screen">
        <img
          ref={imgRef}
          src={import.meta.env.BASE_URL + "images/pfp.png"}
          alt="LoudlyDawn"
          className="w-md rounded-3xl"
        />
        <div className="w-full">
          <AnimatedTextLines text={aboutText} className={"w-full"} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Icon icon="lucide:code" className="text-white/80" />
              <span>Building open-source projects and developer tools</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:layers" className="text-white/80" />
              <span>Exploring distributed systems and microservices</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:cpu" className="text-white/80" />
              <span>Learning new algorithms and system design patterns</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:zap" className="text-white/80" />
              <span>Optimizing performance and scalability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
