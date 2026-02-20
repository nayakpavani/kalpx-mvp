<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
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
  const n = Math.floor((W * H) / 13000);
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      alpha: Math.random() * 0.45 + 0.05,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
      tw: Math.random() * 0.018 + 0.005,
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
  <div class="portal-page">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
    <div class="ambient-glow"></div>

    <div class="content-wrapper">
      <BlockRenderer
        v-for="(block, i) in props.schema.blocks"
        :key="'block-' + i"
        :block="block"
        :class="{
          'logo-section': block.type === 'lotus_logo',
          'text-block': block.type === 'headline' || block.type === 'subtext',
          'cta-section': block.type === 'primary_button',
          'seeking-section': block.type === 'chip_list'
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.portal-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #111417;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-sans);
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse 55% 50% at 50% 44%,
      rgba(201, 168, 76, 0.08) 0%,
      transparent 70%
    ),
    radial-gradient(ellipse 100% 100% at 50% 50%, #0e1012 55%, #080a0c 100%);
}

.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 40px 24px;
  text-align: center;
}

.identity-label {
  font-size: 9.5px;
  font-weight: 300;
  letter-spacing: 7px;
  color: rgba(201, 168, 76, 0.45);
  text-transform: uppercase;
  margin-bottom: 50px;
  animation: rise 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s forwards;
  opacity: 0;
}

.logo-section {
  margin-bottom: 50px;
  animation: rise 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) 0.5s forwards;
  opacity: 0;
}

.divider-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(201, 168, 76, 0.3),
    transparent
  );
  margin: 0 auto 36px;
  animation: rise 1s ease 0.9s forwards;
  opacity: 0;
}

/* .text-block {
  margin-bottom: 40px;
} */

:deep(.headline) {
  font-family: var(--font-serif);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 300;
  letter-spacing: 3px;
  color: #fff;
  margin-bottom: 14px;
  animation: rise 1s cubic-bezier(0.22, 0.61, 0.36, 1) 1s forwards;
  opacity: 0;
}

:deep(.subtext) {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  animation: rise 1s ease 1.2s forwards;
  opacity: 0;
}

.seeking-section {
  margin-bottom: 50px;
}

.seeking-label {
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 5px;
  color: rgba(201, 168, 76, 0.35);
  text-transform: uppercase;
  margin-bottom: 16px;
  animation: rise 1s ease 1.4s forwards;
  opacity: 0;
}

.mood-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  animation: rise 1s ease 1.6s forwards;
  opacity: 0;
}

.fallback-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.chip {
  padding: 9px 22px;
  border-radius: 100px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  font-size: 10.5px;
  font-weight: 300;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.38);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
  background: transparent;
}

.chip:hover {
  border-color: rgba(201, 168, 76, 0.6);
  color: #f0c96b;
  background: rgba(201, 168, 76, 0.07);
  box-shadow: 0 0 18px rgba(201, 168, 76, 0.12);
}

.cta-section {
  animation: rise 1s ease 1.9s forwards;
  opacity: 0;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
