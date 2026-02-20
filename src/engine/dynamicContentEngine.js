import masterMantras from "../data_seed/master_mantras.json";
import masterPractices from "../data_seed/master_practices.json";
import masterSankalps from "../data_seed/master_sankalps.json";

function getRandomItem(list, focus, locale = "en") {
  // Filter by category and locale
  let filtered = list.filter(
    (item) => item.category_id === focus && item.locale === locale,
  );

  // If no category match, try general items for that locale
  if (filtered.length === 0) {
    filtered = list.filter(
      (item) => item.is_general === true && item.locale === locale,
    );
  }

  // Final fallback to any item of that locale if still empty
  if (filtered.length === 0) {
    filtered = list.filter((item) => item.locale === locale);
  }

  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function generateCompanionResponse(inputData) {
  const { focus, sub_focus, baseline_metrics, intention, depth, day_number } =
    inputData;

  const focusNames = {
    careerprosperity: "Career & Prosperity",
    peacecalm: "Peace & Calm",
    emotionalhealing: "Emotional Healing",
    focusmotivation: "Focus & Motivation",
    gratitudepositivity: "Gratitude & Positivity",
    healthwellbeing: "Health & Wellbeing",
    spiritualgrowth: "Spiritual Growth",
  };

  // 1. Pick Master Data
  const selectedMantra = getRandomItem(masterMantras, focus);
  const selectedPractice = getRandomItem(masterPractices, focus);
  const selectedSankalp = getRandomItem(masterSankalps, focus);

  // Fallbacks if data is missing or corrupted
  const mantra = selectedMantra?.title || selectedMantra?.iast || "OM SHANTI";
  const iast = selectedMantra?.iast || mantra;
  const devanagari = selectedMantra?.devanagari || "";
  const sankalpa =
    selectedSankalp?.line || intention || "I am present and grounded.";
  const practice = selectedPractice?.title || "Mindful Breathing";

  let insightText =
    selectedSankalp?.insight ||
    "I sense a need for grounding in your current energy.";
  let theme = focus === "careerprosperity" ? "gold_dark" : "light_sandal";

  // Depth-based duration
  const durations = {
    gentle: "3 minutes",
    standard: "7 minutes",
    deep: "14 minutes",
  };
  const duration = durations[depth] || "7 minutes";

  // Summarize baseline metrics for display
  const metricsSummary = Object.entries(baseline_metrics || {})
    .filter(([key, val]) => typeof val === "number" && key !== "day_number")
    .map(([key, val]) => `• ${key}: ${val}/10`)
    .join("\n");

  // Build the dynamic reveal screen (AI insight)
  return {
    container_id: "cycle_transitions",
    tone: { theme: "gold_dark", mood: "steady" },
    tag: "AI COMPANION ANALYSIS",
    blocks: [
      { type: "lotus_logo", position: "header" },
      { type: "headline", content: "Your Path is Set.", position: "header" },
      {
        type: "subtext",
        content: `I have analyzed your request for ${
          focusNames[focus] || focus
        }. You identified your current state as "${
          sub_focus || "uncentered"
        }" with the following baseline prana levels:`,
        position: "content",
      },
      {
        type: "subtext",
        content: metricsSummary,
        variant: "small",
        position: "content",
      },
      { type: "subtext", content: insightText, position: "content" },
      {
        type: "practice_card",
        title: "Selected Ritual",
        description: practice,
        meta: `${iast} ${
          devanagari ? `(${devanagari})` : ""
        } • ${duration} daily (${depth?.toUpperCase()} depth)`,
        icon: "fas fa-leaf",
        position: "content",
        info_action: {
          type: "navigate",
          target: generateInfoScreen("practice", selectedPractice),
        },
      },
      {
        type: "practice_card",
        title: "Sankalpa",
        description: `“${sankalpa}”`,
        icon: "fas fa-heart",
        meta: "Your spiritual intention.",
        position: "content",
        info_action: {
          type: "navigate",
          target: generateInfoScreen("sankalp", selectedSankalp),
        },
      },
      {
        type: "practice_card",
        title: "Mantra",
        description: mantra,
        icon: "fas fa-om",
        meta: "The sound of transformation.",
        position: "content",
        info_action: {
          type: "navigate",
          target: generateInfoScreen("mantra", selectedMantra),
        },
      },
      {
        type: "primary_button",
        label: "Seal & Enter Dashboard →",
        action: {
          type: "navigate",
          target: generateDashboard({
            selectedMantra,
            selectedSankalp,
            selectedPractice,
            theme,
            duration,
            day_number: day_number || 1,
          }),
        },
        style: "gold",
        position: "footer",
      },
      {
        type: "subtext",
        content: "Repetition is the mother of transformation.",
        position: "footer",
      },
    ],
  };
}

function generateDashboard({
  selectedMantra,
  selectedSankalp,
  selectedPractice,
  theme,
  duration,
  day_number = 1,
}) {
  const mantra = selectedMantra?.iast || selectedMantra?.title || "OM SHANTI";
  const sankalpa = selectedSankalp?.line || "I am present and grounded.";
  const practice = selectedPractice?.title || "Mindful Breathing";
  // 1. Generate a Post-Practice Reflection Screen for middle of cycle (Day 4+)
  // function generateReflectionScreen(day) {
  //   const isBrainMilestone = day >= 6;

  //   return {
  //     container_id: "cycle_transitions",
  //     tone: { theme: theme, mood: "steady" },
  //     tag: `DAY ${day} INSIGHT`,
  //     blocks: [
  //       { type: "lotus_logo", position: "header" },
  //       {
  //         type: "headline",
  //         content: isBrainMilestone
  //           ? "Your brain is adapting."
  //           : "Holding the Center.",
  //         position: "header",
  //       },
  //       {
  //         type: "subtext",
  //         content: isBrainMilestone
  //           ? "You've stayed steady for 6 days. Your neural pathways are beginning to favor this new rhythm."
  //           : "How did you hold your center today? Was the mantra a shield or a mirror?",
  //         position: "content",
  //       },
  //       {
  //         type: "primary_button",
  //         label: "Return to Dashboard →",
  //         action: { type: "navigate", target: "dashboard" },
  //         style: "gold",
  //         position: "footer",
  //       },
  //       {
  //         type: "subtext",
  //         content:
  //           day >= 7
  //             ? "Feeling ready for more? Refine My Sadhana →"
  //             : "Stick to the roots.",
  //         variant: "link",
  //         action:
  //           day >= 7 ? { type: "navigate", target: "routine_setup" } : null,
  //         position: "footer",
  //       },
  //     ],
  //   };
  // }

  // Choose which screen to show after practice
  const nextTarget =
    day_number >= 4 ? generateReflectionScreen(day_number) : "dashboard";

  // Post-practice completion screen for a single item
  const itemCompleteScreen = {
    container_id: "day_complete",
    tone: { theme: theme, mood: "steady" },
    tag: day_number > 1 ? `DAY ${day_number} PROGRESS` : "FOCUS COMPLETE",
    blocks: [
      { type: "lotus_logo", position: "header" },
      {
        type: "headline",
        content:
          day_number >= 6
            ? "Congratulations! 6 Days Sealed."
            : "Steady Progress.",
        position: "header",
      },
      {
        type: "subtext",
        content:
          day_number >= 6
            ? "You are halfway to a new habit. Your persistence is rewriting your baseline."
            : "You have completed this part of your anchor.",
        position: "content",
      },
      {
        type: "subtext",
        content: "How are you feeling now?",
        variant: "small",
        position: "content",
      },
      {
        type: "chip_list",
        options: [
          { id: "calm_now", label: "Calm now" },
          { id: "better_now", label: "Better now" },
          { id: "energized_now", label: "Energized" },
          { id: "neutral_now", label: "Neutral" },
        ],
        position: "content",
      },
      {
        type: "primary_button",
        label: "Next →",
        action: { type: "navigate", target: nextTarget },
        style: "gold",
        position: "footer",
      },
      {
        type: "subtext",
        content: "Skip Reflection",
        variant: "link",
        action: { type: "navigate", target: nextTarget },
        position: "footer",
      },
    ],
  };

  const triggeredScreen = {
    container_id: "cycle_transitions",
    tone: { theme: "gold_dark", mood: "steady" },
    tag: "AWARENESS PAUSE",
    blocks: [
      { type: "lotus_logo", position: "header" },
      { type: "headline", content: "Pause.", position: "header" },
      {
        type: "subtext",
        content: "The world can wait 15 seconds.",
        position: "header",
      },
      {
        type: "triggered_orb",
        sankalpa_text: sankalpa,
        position: "content",
      },
      {
        type: "subtext",
        content: "Is this reaction aligned with your Sankalp?",
        position: "content",
      },
      {
        type: "primary_button",
        label: "I Choose to Respond",
        action: {
          type: "record_pause",
          payload: { success: true },
          target: generateTriggeredOutcomeScreen(true, theme),
        },
        style: "gold",
        position: "content",
      },
      {
        type: "primary_button",
        label: "I Am Reacting",
        action: {
          type: "record_pause",
          payload: { success: false },
          target: generateTriggeredOutcomeScreen(false, theme),
        },
        style: "outline",
        position: "content",
      },
    ],
  };

  function generateReflectionScreen(day, theTheme) {
    return {
      container_id: "cycle_transitions",
      tone: { theme: theTheme, mood: "steady" },
      tag: `DAY ${day} REFLECTION`,
      blocks: [
        { type: "lotus_logo", position: "header" },
        {
          type: "headline",
          content: "How did you hold your center today?",
          position: "header",
        },
        {
          type: "subtext",
          content: "This is awareness, not judgment.",
          variant: "italic",
          position: "header",
        },
        {
          type: "alignment_selector",
          id: "daily_alignment",
          options: [
            {
              id: "aligned",
              label: "I stayed aligned",
              subtext: "I acted with steadiness.",
              color: "green",
              icon: "fas fa-check",
            },
            {
              id: "slipped",
              label: "I slipped, but returned",
              subtext: "I noticed and came back.",
              color: "gold",
            },
            {
              id: "lost",
              label: "I lost my center today",
              subtext: "I reacted more than I wished.",
              color: "blue",
            },
          ],
          position: "content",
        },
        {
          type: "reflection_input",
          id: "awareness_moment",
          label: "What was one moment of awareness today?",
          placeholder: "It can be small. Even a pause counts.",
          position: "content",
        },
        {
          type: "baseline_slider",
          label: "Mind Today:",
          id: "mind_state_today",
          min: 0,
          max: 10,
          position: "content",
        },
        {
          type: "subtext",
          content:
            "You are not building perfection.\nYou are building steadiness.",
          variant: "label",
          position: "content",
        },
        {
          type: "primary_button",
          label: "Close the Day",
          action: { type: "seal_day" },
          style: "gold",
          position: "footer",
        },
        {
          type: "subtext",
          content: "Rest. The path continues tomorrow.",
          variant: "small",
          position: "footer",
        },
      ],
    };
  }

  const checkinScreen = {
    container_id: "cycle_transitions",
    tone: { theme: theme, mood: "steady" },
    tag: "QUICK CHECK-IN",
    blocks: [
      { type: "lotus_logo", position: "header" },
      {
        type: "headline",
        content: "How is your Prana right now?",
        position: "header",
      },
      {
        type: "subtext",
        content: "Just notice. No fixing required.",
        position: "header",
      },
      {
        type: "prana_selector",
        id: "quick_prana",
        options: [
          { id: "energized", label: "Energized", icon: "fas fa-sun" },
          { id: "balanced", label: "Balanced", icon: "fas fa-balance-scale" },
          { id: "agitated", label: "Agitated", icon: "fas fa-bolt" },
          { id: "drained", label: "Drained", icon: "fas fa-arrow-down" },
        ],
        position: "content",
      },
      {
        type: "primary_button",
        label: "Reflect & Close Day →",
        action: {
          type: "navigate",
          target: generateReflectionScreen(day_number, theme),
        },
        style: "gold",
        position: "footer",
      },
      {
        type: "subtext",
        content: "Return to Dashboard",
        variant: "link",
        action: { type: "navigate", target: "dashboard" },
        position: "footer",
      },
    ],
  };

  return {
    id: "dashboard",
    container_id: "dashboard",
    tone: { theme: theme, mood: "steady" },
    day_title: `Day ${day_number} of 14 — Karma & Clarity`,
    sub_header:
      day_number >= 5
        ? "The rhythm is deepening. Keep the flame steady."
        : "Same roots daily. Growth comes from repetition.",
    day_number: day_number,
    triggered_action: { type: "navigate", target: triggeredScreen },
    checkin_action: { type: "navigate", target: checkinScreen },
    blocks: [
      {
        id: "practice_chant",
        type: "practice_card",
        title: "Chant",
        description: mantra,
        meta: `27 repetitions • ${duration}`,
        icon: "fas fa-om",
        action_label: "Start →",
        info_action: selectedMantra
          ? {
              type: "navigate",
              target: generateInfoScreen("mantra", selectedMantra),
            }
          : null,
        action: {
          type: "navigate",
          target: {
            container_id: "practice_runner",
            variant: "mantra_runner",
            mantra_text: mantra,
            target_count: 27,
            complete_action: {
              type: "submit",
              payload: { practiceId: "practice_chant", completed: true },
              target: itemCompleteScreen,
            },
          },
        },
      },
      {
        id: "practice_embody",
        type: "practice_card",
        title: "Embody",
        description: `“${sankalpa}”`,
        icon: "fas fa-fire",
        action_label: "I Embody This →",
        info_action: selectedSankalp
          ? {
              type: "navigate",
              target: generateInfoScreen("sankalp", selectedSankalp),
            }
          : null,
        action: {
          type: "navigate",
          target: {
            container_id: "practice_runner",
            variant: "sankalp_embody",
            sankalp_text: sankalpa,
            complete_action: {
              type: "submit",
              payload: { practiceId: "practice_embody", completed: true },
              target: itemCompleteScreen,
            },
          },
        },
      },
      {
        id: "practice_act",
        type: "practice_card",
        title: "Karma Action",
        purpose: "REAL-WORLD INTEGRATION",
        description: practice,
        meta: "Practice this in your day-to-day life.",
        icon: "fas fa-mountain",
        action_label: "Action Sealed →",
        info_action: selectedPractice
          ? {
              type: "navigate",
              target: generateInfoScreen("practice", selectedPractice),
            }
          : null,
        action: {
          type: "submit",
          payload: { practiceId: "practice_act", completed: true },
          target: itemCompleteScreen,
        },
      },
      {
        type: "subtext",
        content:
          day_number >= 7 ? "Deepen my Sadhana →" : "Reflect before resting →",
        variant: "link",
        action:
          day_number >= 7
            ? { type: "navigate", target: "routine_setup" }
            : null,
        position: "footer",
      },
    ],
  };
}

/**
 * Generates an Outcome screen after a Triggered Pause (Victory or Acknowledgment)
 */
function generateTriggeredOutcomeScreen(isVictory) {
  return {
    container_id: "cycle_transitions",
    tone: { theme: isVictory ? "gold_dark" : "light_sandal", mood: "steady" },
    tag: isVictory ? "CONSCIOUS CHOICE" : "AWARENESS SEALED",
    blocks: [
      { type: "lotus_logo", position: "header" },
      {
        type: "headline",
        content: isVictory ? "Sankalpa Sealed." : "Noticed.",
        position: "header",
      },
      {
        type: "subtext",
        content: isVictory
          ? "You chose awareness over impulse. Every pause builds a stronger center and rewrites your baseline."
          : "Awareness of the reaction is the first step toward freedom. Be gentle with yourself and return to the center.",
        position: "content",
      },
      {
        type: "primary_button",
        label: "Return to Dashboard →",
        action: { type: "navigate", target: "dashboard" },
        style: "gold",
        position: "footer",
      },
    ],
  };
}

/**
 * Generates an Info/Detail screen for a master data item.
 */
export function generateInfoScreen(type, data) {
  if (!data) return null;

  const blocks = [
    { type: "lotus_logo", position: "header" },
    {
      type: "headline",
      content: data.title || data.iast || "Wisdom Portal",
      position: "header",
    },
  ];

  if (type === "mantra") {
    // 1. Devanagari (Centered Sacred Verse)
    if (data.devanagari) {
      blocks.push({
        type: "headline",
        content: data.devanagari,
        variant: "serif_gold_multiline",
        position: "content",
      });
    }

    // 2. IAST Transliteration
    if (data.iast) {
      blocks.push({
        type: "subtext",
        content: "PRONUNCIATION (IAST):",
        variant: "label",
        position: "content",
      });
      blocks.push({
        type: "subtext",
        content: data.iast,
        variant: "italic_multiline",
        position: "content",
      });
    }

    // 3. Meaning & Essence
    blocks.push({
      type: "subtext",
      content: "MEANING:",
      variant: "label",
      position: "content",
    });
    blocks.push({
      type: "subtext",
      content: data.meaning,
      position: "content",
    });

    if (data.essence) {
      blocks.push({
        type: "subtext",
        content: "SPIRITUAL SIGNIFICANCE:",
        variant: "label",
        position: "content",
      });
      blocks.push({
        type: "subtext",
        content: data.essence,
        variant: "italic",
        position: "content",
      });
    }

    // 4. Deity & Tags
    if (data.deity) {
      blocks.push({
        type: "subtext",
        content: `DEITY: ${data.deity}`,
        variant: "small",
        position: "footer",
      });
    }

    if (data.tags && data.tags.length > 0) {
      blocks.push({
        type: "subtext",
        content: `FOCUS: ${data.tags.join(" • ")}`,
        variant: "small",
        position: "footer",
      });
    }

    // 5. Source
    if (data.source) {
      blocks.push({
        type: "subtext",
        content: `SOURCE: ${data.source}`,
        variant: "small",
        position: "footer",
      });
    }
  } else if (type === "sankalp") {
    blocks.push({
      type: "subtext",
      content: "AFFIRMATION:",
      variant: "label",
      position: "content",
    });
    blocks.push({ type: "subtext", content: data.line, position: "content" });

    blocks.push({
      type: "subtext",
      content: "PHILOSOPHICAL INSIGHT:",
      variant: "label",
      position: "content",
    });
    blocks.push({
      type: "subtext",
      content: data.insight,
      position: "content",
    });

    if (data.how_to_live && data.how_to_live.length > 0) {
      blocks.push({
        type: "subtext",
        content: "HOW TO LIVE THIS TODAY:",
        variant: "label",
        position: "content",
      });
      data.how_to_live.forEach((step) => {
        blocks.push({
          type: "subtext",
          content: `• ${step}`,
          position: "content",
        });
      });
    }
  } else if (type === "practice") {
    blocks.push({
      type: "subtext",
      content: "PRACTICE OVERVIEW:",
      variant: "label",
      position: "content",
    });
    blocks.push({
      type: "subtext",
      content: data.summary,
      position: "content",
    });

    if (data.steps && data.steps.length > 0) {
      blocks.push({
        type: "subtext",
        content: "CORE STEPS:",
        variant: "label",
        position: "content",
      });
      data.steps.forEach((step, i) => {
        blocks.push({
          type: "subtext",
          content: `${i + 1}. ${step}`,
          position: "content",
        });
      });
    }

    if (data.benefits && data.benefits.length > 0) {
      blocks.push({
        type: "subtext",
        content: `SCIENTIFIC & SPIRITUAL BENEFITS: ${data.benefits.join(", ")}`,
        variant: "small",
        position: "footer",
      });
    }
  }

  blocks.push({
    type: "primary_button",
    label: "← Back",
    action: { type: "back" },
    style: "gold",
    position: "footer",
  });

  return {
    id: `info_${data.id || type}`,
    container_id: "cycle_transitions",
    tone: { theme: "light_sandal", mood: "steady" },
    tag: "SANATAN WISDOM",
    blocks: blocks,
  };
}
export function generateHelpMeChooseResponse(inputData) {
  const { friction, intention, isReanalysis } = inputData;

  // Logic to suggest focus based on friction
  let suggestedFocus = "peacecalm";
  let analysisText = "You seem to be navigating internal noise.";

  if (friction === "friction_work") {
    suggestedFocus = "careerprosperity";
    analysisText =
      "Your energy is currently scattering across multiple professional demands. The path of PROSPERITY will help you channel this into decisive clarity.";
  } else if (friction === "friction_mental") {
    suggestedFocus = "focusmotivation";
    analysisText =
      "Mental fog is blocking your true potential. The path of FOCUS will sharpen your intellect and drive.";
  } else if (friction === "friction_emotional") {
    suggestedFocus = "emotionalhealing";
    analysisText =
      "Your heart center is navigating complex or heavy dynamics. The path of HEALING will teach you the power of the silent witness.";
  } else if (friction === "friction_abundance") {
    suggestedFocus = "gratitudepositivity";
    analysisText =
      "A sense of lack is narrowing your horizon. The path of GRATITUDE will open the vessel needed for true abundance.";
  } else if (friction === "friction_spiritual") {
    suggestedFocus = "spiritualgrowth";
    analysisText =
      "You feel disconnected from the source. The path of GROWTH will reconnect you with the sacred steady presence.";
  } else if (friction === "friction_physical") {
    suggestedFocus = "healthwellbeing";
    analysisText =
      "Low vitality is slowing your journey. The path of WELLBEING will restore your physical vigor and natural balance.";
  } else if (friction === "friction_inner") {
    suggestedFocus = "peacecalm";
    analysisText =
      "The internal noise has become louder than your intuition. The path of CALM will help you rediscover the stillness within the storm.";
  }

  const focusNames = {
    careerprosperity: "Career & Prosperity",
    focusmotivation: "Focus & Motivation",
    emotionalhealing: "Emotional Healing",
    gratitudepositivity: "Gratitude & Positivity",
    spiritualgrowth: "Spiritual Growth",
    healthwellbeing: "Health & Wellbeing",
    peacecalm: "Inner Calm",
  };
  const focusLabel = focusNames[suggestedFocus] || "New";

  return {
    container_id: "cycle_transitions",
    tone: { theme: "light_sandal", mood: "steady" },
    tag: "AI ANALYSIS COMPLETE",
    blocks: [
      { type: "lotus_logo", position: "header" },
      { type: "headline", content: "Your Path Awaits.", position: "header" },
      {
        type: "subtext",
        content: `I've analyzed your current friction and your intention to "${
          intention || "seek growth"
        }".`,
        position: "content",
      },
      { type: "subtext", content: analysisText, position: "content" },
      {
        type: "primary_button",
        label: isReanalysis ? `Preview ${focusLabel} Focus →` : `Begin ${focusLabel} Path →`,
        action: isReanalysis 
          ? { type: "evolve_path", payload: { newFocus: suggestedFocus } }
          : {
              type: "fast_track_baseline",
              payload: { focus: suggestedFocus },
            },
        style: "gold",
        position: "footer",
      },
      {
        type: "subtext",
        content: "I will tailor your 14-day practices to this focus.",
        variant: "small",
        position: "footer",
      },
    ],
  };
}

/**
 * Generates a Prana Baseline screen customized to the user's selected focus.
 */
export function generatePranaBaseline(focus) {
  const optionsMap = {
    careerprosperity: [
      { id: "stagnant", label: "Feeling Stagnant", selected: true },
      { id: "undervalued", label: "Undervalued" },
      { id: "imposter", label: "Imposter Syndrome" },
      { id: "directionless", label: "Lack of Direction" },
      { id: "work_overwhelm", label: "Work Overwhelm" },
    ],
    peacecalm: [
      { id: "overthinking", label: "Overthinking", selected: true },
      { id: "restless", label: "Internal Restlessness" },
      { id: "anxious", label: "Anxious Energy" },
      { id: "noisy", label: "Mental Noise" },
      { id: "scattered", label: "Scattered Focus" },
    ],
    emotionalhealing: [
      { id: "heavy_heart", label: "Heavy Heart", selected: true },
      { id: "resentful", label: "Feeling Resentful" },
      { id: "lonely", label: "Loneliness" },
      { id: "disconnected", label: "Disconnected" },
      { id: "grieving", label: "Emotional Weight" },
    ],
    focusmotivation: [
      { id: "distracted", label: "Highly Distracted", selected: true },
      { id: "uninspired", label: "Uninspired" },
      { id: "procrastinating", label: "Procrastinating" },
      { id: "mental_fog", label: "Mental Fog" },
      { id: "low_drive", label: "Low Drive" },
    ],
    gratitudepositivity: [
      { id: "cynical", label: "Feeling Cynical", selected: true },
      { id: "lack_mindset", label: "Focusing on Lack" },
      { id: "pessimistic", label: "Pessimistic" },
      { id: "unappreciated", label: "Unappreciated" },
      { id: "comparing", label: "Comparison Trap" },
    ],
    healthwellbeing: [
      { id: "low_vitality", label: "Low Vitality", selected: true },
      { id: "burned_out", label: "Burned Out" },
      { id: "physically_tense", label: "Body Tension" },
      { id: "sluggish", label: "Sluggish" },
      { id: "neglectful", label: "Ignoring Body Needs" },
    ],
    spiritualgrowth: [
      { id: "lost", label: "Spiritually Lost", selected: true },
      { id: "void", label: "Inner Void" },
      { id: "meaningless", label: "Meaningless Routine" },
      { id: "material_chain", label: "Materially Bound" },
      { id: "doubting", label: "Doubting the Path" },
    ],
  };

  const subCategorySliders = {
    // Career
    stagnant: [
      { label: "Momentum", value: 3 },
      { label: "Creative Flow", value: 3 },
    ],
    undervalued: [
      { label: "Self-Worth", value: 3 },
      { label: "Recognition", value: 4 },
    ],
    imposter: [
      { label: "Confidence", value: 2 },
      { label: "Internal Truth", value: 4 },
    ],
    directionless: [
      { label: "Vision", value: 3 },
      { label: "Purpose", value: 3 },
    ],
    work_overwhelm: [
      { label: "Structure", value: 2 },
      { label: "Inner Calm", value: 3 },
    ],

    // Calm
    overthinking: [
      { label: "Stillness", value: 2 },
      { label: "Presence", value: 4 },
    ],
    restless: [
      { label: "Groundedness", value: 3 },
      { label: "Peace", value: 3 },
    ],
    anxious: [
      { label: "Breath Depth", value: 3 },
      { label: "Release", value: 2 },
    ],
    noisy: [
      { label: "Internal Silence", value: 2 },
      { label: "Space", value: 3 },
    ],
    scattered: [
      { label: "Singlepoint Focus", value: 3 },
      { label: "Clarity", value: 3 },
    ],

    // Healing
    heavy_heart: [
      { label: "Lightness", value: 2 },
      { label: "Forgiveness", value: 3 },
    ],
    resentful: [
      { label: "Letting Go", value: 3 },
      { label: "Compassion", value: 2 },
    ],
    lonely: [
      { label: "Connection", value: 3 },
      { label: "Self-Love", value: 4 },
    ],
    disconnected: [
      { label: "Internal Union", value: 3 },
      { label: "Awareness", value: 3 },
    ],
    grieving: [
      { label: "Softness", value: 3 },
      { label: "Acceptance", value: 4 },
    ],

    // Focus
    distracted: [
      { label: "Attention Span", value: 2 },
      { label: "Silence", value: 4 },
    ],
    uninspired: [
      { label: "Creative Spark", value: 3 },
      { label: "Drive", value: 3 },
    ],
    procrastinating: [
      { label: "Willpower", value: 2 },
      { label: "Impact", value: 3 },
    ],
    mental_fog: [
      { label: "Sharpness", value: 2 },
      { label: "Alertness", value: 3 },
    ],
    low_drive: [
      { label: "Energy", value: 3 },
      { label: "Ambition", value: 3 },
    ],

    // Gratitude
    cynical: [
      { label: "Openness", value: 3 },
      { label: "Faith", value: 2 },
    ],
    lack_mindset: [
      { label: "Abundance", value: 2 },
      { label: "Gratitude", value: 4 },
    ],
    pessimistic: [
      { label: "Hope", value: 3 },
      { label: "Optimism", value: 2 },
    ],
    unappreciated: [
      { label: "Contribution", value: 4 },
      { label: "Joy", value: 3 },
    ],
    comparing: [
      { label: "Uniqueness", value: 4 },
      { label: "Contentment", value: 3 },
    ],

    // Health
    low_vitality: [
      { label: "Prana Flow", value: 3 },
      { label: "Internal Fire", value: 2 },
    ],
    burned_out: [
      { label: "Nourishment", value: 2 },
      { label: "Restoration", value: 3 },
    ],
    physically_tense: [
      { label: "Release", value: 3 },
      { label: "Fluidity", value: 4 },
    ],
    sluggish: [
      { label: "Metabolism", value: 3 },
      { label: "Vigor", value: 2 },
    ],
    neglectful: [
      { label: "Body Love", value: 3 },
      { label: "Self-Care", value: 2 },
    ],

    // Spiritual
    lost: [
      { label: "Path Clarity", value: 3 },
      { label: "Inner Guide", value: 2 },
    ],
    void: [
      { label: "Fullness", value: 3 },
      { label: "Sacred Touch", value: 3 },
    ],
    meaningless: [
      { label: "Sacredness", value: 2 },
      { label: "Meaning", value: 4 },
    ],
    material_chain: [
      { label: "Detachment", value: 3 },
      { label: "Freedom", value: 2 },
    ],
    doubting: [
      { label: "Trust", value: 2 },
      { label: "Faith", value: 3 },
    ],
  };

  const focusNames = {
    careerprosperity: "Career & Prosperity",
    peacecalm: "Peace & Calm",
    emotionalhealing: "Emotional Healing",
    focusmotivation: "Focus & Motivation",
    gratitudepositivity: "Gratitude & Positivity",
    healthwellbeing: "Health & Wellbeing",
    spiritualgrowth: "Spiritual Growth",
  };

  const options = optionsMap[focus] || optionsMap.peacecalm;
  const focusName = focusNames[focus] || "your Path";

  const blocks = [
    {
      type: "headline",
      content: `Reflecting on ${focusName}.`,
      position: "header",
    },
    {
      type: "subtext",
      content: "Where do you stand today in this area? Be honest.",
      position: "header",
    },
    {
      id: "prana_baseline_selection",
      type: "chip_list",
      label: "YOUR CURRENT STATE",
      options: options,
    },
    {
      type: "primary_button",
      label: "Set My Baseline →",
      action: { type: "navigate", target: "routine_setup" },
      style: "gold",
      position: "footer",
    },
  ];

  // The initial sliders will be added by the StableScanContainer based on the default selected chip
  // But we pass the mapping along in the schema
  return {
    id: "prana_baseline",
    container_id: "stable_scan",
    tone: { theme: "light_sandal", mood: "steady" },
    blocks: blocks,
    subCategorySliders: subCategorySliders, // Pass the mapping for dynamic updates
  };
}
