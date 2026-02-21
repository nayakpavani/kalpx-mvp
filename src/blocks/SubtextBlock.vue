<script setup>
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

function handleClick() {
  if (props.block.action) {
    screenStore.handleAction(props.block.action);
  }
}
</script>
<template>
  <p
    v-if="block.id ? (screenStore.screenState[block.id] || block.content) : block.content"
    :class="[
      'subtext',
      block.variant === 'link' ? 'link-text' : '',
      block.variant === 'small' ? 'small-text' : '',
      block.variant === 'label' ? 'label-text' : '',
      block.variant === 'italic' ? 'italic-text' : '',
      block.variant === 'italic_multiline' ? 'italic-text multiline' : '',
    ]"
    @click="handleClick"
  >
    {{ block.id ? (screenStore.screenState[block.id] || block.content) : block.content }}
  </p>
</template>

<style scoped>
.subtext {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 24px;
  text-align: center;
}

.link-text {
  color: #bfa58a;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  text-underline-offset: 4px;
}

.small-text {
  font-size: 12px;
  color: #a8a49d;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label-text {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #bfa58a;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.italic-text {
  font-style: italic;
  color: #6b6357;
}

.multiline {
  white-space: pre-line;
}
</style>
