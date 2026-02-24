<template>
  <div class="composer-card-wrap">
    <textarea
      v-model="text"
      class="sacred-textarea"
      :placeholder="block.placeholder || 'Write your intention...'"
      :maxlength="block.character_limit || 140"
      @input="onInput"
    ></textarea>
    <div class="char-count">
      {{ text.length }} / {{ block.character_limit || 140 }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const text = ref("");

// Re-initialize text from screenStore when component mounts
onMounted(() => {
  const existingValue = screenStore.screenState[props.block.id || props.block.draft_key];
  if (existingValue) {
    text.value = existingValue;
  }
});

function onInput() {
  screenStore.setScreenValue(text.value, props.block.id || props.block.draft_key);
}
</script>

<style scoped>
.composer-card-wrap {
  background: #1F2937; /* Spec: #1F2937 */
  border: 1px solid #374151; /* Spec: #374151 */
  border-radius: 18px; /* Spec: 18px */
  padding: 24px;
  position: relative;
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.composer-card-wrap:focus-within {
  border-color: #4B5563; /* Spec: #4B5563 focus_border */
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.03);
}

.sacred-textarea {
  width: 100%;
  border: none;
  font-family: "Cormorant Garamond", serif; /* Spec: Serif */
  font-size: 20px; /* Spec: 20px */
  line-height: 1.5;
  color: #FFFFFF;
  min-height: 120px; /* Spec: 120px */
  resize: none;
  outline: none;
  background: transparent;
}

.char-count {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 11px;
  font-family: var(--font-sans);
  color: rgba(255, 255, 255, 0.4); /* Spec: Opacity 40% */
  letter-spacing: 1px;
}

.sacred-textarea::placeholder {
  color: rgba(255, 255, 255, 0.2);
  font-style: italic;
}
</style>
