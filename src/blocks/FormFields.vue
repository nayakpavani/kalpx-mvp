<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const fields = computed(() => screenStore.screenState[props.block.fields_key] || []);

function updateValue(id, value) {
  screenStore.setScreenValue(value, id);
}
</script>

<template>
  <div class="form-fields">
    <div v-for="field in fields" :key="field.id" class="field-item">
      <label :for="field.id" class="field-label">{{ field.label }}</label>
      
      <div class="input-container">
        <textarea
          v-if="field.type === 'textarea'"
          :id="field.id"
          :placeholder="field.placeholder"
          class="field-input textarea"
          :value="screenStore.screenState[field.id] || ''"
          @input="e => updateValue(field.id, e.target.value)"
        ></textarea>
        
        <input
          v-else
          :id="field.id"
          :type="field.type || 'text'"
          :placeholder="field.placeholder"
          class="field-input"
          :value="screenStore.screenState[field.id] || ''"
          @input="e => updateValue(field.id, e.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 20px 0;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  font-weight: 600;
}

.input-container {
  width: 100%;
}

.field-input {
  width: 100%;
  background: var(--surface-1);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 16px;
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
  transition: all 0.3s ease;
}

.field-input:focus {
  border-color: var(--gold-accent);
  background: var(--surface-2);
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.field-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
  font-style: italic;
}
</style>
