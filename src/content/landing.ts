export const landingContent = {
  brand: "Returning Home",
  hero: {
    eyebrow: "Returning Home",
    titleLines: ["A shared practice for", "bringing what's possible", "to life in place."],
    body: "What becomes possible when we turn home together?",
    primaryCta: { href: "/begin", label: "Begin the Journey" },
    secondaryCta: { href: "/mission-and-method", label: "Learn how it works →" },
    cards: [
      { title: "Coherence over conversion", text: "A clarity hub, not a pressure funnel." },
      { title: "Dignified, grounded tone", text: "Calm, intelligent, structured." },
      { title: "Felt possibility", text: "No hype. Real shifts in relational life." },
    ],
  },
  whatItIs: {
    title: "What is Returning Home?",
    body:
      "Returning Home is a structured storytelling and reflection practice designed to strengthen the relational fabric of a place. It helps people reconnect with lived experience, listen to the collective story, see their community as a living system, and take meaningful steps toward shared vitality.",
    whoFor: {
      title: "Who it’s for",
      body:
        "People and communities looking to deepen belonging, coherence, and place-based care—without hype, urgency tactics, or overbuilt funnel logic.",
    },
    not: {
      title: "What it is not",
      body:
        "Not a program to consume. Not a secret teaching. Not a high-pressure sales funnel. It’s a process to participate in.",
    },
  },
  whyHumanEcology: {
    id: "how",
    title: "Why Human Ecology Matters",
    body:
      "Healthy ecosystems are defined by the quality of their relationships. So are human communities. Returning Home strengthens the “soil” of belonging—the invisible field that supports clear seeing, wise coordination, and integrity in action.",
    bullets: [
      "Disconnected from place",
      "Overextended in service",
      "Unsure how to contribute meaningfully",
      "Surrounded by activity but lacking coherence",
    ],
  },
  chapters: {
    title: "The Three Chapters",
    cards: [
      {
        number: "1",
        title: "Remembering Home",
        body: "Participatory storytelling to listen to one another and our shared world.",
      },
      {
        number: "2",
        title: "Revealing the Way Home",
        body: "Experiences and games to sense what is ready to emerge.",
      },
      {
        number: "3",
        title: "Reconnecting & Walking Home",
        body: "Experience design and collective action to live more fully in our shared world.",
      },
    ],
  },
  shifts: {
    title: "What Shifts Through Participation",
    fromLabel: "From",
    toLabel: "To",
    pairs: [
      { from: "Isolation", to: "Shared context" },
      { from: "Diffuse effort", to: "Coordinated movement" },
      { from: "Abstraction", to: "Lived experience" },
      { from: "Individual strain", to: "Distributed stewardship" },
      { from: "Nostalgia", to: "Grounded future vision" },
    ],
    note: "No grand promises. Just observable shifts in coherence.",
  },
  voices: {
    title: "The words of participants",
    quotes: [
      "“I didn’t realize how fragmented I felt until we mapped our stories together. Something settled.”",
      "“This helped me see my community as a living system instead of a collection of projects.”",
      "“I stopped carrying everything alone.”",
    ],
  },
  waysToEngage: {
    title: "Ways to Engage",
    cards: [
      {
        title: "Participate",
        body: "Begin with a self-guided reflection or join a local story circle.",
        href: "#start",
        link: "Start here",
      },
      {
        title: "Host",
        body: "Invite your community into a structured Returning Home experience.",
        href: "#start",
        link: "Explore hosting",
      },
      {
        title: "Facilitate",
        body: "Train as a Returning Home facilitator and steward this practice locally.",
        href: "#start",
        link: "Learn about facilitation",
      },
      {
        title: "Partner",
        body: "Collaborate as an organization to strengthen your place-based ecosystem.",
        href: "#start",
        link: "Partner with us",
      },
    ],
  },
  finalCta: {
    id: "start",
    headline: "You can begin where you are.",
    subline: "Alone and with a journal, or with a friend and grow from there.",
    primaryCta: { href: "/begin", label: "Begin Returning Home →" },
    secondaryText:
      "Curious about our story and how the practice works? We've shared that here.",
    secondaryLink: { href: "/mission-and-method", label: "Explore the mission & method →" },
  },
  footer: {
    line1: "Returning Home is part of -",
    line2: "Supporting communities in hearing the voice of their place.",
    copyrightName: "Awakening Lands",
  },
} as const;

