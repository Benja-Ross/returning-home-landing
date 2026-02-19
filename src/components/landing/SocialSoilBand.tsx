import Image from "next/image";

export function SocialSoilBand() {
  return (
    <section className="relative w-full h-[260px] md:h-[340px] lg:h-[420px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/social-soil.jpg"
        alt="Low-angle view looking up at towering forest trees with warm golden sunlight filtering through the dense canopy"
        fill
        className="object-cover object-[center_30%]"
        priority
        sizes="100vw"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* Overlay Text */}
      <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8">
        <p className="max-w-[280px] md:max-w-xl text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-white text-left [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
          A practice that grows shared meaning, belonging, and care for place over time.
        </p>
      </div>
    </section>
  );
}
