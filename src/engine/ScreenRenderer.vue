<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

import PortalContainer from "../containers/PortalContainer.vue";
import ChoiceStackContainer from "../containers/ChoiceStackContainer.vue";
import ComposerContainer from "../containers/ComposerContainer.vue";
import LockRitualOverlay from "../containers/LockRitualOverlay.vue";
import RoutineBuilderContainer from "../containers/RoutineBuilderContainer.vue";
import RoutineLockedContainer from "../containers/RoutineLockedContainer.vue";
import CompanionDashboardContainer from "../containers/CompanionDashboardContainer.vue";
import PracticeRunnerContainer from "../containers/PracticeRunnerContainer.vue";
import EmbodimentChallengeRunnerContainer from "../containers/EmbodimentChallengeRunnerContainer.vue";
import AwarenessTriggerContainer from "../containers/AwarenessTriggerContainer.vue";
import InsightsProgressContainer from "../containers/InsightsProgressContainer.vue";
import CycleTransitionsContainer from "../containers/CycleTransitionsContainer.vue";
import StableScanContainer from "../containers/StableScanContainer.vue";

const screenStore = useScreenStore();

const containerMap = {
  portal: PortalContainer,
  choice_stack: ChoiceStackContainer,
  composer: ComposerContainer,
  lock_ritual: LockRitualOverlay,
  routine_builder: RoutineBuilderContainer,
  routine_locked: RoutineLockedContainer,
  dashboard: CompanionDashboardContainer,
  practice_runner: PracticeRunnerContainer,
  embodiment_runner: EmbodimentChallengeRunnerContainer,
  awareness_trigger: AwarenessTriggerContainer,
  insights_progress: InsightsProgressContainer,
  cycle_transitions: CycleTransitionsContainer,
  stable_scan: StableScanContainer,
};

const currentComponent = computed(() => {
  const containerId = screenStore.currentScreen?.container_id;
  return containerMap[containerId] || PortalContainer;
});

const themeClass = computed(() => `theme-${screenStore.currentTheme}`);
const moodClass = computed(() => `mood-${screenStore.currentMood}`);
</script>

<template>
  <div :class="['rendering-engine-container', themeClass, moodClass]">
    <component 
      :is="currentComponent" 
      :schema="screenStore.currentScreen" 
    />
  </div>
</template>

<style>
/* Global fade transitions for screen changes */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
