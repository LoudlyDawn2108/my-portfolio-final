import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Education = () => {
  const text = `Academic foundation in software engineering
    Building theoretical knowledge and practical skills
    for real-world applications`;
  
  const educationText = `Currently pursuing a Bachelor's degree in Software Engineering, focusing on modern software development practices, system design, and emerging technologies. Combining academic learning with hands-on project experience.`;
  
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
    <section id="education" className="min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Learning, Growing, Evolving"}
        title={"Education"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="px-1 sm:px-1 md:px-3 lg:px-6 pb-16 ultra-small-screen">
        <div className="w-full">
          <AnimatedTextLines text={educationText} className={"w-full text-xl md:text-2xl lg:text-3xl text-black/60 font-light tracking-wide mb-8"} />
          
          <div 
            ref={cardRef}
            className="bg-white rounded-2xl p-8 shadow-lg border border-black/10 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon icon="lucide:graduation-cap" className="text-white text-3xl" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-black mb-2">
                    [Your University Name]
                  </h3>
                  <p className="text-lg md:text-xl text-black/70 mb-1">
                    Bachelor of Science in Software Engineering
                  </p>
                  <p className="text-base md:text-lg text-black/50">
                    Third Year Student | Expected Graduation: [Year]
                  </p>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:book-open" className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-black/70">
                      Relevant Coursework: Data Structures, Algorithms, Software Architecture, Database Systems, Cloud Computing
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:award" className="text-purple-600 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-black/70">
                      Focus Areas: Distributed Systems, Microservices, Full-Stack Development
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:code-2" className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-black/70">
                      Technical Skills: TypeScript, Java, C#, Node.js, React, SQL, Docker, Git
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

export default Education;
