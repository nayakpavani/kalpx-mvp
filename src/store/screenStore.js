import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { mockScreens } from "../mock/screens";
import { executeAction } from "../engine/actionExecutor";

export const useScreenStore = defineStore("screen", () => {
  // MOCK: Toggle this boolean to switch between fresher and experienced user flow
  const isExperiencedUser = true; // Set to false to test fresh user flow
  const currentKey = ref(isExperiencedUser ? "portal_splash" : "portal");

  const dynamicScreen = ref(null);
  const history = ref([]);

  // Track values/state for screens (e.g. composer text)
  const screenState = reactive({});

  // Tone management
  const currentTheme = computed(
    () => currentScreen.value?.tone?.theme || "gold_dark",
  );
  const currentMood = computed(
    () => currentScreen.value?.tone?.mood || "steady",
  );

  const currentScreen = computed(() => {
    const screen = dynamicScreen.value || mockScreens[currentKey.value];
    if (!screen) return null;

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
      if (target.container_id === "dashboard") {
        lastGeneratedDashboard.value = target;
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
