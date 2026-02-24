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
    identity_delta: [],
    identity_map_data: {
      Stability: 0,
      Focus: 0,
      Clarity: 0,
      Awareness: 0,
      Resilience: 0,
      Presence: 0,
    },
    insight_data: {
      total_sessions: 0,
      consistency_score: "0%",
      momentum: "None",
    },
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
    executeAction(
      { ...action, currentScreen: currentScreen.value },
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
