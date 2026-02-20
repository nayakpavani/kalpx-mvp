import { ContainerRegistry } from "./allContainers";

export const mockScreens = {
  // --- PHASE 1: ENTRY ---
  portal_splash: {
    id: "portal_splash",
    container_id: "portal_splash",
    tone: { theme: "gold_dark", mood: "steady" },
    blocks: [
      { type: "lotus_logo" },
    ],
  },

  portal: {
    id: "portal",
    container_id: "portal",
    tone: { theme: "gold_dark", mood: "steady" },
    blocks: [
      { type: "lotus_logo" },
      { type: "headline", content: "KalpX Companion" },
      { type: "subtext", content: "Step into structure. Begin your scan." },
      {
        type: "chip_list",
        options: [
          { id: "seek_growth", label: "Growth" },
          { id: "seek_clarity", label: "Clarity" },
          { id: "seek_pressure", label: "Pressure" },
          { id: "seek_purpose", label: "Purpose" },
          { id: "seek_peace", label: "Peace" },
          { id: "seek_strength", label: "Strength" },
        ],
      },
      {
        type: "primary_button",
        label: "Initiate Prana Scan →",
        action: { type: "navigate", target: "scan_focus" },
        style: "gold",
      },
    ],
  },

  // --- PHASE 2: FOCUS SELECTION ---
  scan_focus: {
    id: "scan_focus",
    container_id: "choice_stack",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      {
        type: "headline",
        content: "What feels most important right now?",
        position: "header",
      },
      {
        type: "subtext",
        content: "Choose one path to focus on for 14 days.",
        position: "header",
      },
      {
        id: "scan_focus",
        type: "choice_card",
        selection_mode: "manual",
        options: [
          {
            id: "careerprosperity",
            title: "Career & Prosperity",
            description: "For leadership, success, and wealth.",
            icon: "fas fa-mountain",
            selected: true,
          },
          {
            id: "peacecalm",
            title: "Peace & Calm",
            description: "For clarity and silencing the noise.",
            icon: "fas fa-leaf",
          },
          {
            id: "emotionalhealing",
            title: "Emotional Healing",
            description: "For release and heart connection.",
            icon: "fas fa-heart",
          },
          {
            id: "focusmotivation",
            title: "Focus & Motivation",
            description: "For mental drive and sharp clarity.",
            icon: "fas fa-bullseye",
          },
          {
            id: "gratitudepositivity",
            title: "Gratitude & Positivity",
            description: "For joy and attracting abundance.",
            icon: "fas fa-sun",
          },
          {
            id: "healthwellbeing",
            title: "Health & Wellbeing",
            description: "For physical vigor and balance.",
            icon: "fas fa-heartbeat",
          },
          {
            id: "spiritualgrowth",
            title: "Spiritual Growth",
            description: "For deep connection and wisdom.",
            icon: "fas fa-om",
          },
        ],
      },
      {
        type: "subtext",
        content: "Not sure? Help me choose →",
        variant: "link",
        action: { type: "navigate", target: "help_me_choose_1" },
        position: "footer",
      },
      {
        type: "primary_button",
        label: "Continue →",
        action: { type: "generate_prana_baseline" },
        style: "gold",
        position: "footer",
      },
    ],
  },

  help_me_choose_1: {
    id: "help_me_choose_1",
    container_id: "stable_scan",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      {
        type: "headline",
        content: "Where do you feel the most friction?",
        position: "header",
      },
      {
        type: "subtext",
        content: "Identify the area where energy feels blocked.",
        position: "header",
      },
      {
        type: "chip_list",
        options: [
          { id: "friction_work", label: "Work & Success" },
          { id: "friction_mental", label: "Mental Clarity" },
          { id: "friction_emotional", label: "Emotional Heaviness" },
          { id: "friction_abundance", label: "Lack of Progress" },
          { id: "friction_spiritual", label: "Disconnected" },
          { id: "friction_physical", label: "Low Vitality" },
          { id: "friction_inner", label: "Overthinking" },
        ],
      },
      {
        type: "primary_button",
        label: "That's it →",
        action: { type: "navigate", target: "help_me_choose_2" },
        style: "gold",
        position: "footer",
      },
    ],
  },

  help_me_choose_2: {
    id: "help_me_choose_2",
    container_id: "composer",
    tone: { theme: "light_sandal", mood: "steady" },
    placeholder: "In one word or sentence, what do you want to change?",
    blocks: [
      {
        type: "headline",
        content: "Your Intention.",
        position: "header",
      },
      {
        type: "subtext",
        content: "Speak from the heart. What needs to shift?",
        position: "header",
      },
      {
        type: "primary_button",
        label: "Analyze My Path →",
        action: { type: "generate_help_me_choose" },
        style: "gold",
        position: "footer",
      },
    ],
  },


  // --- PHASE 4: CHOOSE YOUR DEPTH ---
  routine_setup: {
    id: "routine_setup",
    container_id: "choice_stack",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      { type: "headline", content: "Choose your depth.", position: "header" },
      {
        type: "subtext",
        content:
          "You will repeat the same core practice daily. Repetition builds transformation.",
        position: "header",
      },
      {
        type: "choice_card",
        selection_mode: "manual",
        options: [
          {
            id: "gentle",
            title: "Gentle",
            description: "A seed of awareness.",
            meta: "3 minutes daily.",
            icon: "fas fa-seedling",
            selected: true,
          },
          {
            id: "standard",
            title: "Standard",
            description: "The steady flame.",
            meta: "7 minutes daily.",
            icon: "fas fa-fire",
          },
          {
            id: "deep",
            title: "Deep",
            description: "The warrior's path.",
            meta: "14 minutes daily.",
            icon: "fas fa-shield-alt",
          },
        ],
      },
      {
        type: "primary_button",
        label: "Proceed to Lock →",
        action: { type: "navigate", target: "lock_ritual" },
        style: "gold",
        position: "footer",
      },
    ],
  },

  // --- PHASE 5: THE LOCK ---
  lock_ritual: {
    id: "lock_ritual",
    container_id: "lock_ritual",
    tone: { theme: "gold_dark", mood: "steady" },
    button_label: "Hold to Commit",
    lock_action: { type: "generate_companion" },
    blocks: [
      {
        type: "headline",
        content: "Seal the 14-Day Cycle",
        position: "header",
      },
      {
        type: "subtext",
        content: "Hold the button below to commit to your practice.",
        position: "header",
      },
    ],
  },

  // --- PHASE 6: DAY COMPLETE ---
  day_complete: {
    id: "day_complete",
    container_id: "cycle_transitions",
    tone: { theme: "gold_dark", mood: "steady" },
    tag: "DAY 1 COMPLETE",
    blocks: [
      { type: "lotus_logo", position: "header" },
      {
        type: "headline",
        content: "Growth in Repetition.",
        position: "header",
      },
      {
        type: "subtext",
        content:
          "You have completed your anchor for today. Day 2 is unlocked tomorrow.",
        position: "content",
      },
      {
        type: "practice_card",
        title: "Your Progress",
        description: "14-Day Cycle: Day 1 of 14",
        meta: "Progress: 7%",
        icon: "fas fa-chart-line",
      },
      {
        type: "primary_button",
        label: "Back to Dashboard →",
        action: { type: "navigate", target: "dashboard" },
        style: "gold",
        position: "footer",
      },
    ],
  },

  // --- TESTING/FALLBACK DASHBOARD ---
  dashboard: {
    id: "dashboard",
    container_id: "dashboard",
    tone: { theme: "gold_dark", mood: "steady" },
    day_title: "Day 4 of 14 — Karma & Clarity",
    day_number: 4,
    triggered_action: { type: "navigate", target: "help_me_choose_1" },
    checkin_action: { type: "navigate", target: "insights_day_7" },
    blocks: [
      {
        id: "practice_chant",
        type: "practice_card",
        title: "Chant",
        description: "Om Namah Shivaya",
        meta: "27 repetitions • 3 minutes",
        icon: "fas fa-om",
        action_label: "Start →",
        action: {
          type: "navigate",
          target: {
            container_id: "practice_runner",
            variant: "mantra_runner",
            mantra_text: "Om Namah Shivaya",
            target_count: 27,
          },
        },
      },
      {
        id: "practice_embody",
        type: "practice_card",
        title: "Embody",
        description: "“I act sincerely and release attachment to outcomes.”",
        icon: "fas fa-fire",
        action_label: "I Embody This →",
        action_style: "outline",
      },
      {
        id: "practice_act",
        type: "practice_card",
        title: "Act",
        description: "Complete one focused 20-minute Karma block.",
        icon: "fas fa-mountain",
        action_label: "Mark Focus Complete →",
        action_style: "outline",
      },
      {
        type: "subtext",
        content: "Reflect before resting →",
        variant: "link",
        position: "footer",
        action: { type: "navigate", target: "day_complete" },
      },
    ],
  },

  daily_checkin_1: {
    id: "daily_checkin_1",
    container_id: "stable_scan",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      {
        type: "headline",
        content: "Entering Day 4.",
        position: "header",
      },
      {
        type: "subtext",
        content: "How is your brain feeling after 3 days of repetition?",
        position: "header",
      },
      {
        type: "chip_list",
        options: [
          { id: "brain_calm", label: "Closer to center" },
          { id: "brain_resisting", label: "Still resisting" },
          { id: "brain_clear", label: "Surprisingly clear" },
          { id: "brain_heavy", label: "Still heavy" },
        ],
      },
      {
        type: "primary_button",
        label: "Continue →",
        action: { type: "navigate", target: "daily_checkin_2" },
        style: "gold",
        position: "footer",
      },
    ],
  },

  cycle_complete_review: {
    id: "cycle_complete_review",
    container_id: "sadhana_deepen",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      { type: "subtext", variant: "small", content: "CYCLE COMPLETE", position: "header" },
      { type: "headline", content: "You have completed 7 days.", position: "header" },
      { type: "subtext", variant: "italic", content: "Consistency builds character.\nChoice builds mastery.", position: "header" },
      {
        type: "insight_card",
        position: "content",
        description: "You began this cycle feeling anxious.\nNow your clarity is steadier."
      },
      { type: "spacer", height: 24, position: "content" },
      {
        type: "choice_card",
        selection_mode: "auto",
        position: "content",
        options: [
          {
            id: "continue",
            title: "Continue This Path",
            description: "Go deeper into the same practice. Depth creates transformation.",
            icon: "fas fa-fire",
            action: { type: "navigate", target: "sadhana_extension" }
          },
          {
            id: "deepen",
            title: "Deepen Your Practice",
            description: "Re-analyze your current state and discover a new alignment focus.",
            icon: "fas fa-leaf",
            action: { type: "navigate", target: "help_me_choose_1" }
          }
        ]
      },
      {
        type: "subtext",
        content: "Repetition builds steadiness.\nExpansion builds mastery.",
        position: "footer",
        variant: "italic_multiline"
      }
    ]
  },

  insights_day_7: {
    id: "insights_day_7",
    container_id: "insight_summary",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      { type: "subtext", variant: "small", content: "DAY 7 INSIGHT — KARMA & CLARITY SADHANA", position: "header" },
      { type: "headline", content: "Your growth is becoming visible.", position: "header" },
      { type: "subtext", variant: "italic", content: "Awareness precedes transformation.", position: "header" },
      {
        type: "insight_card",
        position: "content",
        description: "You paused before reacting 6 times this week.\nEarlier, those moments passed unnoticed."
      },
      {
        type: "trend_chart",
        position: "content",
        title: "Calm & Clarity Trend",
        data: [
          { label: "Calm", values: [4, 6, 3, 5, 5, 7, 7] },
          { label: "Clarity", values: [5, 4, 3, 3, 4, 6, 7] }
        ],
        footer_text: "Your mind steadiness increased steadily after Day 3."
      },
      {
        type: "insight_card",
        position: "content",
        list: [
          { icon: "fas fa-eye", text: "You felt most restless before work conversations" },
          { icon: "fas fa-lotus", text: "You returned to your Sankalp faster mid-week" },
          { icon: "fas fa-fire", text: "Your calm improved on days you completed Sadhana early" }
        ]
      },
      {
        type: "insight_card",
        position: "content",
        title: "I act sincerely and release attachment to outcomes.",
        description: "You embodied this Sankalp on 4 of 7 days.",
        meta: "Embodiment grows through repetition."
      },
      { type: "subtext", variant: "italic_multiline", content: "Progress is not about never slipping.\nIt is about returning with awareness.", position: "content" },
      {
        type: "primary_button",
        label: "Continue for 7 more days",
        meta: "Deepen steadiness.",
        action: { type: "navigate", target: "cycle_complete_review" },
        style: "gold",
        position: "footer"
      },
      {
        type: "subtext",
        content: "Explore a new focus\nShift consciously.",
        variant: "link",
        position: "footer",
        action: { type: "navigate", target: "help_me_choose_1" }
      },
      {
        type: "subtext",
        content: "You are training the mind — not chasing outcomes.",
        position: "footer",
        variant: "italic"
      }
    ]
  },

  sadhana_refine: {
    id: "sadhana_refine",
    container_id: "sadhana_deepen",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      { type: "subtext", variant: "small", content: "DEEPEN YOUR SADHANA", position: "header" },
      { type: "headline", content: "Strengthen What You Have Begun", position: "header" },
      { type: "subtext", content: "You will keep your core mantra and sankalp.\nWe will refine your discipline.", position: "header" },
      {
        type: "insight_card",
        position: "content",
        title: "Your Core:",
        list: [
          { text: "Mantra: Om Namah Shivaya" },
          { text: "Sankalp: I act sincerely and release attachment to outcomes" },
          { text: "Anchor: Focused Karma Sadhana" }
        ],
        meta: "The roots remain. Only depth increases."
      },
      {
        type: "choice_card",
        selection_mode: "manual",
        position: "content",
        title: "Choose Your Refinement Layer",
        options: [
          {
            id: "deepen",
            title: "Deepen Through Repetition",
            description: "Increase mantra reps and\nextend anchor duration.\n\n• 27 → 54 reps\n• Anchor practice +5 minutes",
            icon: "fas fa-link",
            meta: "Strength comes from repetition.",
            selected: true
          },
          {
            id: "observe",
            title: "Add Inner Observation",
            description: "Introduce a mid-day awareness\npause and deeper reflection question.\n\n• 1 trigger awareness reminder\n• 1 advanced svādhyāya prompt daily",
            icon: "fas fa-lotus",
            meta: "Refinement sharpens awareness."
          },
          {
            id: "action",
            title: "Activate Dharma in Action",
            description: "Apply your Sankalp consciously\nin real-world situations.\n\n• 1 daily real-world application task\n• Evening accountability check",
            icon: "fas fa-arrow-up",
            meta: "Transformation must enter action."
          }
        ]
      },
      {
        type: "subtext",
        content: "You are not changing your path. You are strengthening it.",
        position: "footer",
        variant: "italic"
      },
      {
        type: "primary_button",
        label: "Begin Next 7 Days →",
        action: { type: "navigate", target: "sadhana_extension" },
        style: "gold",
        position: "footer"
      },
      {
        type: "subtext",
        content: "Return to Current Practice",
        variant: "link",
        position: "footer",
        action: { type: "navigate", target: "dashboard" }
      }
    ]
  },
  
  sadhana_extension: {
    id: "sadhana_extension",
    container_id: "sadhana_deepen",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: [
      { type: "subtext", variant: "small", content: "CONTINUING YOUR PATH", position: "header" },
      { type: "headline", content: "The Roots Deepen.", position: "header" },
      { type: "subtext", content: "You are choosing steadiness over novelty. That is how depth is formed.", position: "header" },
      {
        type: "insight_card",
        position: "content",
        title: "Your Current Anchor:",
        list: [
          { text: "Mantra: Om Namah Shivaya", icon: "fas fa-om" },
          { text: "Sankalp: I act sincerely and release attachment to outcomes", icon: "fas fa-heart" },
        ],
        meta: "The practice remains the same. Your attention must become subtler."
      },
      {
        type: "primary_button",
        label: "Begin Extended Practice →",
        action: { type: "navigate", target: "dashboard" },
        style: "gold",
        position: "footer"
      }
    ]
  }
};

// Inject all 68 JSON states directly into the mock registry so they can be routed to freely
Object.keys(ContainerRegistry).forEach((registryKey) => {
  const container = ContainerRegistry[registryKey];
  const containerId = container.container_id;
  
  if (container.states) {
    Object.keys(container.states).forEach((stateKey) => {
      // Create a flat entry for each state from JSON
      // So if "welcome_portal" is requested, it automatically maps to the correct state block and container
      mockScreens[stateKey] = {
        id: stateKey,
        container_id: containerId,
        ...container.states[stateKey]
      };
    });
  }
});
