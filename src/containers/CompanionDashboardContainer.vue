<script setup>
import { computed } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});

// Group blocks for the home-base layout
const headerBlocks = computed(() => props.schema.blocks.filter(b => b.position === 'header'));
const practiceBlocks = computed(() => props.schema.blocks.filter(b => b.type === 'practice_card' && b.category !== 'awareness'));
const awarenessBlocks = computed(() => props.schema.blocks.filter(b => b.category === 'awareness'));
const footerBlocks = computed(() => props.schema.blocks.filter(b => b.position === 'footer'));
const floatingBlocks = computed(() => props.schema.blocks.filter(b => b.type === 'floating_button' || b.position === 'floating'));
</script>

<template>
  <div class="dashboard-wrap" :class="[`tone-${schema.tone || 'grounded'}`]">
    <div class="ambient-glow"></div>
    
    <!-- Top Companion Anchor -->
    <div class="header-anchor">
      <BlockRenderer
        v-for="(block, i) in headerBlocks"
        :key="'header-'+i"
        :block="block"
      />
    </div>

    <div class="dashboard-scroll-area">
      <!-- Main Practice Section -->
      <section v-if="practiceBlocks.length" class="practice-section">
        <h4 class="section-label">Main Practice</h4>
        <div class="cards-stack">
          <BlockRenderer
            v-for="(block, i) in practiceBlocks"
            :key="'practice-'+i"
            :block="block"
          />
        </div>
      </section>

      <!-- Awareness / Support Section -->
      <section v-if="awarenessBlocks.length" class="awareness-section">
        <h4 class="section-label">Daily Awareness</h4>
        <div class="cards-stack">
          <BlockRenderer
            v-for="(block, i) in awarenessBlocks"
            :key="'awareness-'+i"
            :block="block"
          />
        </div>
      </section>
    </div>

    <!-- Bottom Actions / Nav -->
    <div class="dashboard-footer">
       <BlockRenderer
        v-for="(block, i) in footerBlocks"
        :key="'footer-'+i"
        :block="block"
      />
    </div>

    <!-- Floating UI -->
    <div class="floating-layer">
      <BlockRenderer
        v-for="(block, i) in floatingBlocks"
        :key="'floating-'+i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrap {
  position: relative;
  min-height: 100vh;
  width: 100%;
  /* Spec: #111827 to #0B1220 */
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  padding: 0;
  color: #F3F4F6;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 10%,
    rgba(201, 162, 39, 0.04) 0%,
    transparent 60%
  );
}

.header-anchor {
  position: relative;
  z-index: 10;
  padding: 60px 24px 20px;
  text-align: center;
  background: linear-gradient(to bottom, #111827, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.dashboard-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px 120px; /* Extra padding for footer */
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
  scrollbar-width: none;
}

.dashboard-scroll-area::-webkit-scrollbar { display: none; }

.section-label {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(243, 244, 246, 0.4);
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
}

.cards-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-footer {
  position: relative;
  z-index: 10;
  padding: 24px;
  background: linear-gradient(to top, #0B1220 70%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.floating-layer {
  position: fixed;
  bottom: 32px;
  right: 24px;
  z-index: 100;
}

/* Base Typography Consistency */
:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  font-weight: 500;
  margin-top: 12px;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 14px;
  color: rgba(243, 244, 246, 0.5);
  margin-top: 4px;
}
</style>
