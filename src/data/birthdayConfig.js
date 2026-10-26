/**
 * ==============================================================================
 * A LITTLE UNIVERSE OF LUCKY ❤️
 * A Special Birthday Gift Made with Love by Kanchana
 * 
 * "We may not have photos together, Lucky, but I still have little moments
 *  with you that make me smile. So I turned those feelings into a birthday gift,
 *  made with love by Kanchana."
 * ==============================================================================
 */

export const birthdayConfig = {
  // ---------------------------------------------------------------------------
  // 1. CORE PERSONALIZATION
  // ---------------------------------------------------------------------------
  friendName: "Lucky",
  senderName: "Kanchana",
  birthdayDate: "Today",
  projectTitle: "A Little Universe of Lucky ❤️",
  subtitleTag: "Made with love by Kanchana, especially for Lucky ❤️",

  // Nickname meaning
  nicknameStory: {
    quote: "Some names are just names, but some names carry a little piece of someone's heart. Lucky is the name I gave you, and now it holds so many beautiful memories for me. ❤️",
    author: "Kanchana",
  },

  // ---------------------------------------------------------------------------
  // 2. SCREEN 1: WELCOME SCREEN
  // ---------------------------------------------------------------------------
  welcome: {
    heading: "Hey Lucky! ❤️",
    subtitle: "Kanchana has made something special just for you...",
    buttonText: "Open Your Birthday Surprise 🎁",
  },
  welcomeGreeting: "Hey Lucky! ❤️",
  welcomeSubtitle: "Kanchana has made something special just for you...",
  welcomeButtonText: "Open Your Birthday Surprise 🎁",

  // Audio & Music Configuration
  audio: {
    customAudioUrl: null,
    useSynthesizer: true,
    enableSoundEffects: true,
    defaultVolume: 0.5,
  },

  // ---------------------------------------------------------------------------
  // 3. SCREEN 2: BIRTHDAY CELEBRATION
  // ---------------------------------------------------------------------------
  celebration: {
    title: "Happy Birthday, Lucky! 🎂",
    tagline: "Today is your special day, and I hope it brings you endless smiles and happiness. ✨",
    wishCardTitle: "A Birthday Wish From Kanchana ❤️",
    wishCardMessage: "Happy Birthday, Lucky! I hope your day is as bright, wonderful, and joyful as you are. Thank you for being such a caring and special friend to me. May this year bring you all the happiness, peace, and success you deserve. Always cheering for you!",
    candleCount: 5,
    instructionBlow: "Tap the candles or click below to make a wish and blow them out! 🕯️",
    instructionBlown: "Your wish has been carried into the stars! ✨ Continue into our little world whenever you're ready.",
  },

  // ---------------------------------------------------------------------------
  // 4. SCREEN 3: "OUR LITTLE WORLD 🌙" & LATE-NIGHT TALKS
  // ---------------------------------------------------------------------------
  ourLittleWorld: {
    heading: "We May Not Have Photos Together, But We Have Moments Worth Remembering.",
    introParagraphs: [
      "Lucky, we may not have pictures together to put inside a scrapbook, but that doesn't mean we don't have memories.",
      "We have our conversations, our late-night talks, our random messages, and those little moments that made me smile while looking at my screen.",
      "Maybe our friendship exists through a screen, but the happiness it brings me is real.",
      "So, instead of showing you photographs, I made a little world out of words, just for you.",
    ],
    signoff: "— Kanchana ❤️",

    // 6 Late-Night Talk Memories
    lateNightMemories: [
      {
        id: 1,
        title: "Those Late-Night Talks",
        badge: "Late Nights 🌙",
        emoji: "🌙",
        quote: "Some nights, I don't even realize how quickly time passes when we are talking. One message becomes another, and suddenly it is much later than I expected. Those conversations are some of the moments I enjoy the most.",
        timeHint: "Late Night Hours",
      },
      {
        id: 2,
        title: "One Message Can Change My Mood",
        badge: "A Sudden Smile 😊",
        emoji: "✨",
        quote: "Sometimes, seeing a message from you is enough to bring a smile to my face. It's a small thing, but it can make an ordinary day feel a little better.",
        timeHint: "Notification Ping",
      },
      {
        id: 3,
        title: "Talking About Random Things",
        badge: "Random Chats 💬",
        emoji: "💬",
        quote: "We don't always need an important topic to talk about. Even random conversations can be fun when I'm talking to you. It's the person I'm talking to that makes the conversation special.",
        timeHint: "Anytime of the Day",
      },
      {
        id: 4,
        title: "The Time I Forget to Check the Clock",
        badge: "Losing Track of Time ⏳",
        emoji: "⏰",
        quote: "Sometimes, I get so involved in our conversation that I forget to notice the time. I just enjoy talking to you and don't want the conversation to end too quickly.",
        timeHint: "1:30 AM Vibes",
      },
      {
        id: 5,
        title: "Our Little Online World",
        badge: "Across the Screen 📱",
        emoji: "🌐",
        quote: "We may not sit next to each other or take pictures together, but we still have our own little world through messages. It is made up of conversations, smiles, and moments that belong to our friendship.",
        timeHint: "Our Safe Space",
      },
      {
        id: 6,
        title: "The Messages I Remember",
        badge: "Words in the Heart 💭",
        emoji: "❤️",
        quote: "Not every memorable moment needs a screenshot. Sometimes, a few words from someone can stay in your mind for a long time. That's why some of our conversations mean so much to me.",
        timeHint: "Always Remembered",
      },
    ],

    // "If Our Chats Could Talk..." interactive playful bubbles
    chatVibesNote: "These are playful sample messages inspired by the feeling of late-night conversations. They are not copied from our real chats.",
    chatBubbles: [
      { sender: "Kanchana", text: "One last message, then I'll sleep. 😂", delay: 0 },
      { sender: "Kanchana", text: "Wait, I have one more thing to tell you.", delay: 1 },
      { sender: "Kanchana", text: "How did we end up talking for so long again? 🌙", delay: 2 },
      { sender: "Kanchana", text: "Okay, seriously, this is my last message.", delay: 3 },
      { sender: "Kanchana", text: "And now I have another thing to say. 😭❤️", delay: 4 },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. SCREEN 4: "IF OUR FRIENDSHIP WERE A LITTLE BOOK" 📖 & LITTLE THINGS
  // ---------------------------------------------------------------------------
  book: {
    title: "If Our Friendship Were a Little Book",
    subtitle: "A digital storybook of five chapters written from the heart.",
    chapters: [
      {
        number: 1,
        title: "Chapter 1 — A Screen Brought Us Together",
        tag: "How It Began",
        content: "Sometimes, people enter our lives through the most unexpected ways. Our friendship began online, but I'm happy that I got the chance to know you.",
      },
      {
        number: 2,
        title: "Chapter 2 — The Conversations",
        tag: "Little Talks",
        content: "Little by little, talking became something I genuinely enjoyed. Even ordinary topics could turn into conversations I wanted to continue.",
      },
      {
        number: 3,
        title: "Chapter 3 — The Late Nights",
        tag: "Midnight Hours",
        content: "Those late-night talks have their own special feeling. The quiet of the night, the messages, and the way time passes while talking make those moments memorable to me.",
      },
      {
        number: 4,
        title: "Chapter 4 — The Feeling",
        tag: "Why You're Special",
        content: "I don't always know how to explain why someone becomes special. Sometimes, I simply enjoy their presence in my life. That's how I feel about you, Lucky.",
      },
      {
        number: 5,
        title: "Chapter 5 — Still More to Come",
        tag: "Looking Forward",
        content: "Our story doesn't need photographs to be meaningful. There are still conversations to have, jokes to share, and new memories to make. I hope we create many more.",
      },
    ],

    // "Little Things That Remind Me of You"
    remindersTitle: "Little Things That Remind Me of You ✨",
    remindersSubtitle: "Tap each card to reveal the little feeling behind it.",
    reminders: [
      {
        id: "rem-1",
        title: "Late-Night Conversations",
        emoji: "🌙",
        description: "There's something special about talking when the rest of the world feels quiet. I enjoy those moments with you.",
      },
      {
        id: "rem-2",
        title: "Random Messages",
        emoji: "💬",
        description: "A random message in the middle of a busy day that instantly makes things feel lighter and happier.",
      },
      {
        id: "rem-3",
        title: "Smiling at My Screen",
        emoji: "😊",
        description: "Sometimes, I read a message and smile without even realizing it. You might not see that smile through the screen, but it happens.",
      },
      {
        id: "rem-4",
        title: "Waiting to Continue a Good Conversation",
        emoji: "⏳",
        description: "Leaving a topic open and looking forward to coming back to it, knowing we always have things to talk about.",
      },
      {
        id: "rem-5",
        title: "Laughing at Silly Things",
        emoji: "😂",
        description: "Those little jokes that only make sense between the two of us, making an ordinary day brighter.",
      },
      {
        id: "rem-6",
        title: "Forgetting How Late It Has Become",
        emoji: "⏰",
        description: "Checking the clock and being surprised at how quickly time flies whenever we are talking.",
      },
      {
        id: "rem-7",
        title: "Having Something to Tell You",
        emoji: "💭",
        description: "Whenever something funny or interesting happens in my day, you are one of the first people I want to share it with.",
      },
      {
        id: "rem-8",
        title: "Feeling Happy That I Know You",
        emoji: "❤️",
        description: "A simple, quiet feeling of gratitude that in this big world, our paths crossed through a screen.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. SCREEN 5: "10 SIMPLE REASONS" & "THINGS I NEVER GET TIRED OF TELLING YOU"
  // ---------------------------------------------------------------------------
  reasonsSectionTitle: "10 Simple Reasons Why You Are Special to Me, Lucky ❤️",
  reasonsSectionSubtitle: "Each of these reasons comes straight from my heart in simple words.",
  reasons: [
    {
      number: 1,
      title: "You Make Me Smile 😊",
      description: "Even on an ordinary day, talking to you can make me smile. Sometimes, the smallest conversations become my favourite moments.",
      iconName: "Smile",
      color: "#f472b6",
    },
    {
      number: 2,
      title: "I Can Be Myself With You 🫶",
      description: "I don't have to pretend to be someone else around you. I can talk freely, laugh, and be myself.",
      iconName: "Heart",
      color: "#ec4899",
    },
    {
      number: 3,
      title: "Our Conversations Matter to Me 💬",
      description: "I enjoy talking with you, whether we discuss something important or just silly things. Those little conversations mean a lot to me.",
      iconName: "MessageCircle",
      color: "#a855f7",
    },
    {
      number: 4,
      title: "You Make Ordinary Moments Special ✨",
      description: "Even simple moments can become good memories when I share them with you.",
      iconName: "Sparkles",
      color: "#fbbf24",
    },
    {
      number: 5,
      title: "I Care About Your Happiness 💗",
      description: "I want to see you happy and doing well in life. Your happiness matters to me.",
      iconName: "HeartHandshake",
      color: "#f43f5e",
    },
    {
      number: 6,
      title: "I Like the Person You Are 🌟",
      description: "You don't have to be perfect to be special. I appreciate you for being yourself.",
      iconName: "Star",
      color: "#eab308",
    },
    {
      number: 7,
      title: "Our Memories Make Me Happy 📸",
      description: "Whenever I think about the good moments we have shared, I feel happy. I hope we create many more memories together.",
      iconName: "Camera",
      color: "#38bdf8",
    },
    {
      number: 8,
      title: "You Give Me Reasons to Laugh 😂",
      description: "Sometimes, even the funniest little things we say can make my day better. I love those moments.",
      iconName: "Laugh",
      color: "#34d399",
    },
    {
      number: 9,
      title: "You Have Your Own Special Place in My Life ❤️",
      description: "Everyone is different, and everyone has their own place in our lives. You have a special place in mine.",
      iconName: "Award",
      color: "#f97316",
    },
    {
      number: 10,
      title: "Because You Are My Lucky 🍀",
      description: "Lucky isn't just a name I call you. It is a nickname I gave you, and it reminds me of the bond and memories we share. I'm happy that this name became a little part of our story.",
      iconName: "Clover",
      color: "#10b981",
    },
  ],

  // "Things I Never Get Tired of Telling You" 💗
  thingsINeverGetTiredOfTellingYou: [
    "I really like talking to you, Lucky.",
    "Your messages can make me smile without you even knowing it.",
    "I wish our conversations could last a little longer sometimes.",
    "I like the little things about our friendship.",
    "Even though we are friends online, you have become special to me.",
    "Sometimes, I have so much to say to you that I don't know where to begin.",
    "I may not always explain my feelings perfectly, but that doesn't mean I don't care.",
    "I'm glad that I got to know you.",
    "If I could save one thing from our friendship, I would save the feeling of being happy while talking to you.",
    "Lucky, you are someone I genuinely like, and I wanted you to know that.",
  ],

  // ---------------------------------------------------------------------------
  // 7. SCREEN 6: "A LITTLE TRUTH FROM KANCHANA" ❤️ (THE BIRTHDAY LETTER)
  // ---------------------------------------------------------------------------
  letterEnvelopePrompt: "Lucky, there's something I wanted you to know...",
  letter: {
    salutation: "Hey Lucky,",
    paragraphs: [
      "I don't know if I always express myself properly, but I want you to know that I like you very much.",
      "I enjoy our conversations, especially our late-night talks. Sometimes, even a simple message from you can make me smile.",
      "I know our friendship is online, and we don't have photographs together to fill a memory album. But I still have little moments and conversations that I enjoy remembering.",
      "I'm happy that I got to know you. I don't need every moment to be extraordinary; sometimes, simply talking to you is enough to make me happy.",
      "I made this little website because I wanted to give you something different for your birthday. Something made with my own effort, with words that express a little of what I feel.",
      "Happy Birthday, Lucky. ❤️",
      "I hope you smile while exploring this little world I created for you.",
    ],
    closing: "With love,",
    signature: "Kanchana 💗",
  },

  // ---------------------------------------------------------------------------
  // 8. SCREEN 7: FINAL SCREEN — "OUR STORY DOESN'T NEED PHOTOS" 🌌
  // ---------------------------------------------------------------------------
  finalLines: [
    "We may not have pictures together...",
    "But we have conversations I enjoy remembering.",
    "We may be miles apart...",
    "But I can still smile while talking to you.",
    "We may have met through a screen...",
    "But the happiness I feel is real.",
    "And if I could give you one more thing today...",
    "It would be more beautiful moments to remember.",
    "Happy Birthday, Lucky! 🎂❤️",
    "Made with love, just for you.",
    "— Kanchana",
  ],

  finalScreen: {
    badge: "Under the Starlight 🌙",
    title: "Our Story Doesn't Need Photos",
    tagline: "The happiness and memories we share are real.",
    downloadButtonText: "Download My Keepsake Letter 💌",
    replayButtonText: "Read Our Story Again 🚀",
    virtualHugButtonText: "Send a Virtual Hug to Kanchana 💖",
    closingNote: "Made with love by Kanchana, especially for Lucky ❤️",
  },
};

/**
 * Helper to replace variables
 */
export function personalize(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/\{friendName\}/g, birthdayConfig.friendName)
    .replace(/\[FRIEND_NAME\]/g, birthdayConfig.friendName)
    .replace(/\{senderName\}/g, birthdayConfig.senderName)
    .replace(/\[YOUR_NAME\]/g, birthdayConfig.senderName);
}
