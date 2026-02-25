import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { mockScreens } from "../mock/screens";
import { executeAction } from "../engine/actionExecutor";

export const useScreenStore = defineStore("screen", () => {
  const currentKey = ref("welcome_portal");
  const dynamicScreen = ref(null);
  const history = ref([]);

  // Track values/state for screens (e.g. composer text)
  const screenState = reactive({
    day_number: 1,
    identity_state: "steady",
    identity_headline: "The Beginning",
    identity_subtext: "Your journey starts with a single step.",
    mantra_progress: "0 / 27 reps",
    sankalp_status: "Pending",
    anchor_status: "Pending",
    challenge_text: "Observe your breath for 1 minute.",
    focus_name: "",
    mantra_text: "",
    sankalp_text: "",
    anchor_minutes: 0,
    reps_total: 21,
    cycle_history: [],
    identity_delta: [
      { label: "Stability", initial: 4, current: 7 },
      { label: "Clarity", initial: 3, current: 6 },
      { label: "Presence", initial: 5, current: 8 },
    ],
    reps_consistency: [
      { label: "Mon", initial: 10, current: 18 },
      { label: "Tue", initial: 12, current: 15 },
      { label: "Wed", initial: 8, current: 21 },
      { label: "Thu", initial: 15, current: 20 },
      { label: "Fri", initial: 10, current: 19 },
    ],
    identity_map_data: {
      Stability: 8,
      Focus: 7,
      Clarity: 9,
      Awareness: 6,
      Resilience: 7,
      Presence: 8,
    },
    insight_data: {
      total_sessions: 0,
      consistency_score: "0%",
      momentum: "None",
    },
    trigger_patterns: [
      { label: "Mon", initial: 1, current: 3 },
      { label: "Tue", initial: 2, current: 5 },
      { label: "Wed", initial: 1, current: 2 },
      { label: "Thu", initial: 3, current: 4 },
      { label: "Fri", initial: 2, current: 3 },
    ],
    dharmic_response_options: [
      {
        id: "patient",
        title: "Radical Patience",
        description: "Wait with zero internal friction.",
      },
      {
        id: "disciplined",
        title: "Focused Action",
        description: "Execute without overthinking.",
      },
      {
        id: "surrendered",
        title: "Graceful Yield",
        description: "Let go of control entirely.",
      },
      {
        id: "compassionate",
        title: "Silent Empathy",
        description: "Feel without reacting.",
      },
    ],
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
          const keys = p1.trim().split(".");
          let val = screenState;
          for (const k of keys) {
            val = val?.[k];
          }
          return val !== undefined && val !== null ? val : "";
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

      // If it's a navigation target pointing to a state/variant, resolve it
      if (target.state_id && mockScreens[target.state_id]) {
        loadScreen(target.state_id);
        return;
      }
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
    const actionObj = typeof action === "string" ? { type: action } : action;
    executeAction(
      { ...actionObj, currentScreen: currentScreen.value },
      { loadScreen, goBack, setScreenValue, mockScreens, screenState },
    );
  }

  // Smart Resume: Skip onboarding if a cycle is already active
  // if (currentKey.value === "portal" && screenState.day_number >= 2) {
  //   currentKey.value = "daily_checkin_1";
  // }

  return {
    currentKey,
    currentScreen,
    currentTheme,
    currentMood,
    history,
    loadScreen,
    goBack,
    handleAction,
    setScreenValue,
    screenState,
  };
});
