<script setup>
import { computed } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();

// Dynamically compute blocks to include sub-category specific sliders
const dynamicBlocks = computed(() => {
  // Deep clone blocks to avoid side effects on schema
  const baseBlocks = props.schema.blocks.map(b => JSON.parse(JSON.stringify(b)));
  
  // Find the chip list ID to look up the current selection
  const selectionBlock = baseBlocks.find(b => b.id === 'prana_baseline_selection');
  
  if (selectionBlock) {
    // 1. FILTER OPTIONS based on the global scan_focus (discipline)
    const focus = screenStore.screenState['scan_focus'] || 'peacecalm';
    if (props.schema.optionsMap && props.schema.optionsMap[focus]) {
      selectionBlock.options = props.schema.optionsMap[focus];
    }

    // 2. Add dynamic sliders based on current chip selection
    const defaultInternal = selectionBlock.options[0]?.id;
    const selectedId = screenStore.screenState['prana_baseline_selection'] || defaultInternal;
    
    if (props.schema.subCategorySliders) {
      const sliders = props.schema.subCategorySliders[selectedId];
      if (sliders) {
        const sliderBlocks = sliders.map(s => ({
          type: "baseline_slider",
          label: s.label,
          value: s.value
        }));
        return [...baseBlocks, ...sliderBlocks];
      }
    }
  }
  
  return baseBlocks;
});

const headerBlocks = computed(() => dynamicBlocks.value.filter(b => b.position === 'header'));
const contentBlocks = computed(() => dynamicBlocks.value.filter(b => !b.position || b.position === 'content'));
const footerBlocks = computed(() => dynamicBlocks.value.filter(b => b.position === 'footer'));
</script>

<template>
  <div class="stable-scan-container">
    <div class="scroll-wrapper">
      <div class="header">
        <BlockRenderer
          v-for="(block, i) in headerBlocks"
          :key="'header-'+i"
          :block="block"
        />
      </div>

      <div class="input-sections">
        <div 
          v-for="(block, i) in contentBlocks"
          :key="'block-'+i"
          class="block-wrapper"
        >
          <div v-if="block.section_title" class="section-divider">
            <span class="divider-text">{{ block.section_title }}</span>
            <div class="line"></div>
          </div>
          <BlockRenderer :block="block" />
        </div>
      </div>

      <div class="footer">
        <BlockRenderer
          v-for="(block, i) in footerBlocks"
          :key="'footer-'+i"
          :block="block"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stable-scan-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
  min-height: 100vh;
}

.scroll-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 60px 24px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 40px;
  text-align: center;
}

.input-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-divider {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider-text {
  font-family: var(--font-serif);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold-accent);
  font-weight: 600;
}

.line {
  height: 1px;
  background: linear-gradient(90deg, var(--gold-accent) 0%, transparent 100%);
  opacity: 0.3;
}

.footer {
  margin-top: 60px;
  padding-bottom: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
