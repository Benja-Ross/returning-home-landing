export const landingContent = {
  brand: "Returning Home",
  hero: {
    eyebrow: "Returning Home",
    title: "A participatory practice for strengthening belonging and human ecology.",
    body:
      "Returning Home is a guided, three-chapter journey that helps individuals and communities rediscover connection to place, deepen shared understanding, and move toward regenerative action together.",
    primaryCta: { href: "#start", label: "Begin the Journey" },
    secondaryCta: { href: "#how", label: "Learn how it works →" },
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
        title: "Remembering Life & Place",
        body: "Reconnecting to lived experience, memory, and the feeling of home.",
      },
      {
        number: "2",
        title: "Revealing Transformation",
        body: "Seeing clearly what is changing—within ourselves and within the community.",
      },
      {
        number: "3",
        title: "Reconnecting Home",
        body: "Walking the story forward through grounded imagination and shared commitment.",
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
    title: "Voices",
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
    title: "Start with Chapter 1",
    body: "Take the short Returning Home Assessment and begin the first chapter at your own pace.",
    primaryCta: { href: "#", label: "Begin Chapter 1" },
    secondaryCta: { href: "#", label: "Download overview PDF →" },
  },
  footer: {
    body:
      "Returning Home is stewarded through Awakening Lands, a civic storytelling initiative focused on strengthening human ecology across places.",
    copyrightName: "Awakening Lands",
  },
} as const;

