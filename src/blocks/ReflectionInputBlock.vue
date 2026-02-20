<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const text = ref(screenStore.screenState[props.block.id] || "");

function onInput() {
  screenStore.setScreenValue(text.value, props.block.id);
}
</script>

<template>
  <div class="input-section">
    <p v-if="block.label" class="section-label">{{ block.label }}</p>
    <div class="moment-input-wrap">
      <input 
        type="text" 
        :placeholder="block.placeholder || 'Type here...'" 
        v-model="text"
        @input="onInput"
      />
      <button class="mic-btn"><i class="fas fa-microphone"></i></button>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  width: 100%;
  margin: 20px 0;
}

.section-label {
  text-align: center;
  font-size: 14px;
  color: #8c8881;
  margin-bottom: 12px;
}

.moment-input-wrap {
  background: white;
  border: 1px solid #ddd;
  border-radius: 40px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.moment-input-wrap input {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
  font-style: italic;
  color: #3d3b38;
}

.mic-btn {
  background: none;
  border: none;
  color: #a8a49d;
  cursor: pointer;
  font-size: 18px;
}
</style>
