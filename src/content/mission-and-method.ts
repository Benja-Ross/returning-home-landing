export type MissionAndMethodContent = {
  pageTitle: string
  pageSubtitle: string
  opening: string[]
  structure: {
    title: string
    intro: string
    learningLabels: [string, string, string]
    chapterTitles: [string, string, string]
    reinforcement: string
  }
  arcChapters: {
    title: string
    description: string
  }[]
  chapters: {
    remembering: string[]
    revealing: string[]
    reconnecting: string[]
  }
  humanEcology: {
    intro: string[]
    bullets: string[]
    closing: string[]
  }
  howThisGrows: string[]
  benjiNote: {
    bullets: string[]
    closing: string
  }
  lineage: {
    title: string
    body: string
  }
}

export const missionAndMethod: MissionAndMethodContent = {
  pageTitle: "Mission and Method",
  pageSubtitle:
    "Returning Home is a calm, place-based arc for deepening shared understanding, belonging, and agency in specific places.",
  opening: [
    "We care about the world we inhabit. How could we not? It’s the only home we’ve got.",

    "Even when we're facing life's challenges, when something happens like an unanticipated sunset making the sky surreal, or being witness to a great act of kindness, we are reminded of how good it is to be here.",

    "We want to celebrate what brings life, honor what brings us awe, respond to what is suffering, and contribute in ways that matter.",

    "But many of us also see that people, places, and the Earth as a whole are experiencing deep fragmentation. The challenges we face are complex and interconnected. It's important we all see clearly that no individual can stand alone.",

    "When we look out at what’s happening, we can feel isolated and overwhelmed while the larger picture. What we can do has become harder to see. Without shared understanding and purpose, shared direction and action, and sturdy webs of relationship, our individual and collective efforts remain scattered and insufficient.",

    "In our globalized and transient world, we must remember together that place is where relationships take root. It is in specific neighborhoods, watersheds, and towns that resilience becomes real. When our attention is pulled elsewhere, the connections that make us strong are weakened. When we bring our attention home and to all that means, the conditions for vitality can return.",

    "Returning Home exists to offer a clear, grounded, and ongoing path forward, based on something fundamental."
  ],

  structure: {
    title: "The Fundamental Nature of Returning Home",
    intro: "The Returning Home practice follows the basic pattern of how learning happens.",
    learningLabels: ["Observe & Listen", "Reflect & Integrate", "Act & Embody"],
    chapterTitles: ["Remembering Home", "Revealing the Way Home", "Reconnecting & Walking Home"],
    reinforcement:
      "Together, the three chapters form a learning path back to community and place."
  },

  arcChapters: [
    {
      title: "Remembering Home",
      description:
        "Participatory storytelling to listen to one another and our shared world."
    },
    {
      title: "Revealing the Way Home",
      description:
        "Experiences and games to sense what is ready to emerge."
    },
    {
      title: "Reconnecting & Walking Home",
      description:
        "Experience design and collective action to live more fully into our shared world."
    }
  ],

  chapters: {
    remembering: [
      "In this chapter, people share real stories about the places where they live. Through participatory storytelling, neighbors surface what makes a place home, and in doing so they are tending to what makes a sense of togetherness and shared direction possible.",

      "In a world where our attention is so often scattered and elsewhere, stories of place surface what is too often overlooked or hidden in plain sight. We may learn of a group doing something inspiring right down the street. We may learn beavers have returned to a local river and the river’s character has changed. We may hear a story of the first time someone new to the area really felt at home, and thus see our own home with new eyes. We may learn of a project that is good or even necessary for all but in critical need of greater support.",

      "As stories accumulate, people see more connections between their local lives. A shared picture, one that includes differences, naturally forms. And there’s a moment in the storytelling when we realize the deeper purpose in it all, that we’re not only seeing our place more clearly, but our attention is aligning, making it possible to see ahead together."
    ],

    revealing: [
      "In this chapter, groups pause and look at their stories together. This phase is for reflecting and engaging collective intelligence to make sense of previously shared stories in a way no one could do alone.",

      "In a fragmented culture, individual stories placed side by side do not automatically form a clear shared picture. Often there is obvious connection and overlap, but this is also a moment when our fragmentation can become more visible. What is needed is a shared foundation to start, a kind of map that enables our stories to sit in proximity no matter how awkwardly. From there, we create space to pause, reflect, and notice emerging patterns and possibilities for connection.",

      "In the Returning Home practice, we are finding it helpful to use simple, game-like formats to support all of this. Clear phases and questions can help the group shift perspective. When people understand the structure, their trust and patience grows, space is allowed, patterns more easily surface, and shared intention and direction can begin to take shape.",

      "Shared ways of sensing don't arrive fully formed, nor do things come together at the same time for everyone. But with structure and care, alignment can grow.",

      "When that alignment forms, it can feel energizing. Something that was diffuse begins to feel more whole. The group begins to sense what their place is asking of them, what it wants to be."
    ],

    reconnecting: [
      "In this chapter, groups bring what they’ve learned into a conversation with the physical world.",

      "When the group has moved through thoughtful reflection and begun to see from a shared perspective, a next step often becomes surprisingly clear. It doesn’t need to be a big step and often it's better that it's not. It simply needs to feel aligned with what the group has heard and sensed together.",

      "The Returning Home practice is experimenting with simple, thoughtfully designed story walks to support taking that next step. These walks invite participants to move through their own streets, along rivers, neighborhoods, into kitchens, living rooms, and communal gathering places while carrying a shared storyline. As they walk, the surrounding community and landscape become active participants. People can notice how reality responds.",

      "It also doesn't need to be anything grand. Sometimes simply walking with a friend to locations shared in Chapter 1 stories is the most appropriate thing to do.",

      "Walking our stories into the world generates feedback. What has formed within the group deepens: shared meaning, direction, purpose, attention, and intention. This is when the value in the cyclical nature of the overall practice also becomes clear."
    ]
  },

  humanEcology: {
    intro: [
      "By now, the value of the arc may feel intuitive, but why does this matter beyond a single group or gathering?",
      "Ecology offers a helpful lens.",
      "A healthy forest thrives because of interconnection. Its strength comes from relationships, roots exchanging nutrients through mycelium networks, water slowed and absorbed by soil, pollinators carrying life from one tree to another. No single organism holds the system together. It’s the full picture of interconnectivity that does.",
      "Human communities are no different."
    ],

    bullets: [
      "Belonging is like a connective root system.",
      "Collective sense-making is like a mycelial network that allows information to move.",
      "Shared purpose directs energy.",
      "Continuity carries memory across generations.",
      "Connection to place grounds the system in a living context.",
      "Collective action circulates energy throughout the whole."
    ],

    closing: [
      "Returning Home is a practice that strengthens these connective patterns in real places.",
      "It does so by restoring shared attention.",
      "By creating space for reflection.",
      "By moving insight into lived action.",
      "What happens over time if this rhythm becomes part of the ecology of a place?"
    ]
  },

  howThisGrows: [
    "Returning Home is designed to begin simply.",

    "It may start with one person journaling alone through Chapter 1. From there, they may invite a few neighbors to share stories. In other places, a small group may begin together from the start. Sometimes a local organization discovers that the arc strengthens work already underway and a larger container for the practice is formed.",

    "This practice grows where there is readiness and interest. It does not require a large launch or a centralized campaign. It only requires a seed of interest and a willingness to begin.",

    "As participation deepens, rhythm forms, momentum builds, and shared intention becomes recognizable. Just like a newly returning forest, what becomes possible soon exceeds what any individual could carry alone.",

    "Facilitators play an important role in this process. These are people willing to host conversations, guide reflection, and steward the arc with continuity. We are actively learning how to support and train facilitators so the practice remains vital, adaptable, and locally rooted.",

    "As more communities experiment with this practice, learning and stories can travel between places. Each community’s practice is shaped by its own context, yet insights can move across the wider ecology.",

    "Our intention is steady development rather than rapid expansion, planting seeds of the practice where the soil is ready and moving at a pace that strengthens relationships rather than straining them. A healthy human ecology relies on a web or trust and mutual understanding, after all",

    "We're all about attuning to place. We meet people where they are, and go from there."
  ],

  benjiNote: {
    bullets: [
      "The purpose behind this practice is larger than any one person, to say the least.",
      "But I do want to offer a human presence behind the work. I don't want to claim a title other than practitioner, and now you know at least one face and voice devoted to helping this grow.",
      "It has grown through so many relationships, mentorships, experiments, and patience.",
      "The part of my background that influences me most was when I was an aspiring agriculturalist and Permaculture practicioner. I long wanted to start a  farm and community kitchen. Then, years of living with disabling illness redirected my path and shaped how I understand wholeness, resilience, and will.",
      
    ],

    closing:
      "I strive to bring those lessons along as I continue to learn more about Returning Home.",
  },

  lineage: {
    title: "A Note on Lineage",
    body:
      "Returning Home is informed by a lineage of participatory storytelling, collective sense-making, regenerative design, and experience-based learning. Influences include Insight Share, Prosocial World, the Presencing Institute, and WeAreYonder. We will continue learning from the people and communities exploring how to return home, from around the world.",
  },
}