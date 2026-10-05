export interface QuizQuestion {
  id: number;
  question: string;
  tagline: string;
  options: {
    label: string;
    description: string;
    icon: string;
    familyWeight: {
      woody?: number;
      fresh?: number;
      musky?: number;
      spicy?: number;
      sweet?: number;
      aquatic?: number;
    };
  }[];
}

export const SCENT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What mood describes your personal winter aura?',
    tagline: 'Step 1 of 5 — Your Baseline Energy',
    options: [
      {
        label: 'Mysterious & Nocturnal',
        description: 'Magnetic darkness, smoky jazz bars, velvet overcoats, leather seats',
        icon: 'Moon',
        familyWeight: { woody: 3, spicy: 2, musky: 1 }
      },
      {
        label: 'Clean & Quiet Luxury',
        description: 'Understated elegance, cashmere knits, modern art galleries, subtle refinement',
        icon: 'Sparkles',
        familyWeight: { musky: 3, fresh: 2, woody: 1 }
      },
      {
        label: 'Bold, Rebellious & Sensual',
        description: 'Statement maker, head-turning sillage, dark cherry liqueur, club nightlife',
        icon: 'Flame',
        familyWeight: { sweet: 3, spicy: 3 }
      },
      {
        label: 'Crisp, Electric & Free-Spirited',
        description: 'Icy mountain air, brisk city mornings, energetic citrus and mineral notes',
        icon: 'Compass',
        familyWeight: { aquatic: 3, fresh: 3 }
      }
    ]
  },
  {
    id: 2,
    question: 'When do you want your fragrance to command the room?',
    tagline: 'Step 2 of 5 — Temporal Horizon',
    options: [
      {
        label: 'Midnight After-Hours (8 PM - 4 AM)',
        description: 'Intense projection for chilly nighttime adventures and upscale dinners',
        icon: 'Clock',
        familyWeight: { woody: 2, sweet: 2, spicy: 2 }
      },
      {
        label: 'Crisp Winter Daylight (8 AM - 6 PM)',
        description: 'Invigorating, refined, and office/campus compliant with zero cloying',
        icon: 'Sun',
        familyWeight: { fresh: 3, aquatic: 2, musky: 2 }
      },
      {
        label: 'Seamless 24-Hour Signature',
        description: 'An adaptable chameleon that transitions effortlessly from dawn to dusk',
        icon: 'Zap',
        familyWeight: { musky: 2, woody: 2, aquatic: 1 }
      }
    ]
  },
  {
    id: 3,
    question: 'Do you prefer ice-cold freshness or ember-like warmth?',
    tagline: 'Step 3 of 5 — Temperature Profile',
    options: [
      {
        label: 'Deep Resinous Warmth',
        description: 'Charred oak barrels, bourbon vanilla, tobacco leaves, warm amber stones',
        icon: 'Flame',
        familyWeight: { spicy: 3, woody: 3 }
      },
      {
        label: 'Sub-Zero Icy Frost',
        description: 'Frosted aldehydes, crisp alpine juniper, cooling ocean breeze',
        icon: 'Snowflake',
        familyWeight: { aquatic: 3, fresh: 3 }
      },
      {
        label: 'Decadent Gourmet Sweetness',
        description: 'Saffron-infused roasted cacao, black cherries, praline, molten honey',
        icon: 'Heart',
        familyWeight: { sweet: 3, spicy: 1 }
      },
      {
        label: 'Soft Cashmere Skin Veil',
        description: 'Powdery Tuscan iris, clean second-skin musks, comforting wool feel',
        icon: 'Feather',
        familyWeight: { musky: 3, woody: 1 }
      }
    ]
  },
  {
    id: 4,
    question: 'What is your preferred projection & sillage style?',
    tagline: 'Step 4 of 5 — Spatial Presence',
    options: [
      {
        label: 'Nuclear & Room-Filling',
        description: 'Leaves a noticeable scent trail everywhere you step (10+ feet radius)',
        icon: 'Radio',
        familyWeight: { woody: 3, spicy: 3, sweet: 2 }
      },
      {
        label: 'Sophisticated Conversational Bubble',
        description: 'Detectable to those seated near you (3 to 5 feet radius)',
        icon: 'Shield',
        familyWeight: { woody: 2, fresh: 2, musky: 2 }
      },
      {
        label: 'Intimate Second-Skin Whispers',
        description: 'Reserved exclusively for those lucky enough to lean in close for a hug',
        icon: 'Eye',
        familyWeight: { musky: 3, aquatic: 1 }
      }
    ]
  },
  {
    id: 5,
    question: 'What is the primary occasion for this scent?',
    tagline: 'Step 5 of 5 — The Destination',
    options: [
      {
        label: 'Winter Dates & Intimate Encounters',
        description: 'Magnetic attraction, close warmth, irresistible drydown',
        icon: 'Heart',
        familyWeight: { sweet: 2, musky: 2, woody: 2 }
      },
      {
        label: 'High-Impact Nightlife & Winter Raves',
        description: 'Cutting through smoke and heavy winter layers with bold intensity',
        icon: 'Activity',
        familyWeight: { spicy: 3, sweet: 2, woody: 2 }
      },
      {
        label: 'Daily Signature for Urban Living',
        description: 'Effortlessly polished whether in university, meetings, or coffee runs',
        icon: 'Coffee',
        familyWeight: { fresh: 2, musky: 2, woody: 1 }
      }
    ]
  }
];
