import Image from "next/image";

type Props = {
  regionName: string;
  heroImageSrc: string;
};

const heroBodyCopy = (
  <>
    A playground for voices of place. Why?
    <br />
    Playgrounds are open. They offer just enough structure for learning, freedom, and self-discovery.
    <br />
    <br />
    This is a small experiment in listening to and discovering place together.
    <br />
    <br />
    Anyone can add a brief voice of place each week.
    <br />
    There will be one weekly question.
    <br />
    One sentence responses are great.
    <br />
    <br />
    The place is the main player.
  </>
);

export function PlaygroundHero({ regionName, heroImageSrc }: Props) {
  return (
    <section className="relative w-full overflow-hidden min-h-[420px] h-[60vh] sm:min-h-[520px] sm:h-[70vh]">
      <Image
        src={heroImageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 sm:py-20 md:py-24">
          <div className="max-w-[52ch] sm:max-w-[78ch]">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
              Voices of {regionName}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:text-xl sm:leading-relaxed sm:mt-8">
              {heroBodyCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
