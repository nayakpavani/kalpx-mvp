<script setup>
import { computed } from "vue";
// import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

// const screenStore = useScreenStore();

const items = computed(() => {
  return props.block.items || [];
});
</script>

<template>
  <div class="insight-box" :class="block.variant">
    <div v-for="(item, i) in items" :key="i" class="insight-item">
      <div v-if="item.icon" class="icon-wrap">
        <i :class="item.icon"></i>
      </div>
      <div class="text-content">
        <p class="main-text" v-html="item.text"></p>
        <p v-if="item.subtext" class="sub-text">{{ item.subtext }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.insight-box {
  background: white;
  border: 1px solid rgba(191, 165, 138, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.insight-box.highlight {
  background: rgba(184, 134, 11, 0.05);
  border-color: rgba(184, 134, 11, 0.2);
  border-left: 4px solid #c9a84c;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.icon-wrap {
  font-size: 18px;
  color: var(--gold-accent, #c9a84c);
  margin-top: 2px;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.main-text {
  font-size: 15px;
  color: #3d3b38;
  margin: 0;
  line-height: 1.4;
}

.sub-text {
  font-size: 13px;
  color: #8c8881;
  font-style: italic;
  margin: 0;
  white-space: pre-line;
}

:deep(strong) {
  color: #2d2b26;
  font-weight: 600;
}
</style>
