<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const selectedId = ref(screenStore.screenState[props.block.id] || null);

function select(id) {
  selectedId.value = id;
  screenStore.setScreenValue(id, props.block.id);
}
</script>

<template>
  <div class="alignment-choices">
    <div 
      v-for="opt in block.options" 
      :key="opt.id"
      class="choice-card" 
      :class="[opt.variant, { selected: selectedId === opt.id }]"
      @click="select(opt.id)"
    >
      <div class="dot-icon" :class="opt.color">
        <i v-if="opt.icon" :class="opt.icon"></i>
      </div>
      <div class="text-wrap">
        <span class="label">{{ opt.label }}</span>
        <span class="subtext">{{ opt.subtext }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alignment-choices {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
}

.choice-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
}

.choice-card:hover {
  transform: translateY(-2px);
  border-color: #bfa58a;
}

.choice-card.selected {
  background: #fffdf9;
  border-color: #bfa58a;
  box-shadow: 0 4px 15px rgba(191,165,138,0.1);
}

.dot-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dot-icon.green { background: #648e7a; color: white; font-size: 12px; }
.dot-icon.gold { background: #eab308; }
.dot-icon.blue { background: #6386b0; }

.text-wrap {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  color: #3d3b38;
  font-size: 16px;
}

.subtext {
  font-size: 13px;
  color: #8c8881;
  font-style: italic;
}
</style>
