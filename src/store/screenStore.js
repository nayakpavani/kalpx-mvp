import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { mockScreens } from "../mock/screens";
import { executeAction } from "../engine/actionExecutor";

export const useScreenStore = defineStore("screen", () => {
  // MOCK: Toggle this boolean to switch between fresher and experienced user flow
  const isExperiencedUser = false; // Set to false to test fresh user flow
  const currentKey = ref(isExperiencedUser ? "portal_splash" : "portal");

  const dynamicScreen = ref(null);
  const history = ref([]);

  // Track values/state for screens (e.g. composer text)
  const screenState = reactive({
    identity_headline: "The Steady Flame",
    identity_subtext: "Consistency is your roots.",
    identity_state: "steady",
    mantra_progress: "18 / 27 reps",
    sankalp_status: "Embodied",
    anchor_status: "Stabilized",
    challenge_text: "Choose patience in traffic.",
    day_number: 11,
    cycle_history: [
      { id: 1, name: "Peace & Calm", date: "Jan 2026", status: "Completed", growth: "+12%" },
      { id: 2, name: "Focus & Drive", date: "Feb 2026", status: "Completed", growth: "+8%" },
      { id: 3, name: "Emotional Resilience", date: "Current", status: "Active", growth: "In Progress" },
    ],
    identity_delta: [
      { label: "Stability", initial: 3, current: 7 },
      { label: "Awareness", initial: 4, current: 8 },
      { label: "Presence", initial: 2, current: 6 },
    ],
    identity_map_data: {
      Stability: 7,
      Focus: 8,
      Clarity: 5,
      Awareness: 9,
      Resilience: 6,
      Presence: 7,
    },
    insight_data: {
      total_sessions: 42,
      consistency_score: "94%",
      deepest_focus: "Inner Peace",
      momentum: "Extreme",
      next_milestone: "Neural Rewiring (Day 21)",
    },
    sankalp_text: "I am the ocean, not the wave.",
    mantra_reps: "108 / Day",
    anchor_duration: "14 Minutes",
    refinement_layer: "Prana Awareness",
    reflection_questions: [
      { id: "obstacle", label: "What was your biggest obstacle today?", type: "textarea", placeholder: "Describe the friction..." },
      { id: "victory", label: "What was a small victory?", type: "text", placeholder: "Even a single breath counts..." },
      { id: "tomorrow", label: "One intention for tomorrow?", type: "text", placeholder: "I will be..." }
    ],
    dharmic_response_options: [
      { id: "patient", title: "Radical Patience", description: "Wait with zero internal friction." },
      { id: "disciplined", title: "Focused Action", description: "Execute without overthinking." },
      { id: "surrendered", title: "Graceful Yield", description: "Let go of control entirely." },
      { id: "compassionate", title: "Silent Empathy", description: "Feel without reacting." }
    ]
  });

  // Helper to resolve {{variable}} placeholders
  function interpolate(obj) {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => interpolate(item));
    }

    const result = {};
    for (const key in obj) {
      let value = obj[key];

      if (typeof value === "string") {
        // Simple regex to find {{keyword}}
        value = value.replace(/\{\{(.+?)\}\}/g, (match, p1) => {
          return screenState[p1.trim()] !== undefined
            ? screenState[p1.trim()]
            : match;
        });
      } else if (typeof value === "object") {
        value = interpolate(value);
      }

      result[key] = value;
    }
    return result;
  }

  // Tone management
  const currentTheme = computed(
    () => currentScreen.value?.tone?.theme || "gold_dark",
  );
  const currentMood = computed(
    () => currentScreen.value?.tone?.mood || "steady",
  );

  const currentScreen = computed(() => {
    let screen = dynamicScreen.value || mockScreens[currentKey.value];
    if (!screen) return null;

    // Resolve any {{placeholders}} in the screen definition
    screen = interpolate(screen);

    // Inject the current state into the screen object for components/executor
    const screenId = screen.id || currentKey.value;
    return { ...screen, value: screenState[screenId] };
  });

  function setScreenValue(value, id = null) {
    const screenId = id || dynamicScreen.value?.id || currentKey.value;
    screenState[screenId] = value;
  }

  const lastGeneratedDashboard = ref(null);

  function loadScreen(target) {
    if (typeof target === "string") {
      if (target === "dashboard" && lastGeneratedDashboard.value) {
        history.value.push({
          key: currentKey.value,
          dynamic: dynamicScreen.value,
        });
        dynamicScreen.value = lastGeneratedDashboard.value;
        return;
      }
      if (mockScreens[target]) {
        history.value.push({
          key: currentKey.value,
          dynamic: dynamicScreen.value,
        });
        dynamicScreen.value = null;
        currentKey.value = target;
      } else {
        console.warn(`Screen key ${target} not found`);
      }
    } else if (typeof target === "object" && target !== null) {
      // Special handling for dashboard container
      if (target.container_id === "dashboard") {
        lastGeneratedDashboard.value = target;
      }

      // If it's a navigation target pointing to a variant, resolve it
      if (target.variant && mockScreens[target.variant]) {
        loadScreen(target.variant);
        return;
      }

      history.value.push({
        key: currentKey.value,
        dynamic: dynamicScreen.value,
      });
      dynamicScreen.value = target;
    }
  }

  function goBack() {
    if (history.value.length > 0) {
      const prev = history.value.pop();
      currentKey.value = prev.key;
      dynamicScreen.value = prev.dynamic;
    }
  }

  function handleAction(action) {
    if (!action) return;
    executeAction(
      { ...action, currentScreen: currentScreen.value },
      { loadScreen, goBack, setScreenValue, mockScreens, screenState },
    );
  }

  // Smart Resume: Skip onboarding if a cycle is already active
  if (currentKey.value === "portal" && screenState.day_number >= 2) {
    currentKey.value = "daily_checkin_1";
  }

  return {
    currentKey,
    currentScreen,
    currentTheme,
    currentMood,
    loadScreen,
    goBack,
    handleAction,
    setScreenValue,
    screenState,
  };
});
