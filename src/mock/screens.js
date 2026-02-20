export const mockScreens = {
  // --- PHASE 1: ENTRY ---
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
    blocks: [
      {
        id: "practice_chant",
        type: "practice_card",
        title: "Chant",
        description: "OM SHANTI",
        meta: "27 repetitions • 7 minutes",
        icon: "fas fa-om",
        action_label: "Start →",
        action: {
          type: "navigate",
          target: {
            container_id: "practice_runner",
            variant: "mantra_runner",
            mantra_text: "OM SHANTI",
            target_count: 27,
          },
        },
      },
      {
        id: "practice_embody",
        type: "practice_card",
        title: "Embody",
        description: "“I am the silent witness.”",
        icon: "fas fa-fire",
        action_label: "I Embody This →",
      },
      {
        id: "practice_act",
        type: "practice_card",
        title: "Karma Action",
        purpose: "REAL-WORLD INTEGRATION",
        description: "Practice 'Stillness': Observe without joining.",
        icon: "fas fa-mountain",
        action_label: "Action Sealed →",
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

  daily_checkin_2: {
    id: "daily_checkin_2",
    container_id: "cycle_transitions",
    tone: { theme: "light_sandal", mood: "steady" },
    tag: "RITUAL ALIGNMENT",
    blocks: [
      { type: "lotus_logo", position: "header" },
      { type: "headline", content: "Stay or Deepen?", position: "header" },
      {
        type: "subtext",
        content: "Your current roots: OM SHANTI (7 mins). Growth requires either steady repetition or intentional deepening.",
        position: "content",
      },
      {
        type: "primary_button",
        label: "Keep Current Ritual →",
        action: { type: "navigate", target: "dashboard" },
        style: "gold",
        position: "footer",
      },
      {
        type: "subtext",
        content: "I want to refine my practice →",
        variant: "link",
        action: { type: "navigate", target: "routine_setup" },
        position: "footer",
      },
    ],
  },
};
