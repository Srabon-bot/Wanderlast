import Image from "next/image";

const benefits = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseWanderlust() {
  return (
    <section className="bg-[#effcff] px-6 py-24 text-[#090909] sm:px-10 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-light tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-base text-[#6e6e6e] sm:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="min-h-60 border border-white bg-white px-10 py-11 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            >
              <Image
                src={benefit.icon}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 object-contain object-left"
              />
              <h3 className="mt-8 text-2xl font-light tracking-[-0.04em] sm:text-3xl">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-6 text-[#707070]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
