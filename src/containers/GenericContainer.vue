<script setup>
import { computed } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});

/**
 * Split blocks into header, content, and footer sections based on their position prop.
 * This ensures the screen layout is structured correctly even if blocks are sent in any order.
 */
const sections = computed(() => {
  const blocks = props.schema?.blocks || [];
  return {
    header: blocks.filter((b) => b.position === "header"),
    content: blocks.filter((b) => !b.position || b.position === "content"),
    footer: blocks.filter((b) => b.position === "footer"),
  };
});
</script>

<template>
  <div class="generic-container">
    <!-- Ambient background effects -->
    <div class="ambient-glow top"></div>
    <div class="ambient-glow bottom"></div>

    <div class="scroll-wrapper">
      <div class="content-frame">
        <!-- HEADER SECTION -->
        <header v-if="sections.header.length" class="section header">
          <BlockRenderer
            v-for="(block, i) in sections.header"
            :key="'h-' + i"
            :block="block"
          />
        </header>

        <!-- MAIN CONTENT SECTION -->
        <main class="section content">
          <BlockRenderer
            v-for="(block, i) in sections.content"
            :key="'c-' + i"
            :block="block"
          />
        </main>

        <!-- FOOTER SECTION -->
        <footer v-if="sections.footer.length" class="section footer">
          <BlockRenderer
            v-for="(block, i) in sections.footer"
            :key="'f-' + i"
            :block="block"
          />
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generic-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--background-page, #fcfaf7);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

.ambient-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
}

.ambient-glow.top {
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, var(--gold-accent), transparent 70%);
}

.ambient-glow.bottom {
  bottom: -200px;
  left: -100px;
  background: radial-gradient(circle, #bfa58a, transparent 70%);
}

.scroll-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  padding: 40px 24px;
  display: flex;
  justify-content: center;
}

.content-frame {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  margin-bottom: 40px;
}

.content {
  flex: 1;
  margin-bottom: 60px;
}

.footer {
  margin-top: auto;
  padding-bottom: 20px;
  gap: 12px;
}

/* Animations for entering blocks */
.section > * {
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
