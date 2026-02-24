<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});

const canvasRef = ref(null);
let animationFrameId = null;

const initParticles = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resize);
  resize();

  let pts = [];
  const n = Math.floor((W * H) / 18000); // Fewer particles for a calmer feel
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.8 + 0.2, // Smaller, subtle
      alpha: Math.random() * 0.3 + 0.05,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.08,
      tw: Math.random() * 0.01 + 0.005,
      tp: Math.random() * Math.PI * 2,
    });
  }

  let t = 0;
  const loop = () => {
    t++;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      const a = p.alpha * (0.5 + 0.5 * Math.sin(t * p.tw + p.tp));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${a})`;
      ctx.fill();
    }
    animationFrameId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(animationFrameId);
  };
};

let cleanupParticles = null;

onMounted(() => {
  cleanupParticles = initParticles();
});

onUnmounted(() => {
  if (cleanupParticles) cleanupParticles();
});
</script>

<template>
  <div class="portal-container" :class="[schema.variant, `tone-${schema.tone || 'calm'}`]">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
    <div class="ambient-glow"></div>

    <div class="center-content-stack">
      <BlockRenderer
        v-for="(block, i) in schema.blocks"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.portal-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  /* Spec: #111827 to #0B1220 gradient */
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #F3F4F6;
  text-align: center;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  /* Spec: subtle radial glow in center (opacity 8–10%) */
  background: radial-gradient(
    circle at center,
    rgba(201, 168, 76, 0.08) 0%,
    transparent 70%
  );
  animation: breathing-glow 8s ease-in-out infinite;
}

@keyframes breathing-glow {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.center-content-stack {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 520px;
  padding: 0 24px;
  animation: fade-in 1.2s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Typography Overrides based on Container 1 Specs */
:deep(.micro-label) {
  font-family: var(--font-sans); /* Inter / SF Pro */
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.6);
  margin-bottom: 8px;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(34px, 8vw, 40px);
  font-weight: 500;
  line-height: 1.1;
  color: #F3F4F6;
  margin: 0;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(243, 244, 246, 0.7);
  max-width: 320px;
}

/* Button Overrides */
:deep(.primary-button) {
  margin-top: 16px;
  background: #1F2937 !important; /* Spec: Dark base */
  color: #FFFFFF !important;
  border-radius: 14px !important;
  padding: 16px 32px !important;
  font-size: 17px !important;
  font-weight: 500 !important;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2) !important;
}

:deep(.primary-button:active) {
  transform: scale(0.97) !important;
}
</style>
