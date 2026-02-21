<script setup>
import { computed } from "vue";
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

const blockMap = {
  headline: HeadlineBlock,
  subtext: SubtextBlock,
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
};

const props = defineProps({
  block: Object,
});

const component = computed(() => blockMap[props.block?.type]);
</script>

<template>
  <component :is="component" v-if="component" :block="props.block" />
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
