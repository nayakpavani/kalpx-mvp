<template>
  <div class="composer-card">
    <textarea
      v-model="text"
      class="sankalp-input"
      :placeholder="block.placeholder || 'Write your intention...'"
      :maxlength="block.character_limit"
      @input="onInput"
    ></textarea>
    <div class="char-count">
      {{ text.length }} / {{ block.character_limit || 120 }}
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
const text = ref(screenStore.screenState[props.block.id] || "");

function onInput() {
  screenStore.setScreenValue(text.value, props.block.id);
}

onMounted(() => {
  if (props.block.preload_existing) {
    text.value = screenStore.screenState[props.block.id] || "";
  }
});
</script>

<style scoped>
.composer-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  position: relative;
}

.sankalp-input {
  width: 100%;
  border: none;
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 1.6;
  color: #1a1a1a;
  min-height: 150px;
  resize: none;
  outline: none;
  background: transparent;
}

.char-count {
  position: absolute;
  bottom: 16px;
  right: 20px;
  font-size: 12px;
  color: #999;
}
</style>
