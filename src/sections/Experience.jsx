import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Experience = () => {
  const text = `Gaining real-world experience
    Applying academic knowledge to production systems
    and enterprise-level challenges`;
  
  const experienceText = `Currently gaining hands-on experience through internship opportunities, working with modern development practices and contributing to real-world software solutions.`;
  
  const cardRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
      },
    });
  });

  return (
    <section id="experience" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"From classroom to production"}
        title={"Experience"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-16 ultra-small-screen">
        <div className="w-full">
          <AnimatedTextLines text={experienceText} className={"w-full text-xl md:text-2xl lg:text-3xl text-white/60 font-light tracking-wide mb-8"} />
          
          <div 
            ref={cardRef}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Icon icon="lucide:briefcase" className="text-white text-3xl" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                    Software Engineering Intern
                  </h3>
                  <p className="text-lg md:text-xl text-white/80 mb-1">
                    [Company Name]
                  </p>
                  <p className="text-base md:text-lg text-white/50">
                    [Start Date] - Present
                  </p>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:check-circle" className="text-emerald-400 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-white/70">
                      Working with modern development tools and frameworks
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:check-circle" className="text-emerald-400 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-white/70">
                      Collaborating with cross-functional teams on production systems
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:check-circle" className="text-emerald-400 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-white/70">
                      Contributing to software design, development, and testing processes
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:check-circle" className="text-emerald-400 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-white/70">
                      Gaining experience with agile methodologies and best practices
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
