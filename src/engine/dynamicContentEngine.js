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
  const { focus, sub_focus, baseline_metrics, intention, depth } = inputData;

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
    .filter(
      ([key, val]) =>
        typeof val === "number" && key !== "day_number" && val > 0,
    )
    .map(([key, val]) => `• ${key}: ${val}/10`)
    .join("\n");

  // Return data only (no screen construction)
  return {
    focusName: focusNames[focus] || focus,
    intro: `I have analyzed your request for ${
      focusNames[focus] || focus
    }. You identified your current state as "${
      sub_focus || "uncentered"
    }" with the following baseline prana levels:`,
    metricsSummary,
    insightText,
    ritual: {
      title: practice,
      meta: `${iast} ${
        devanagari ? `(${devanagari})` : ""
      } • ${duration} daily (${depth?.toUpperCase()} depth)`,
    },
    sankalpa: {
      line: `“${sankalpa}”`,
      title: sankalpa,
    },
    mantra: {
      line: mantra,
      iast,
      title: selectedMantra?.title || iast,
      devanagari,
    },
    theme,
    masterData: {
      selectedMantra,
      selectedSankalp,
      selectedPractice,
    },
  };
}

export function generateInfoScreenData(type, data) {
  if (!data) return null;

  if (type === "mantra") {
    return {
      title: data.title || data.iast,
      subtitle: data.devanagari || data.iast || "",
      description: data.meaning || data.essence || "",
      meta: data.source ? `Source: ${data.source}` : "",
    };
  } else if (type === "sankalp") {
    return {
      title: "Sankalpa",
      subtitle: data.line,
      description: data.insight || "",
      meta: "Your spiritual intention.",
    };
  } else if (type === "practice") {
    return {
      title: data.title,
      subtitle: "",
      description: data.summary || "",
      steps_text: data.steps ? data.steps.map((s, i) => `${i + 1}. ${s}`).join("\n") : "",
      meta: data.benefits ? data.benefits.join(" • ") : "",
    };
  }
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
    suggestedFocus,
    focusLabel,
    intro: `I've analyzed your current friction and your intention to "${
      intention || "seek growth"
    }".`,
    analysisText,
    buttonLabel: isReanalysis
      ? `Preview ${focusLabel} Focus →`
      : `Begin ${focusLabel} Path →`,
    isReanalysis,
  };
}

export function generatePathEvolutionScreen(oldFocus, newFocus) {
  const focusNames = {
    careerprosperity: "Career & Prosperity",
    focusmotivation: "Focus & Motivation",
    emotionalhealing: "Emotional Healing",
    gratitudepositivity: "Gratitude & Positivity",
    spiritualgrowth: "Spiritual Growth",
    healthwellbeing: "Health & Wellbeing",
    peacecalm: "Inner Calm",
  };

  return {
    oldFocusName: focusNames[oldFocus] || oldFocus,
    newFocusName: focusNames[newFocus] || newFocus,
    evolutionText: `You are shifting from ${
      focusNames[oldFocus] || oldFocus
    } to ${
      focusNames[newFocus] || newFocus
    }. This transition reflects an expanding level of awareness as you integrate previous learnings into a new dimension of your practice.`,
    theme: "light_sandal",
  };
}

/**
 * Generates a Prana Baseline screen customized to the user's selected focus.
 */
// End of dynamic content engine
