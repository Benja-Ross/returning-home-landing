export const landingContent = {
  brand: "Returning Home",
  hero: {
    eyebrow: "Returning Home",
    titleLines: ["A shared practice", "to grow life", "in place."],
    body: "What becomes possible when we turn home together?",
  },
  whatItIs: {
    title: "What is Returning Home?",
    body:
      "Returning Home is a guided journey that helps people reconnect to where they live, discover what their place wants to be, and bring new possibilities to life together."
  },
  howItWorks: {
    title: "How does it work?",
    paragraphs: [
      "The three-chapter pattern works at many scales.",
      "One person can begin alone. A small circle can move through it together. A whole community can return to it again and again.",
      "One of the most powerful moments comes when people see their stories mapped together and recognize something they want to experience in their place together.",
      "Depth grows over time.",
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
        body: "Experience design and collective action to live more fully into our shared world.",
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

