<template>
  <div class="composer-card">
    <textarea
      v-model="text"
      @input="handleInput"
      class="sankalp-input"
      :placeholder="schema.placeholder || 'Write your intention...'"
    ></textarea>
    <div class="char-count">{{ text.length }} / 120</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const text = ref(props.schema.value || "");

function handleInput() {
  screenStore.setScreenValue(text.value, props.schema.id);
}
</script>
<style scoped>
.composer-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 40px;
  text-align: center;
}

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
}

.char-count {
  position: absolute;
  bottom: 16px;
  right: 20px;
  font-size: 12px;
  color: #999;
}

.footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
