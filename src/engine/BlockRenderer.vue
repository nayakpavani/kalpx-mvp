<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";
import HeadlineBlock from "../blocks/HeadlineBlock.vue";
import SubtextBlock from "../blocks/SubtextBlock.vue";
import PrimaryButtonBlock from "../blocks/PrimaryButtonBlock.vue";
import CardListBlock from "../blocks/CardListBlock.vue";
import SpacerBlock from "../blocks/SpacerBlock.vue";
import ImageBlock from "../blocks/ImageBlock.vue";
import LotusLogo from "../blocks/LotusLogo.vue";
import ChoiceCard from "../blocks/ChoiceCard.vue";
import BaselineSlider from "../blocks/BaselineSlider.vue";
import PracticeCard from "../blocks/PracticeCard.vue";
import InsightCard from "../blocks/InsightCard.vue";
import PranaSelectorBlock from "../blocks/PranaSelectorBlock.vue";
import BreathOrbBlock from "../blocks/BreathOrbBlock.vue";
import AlignmentChoiceBlock from "../blocks/AlignmentChoiceBlock.vue";
import ReflectionInputBlock from "../blocks/ReflectionInputBlock.vue";
import ChipListBlock from "../blocks/ChipListBlock.vue";
import TrendChartBlock from "../blocks/TrendChartBlock.vue";
import TextArea from "@/blocks/TextArea.vue";
import IdentityIndicator from "../blocks/IdentityIndicator.vue";
import FloatingButton from "../blocks/FloatingButton.vue";
import TimelineBlock from "../blocks/TimelineBlock.vue";
import GraphBlock from "../blocks/GraphBlock.vue";
import IdentityMap from "../blocks/IdentityMap.vue";
import SummaryBlock from "../blocks/SummaryBlock.vue";
import FormFields from "../blocks/FormFields.vue";
import VoiceRecorder from "../blocks/VoiceRecorder.vue";
import TimerDisplay from "../blocks/TimerDisplay.vue";
import TimerControls from "../blocks/TimerControls.vue";
import SankalpDisplay from "../blocks/SankalpDisplay.vue";
import BreathAnimation from "../blocks/BreathAnimation.vue";
import MantraDisplay from "../blocks/MantraDisplay.vue";
import RepCounter from "../blocks/RepCounter.vue";
import MicroLabel from "../blocks/MicroLabel.vue";
import ChallengeTextBlock from "../blocks/ChallengeTextBlock.vue";
import RepCounterFeedback from "../blocks/RepCounterFeedback.vue";
import OptionPicker from "../blocks/OptionPicker.vue";
import ChoiceGrid from "../blocks/ChoiceGrid.vue";
import InsightBoxBlock from "../blocks/InsightBoxBlock.vue";

const blockMap = {
  headline: HeadlineBlock,
  subtext: SubtextBlock,
  instruction_text: SubtextBlock,
  micro_label: MicroLabel,
  challenge_text: ChallengeTextBlock,
  rep_counter_feedback: RepCounterFeedback,
  option_picker: OptionPicker,
  choice_grid: ChoiceGrid,
  insight_box: InsightBoxBlock,
  primary_button: PrimaryButtonBlock,
  card_list: CardListBlock,
  spacer: SpacerBlock,
  image: ImageBlock,
  lotus_logo: LotusLogo,
  choice_card: ChoiceCard,
  baseline_slider: BaselineSlider,
  practice_card: PracticeCard,
  insight_card: InsightCard,
  chip_list: ChipListBlock,
  prana_selector: PranaSelectorBlock,
  triggered_orb: BreathOrbBlock,
  alignment_selector: AlignmentChoiceBlock,
  reflection_input: ReflectionInputBlock,
  trend_chart: TrendChartBlock,
  textarea: TextArea,
  text_input: TextArea,
  identity_indicator: IdentityIndicator,
  floating_button: FloatingButton,
  timeline: TimelineBlock,
  graph: GraphBlock,
  identity_map: IdentityMap,
  summary_block: SummaryBlock,
  form_fields: FormFields,
  voice_recorder: VoiceRecorder,
  timer_display: TimerDisplay,
  timer_controls: TimerControls,
  sankalp_display: SankalpDisplay,
  breath_animation: BreathAnimation,
  mantra_display: MantraDisplay,
  rep_counter: RepCounter,
};

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

const interpolatedBlock = computed(() => {
  if (!props.block) return null;
  const newBlock = { ...props.block };
  
  // Scrape all string values for {{key}} patterns and replace with screenState[key]
  Object.keys(newBlock).forEach(key => {
    if (typeof newBlock[key] === 'string') {
      newBlock[key] = newBlock[key].replace(/\{\{(.*?)\}\}/g, (match, p1) => {
        const keys = p1.trim().split(".");
        let v = screenStore.screenState;
        for (const k of keys) {
          v = v?.[k];
        }
        return v !== undefined && v !== null ? v : "";
      });
    }
  });
  
  return newBlock;
});

const component = computed(() => blockMap[interpolatedBlock.value?.type]);
</script>

<template>
  <component :is="component" v-if="component" :block="interpolatedBlock" />
  <div v-else class="unknown-block">Unknown block: {{ props.block?.type }}</div>
</template>

<style scoped>
.unknown-block {
  padding: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 12px;
}
</style>
