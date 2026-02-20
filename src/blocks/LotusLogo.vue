<script setup>
import { computed } from 'vue';

const props = defineProps({
  block: Object,
  variant: {
    type: String,
    default: 'om' // 'om', 'lotus', 'yantra', etc.
  }
});

const symbol = computed(() => props.block?.symbol || props.variant);
</script>

<template>
  <div class="logo-wrapper" :class="symbol">
    <div class="mandala-zone">
      <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <linearGradient id="omg" x1="100" y1="100" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F5D070"/>
            <stop offset="50%" stop-color="#E8943A"/>
            <stop offset="100%" stop-color="#C9A84C"/>
          </linearGradient>
          <linearGradient id="omfill" x1="100" y1="100" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F5D070" stop-opacity="0.9"/>
            <stop offset="60%" stop-color="#E8943A" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#9A6820" stop-opacity="0.8"/>
          </linearGradient>
        </defs>

        <!-- Outer orbit -->
        <circle class="ring-slow" cx="140" cy="140" r="130"
          stroke="rgba(201,168,76,0.12)" stroke-width="1" stroke-dasharray="3 12"/>
        
        <!-- 8 radial marks -->
        <g class="ring-slow">
          <line v-for="n in 8" :key="n" x1="140" y1="10" x2="140" y2="26" 
            stroke="rgba(201,168,76,0.4)" stroke-width="1.2" 
            :transform="`rotate(${(n-1)*45} 140 140)`"/>
        </g>

        <!-- Inner circle orbit -->
        <circle class="ring-fast" cx="140" cy="140" r="96"
          stroke="rgba(201,168,76,0.18)" stroke-width="0.8" stroke-dasharray="1 7"/>
        
        <!-- 6 dots -->
        <g class="ring-fast">
          <circle v-for="n in 6" :key="n" cx="140" cy="44" r="3" 
            fill="rgba(232,148,58,0.6)" 
            :transform="`rotate(${(n-1)*60} 140 140)`"/>
        </g>

        <!-- Base stabilization circle -->
        <circle cx="140" cy="140" r="68" stroke="rgba(201,168,76,0.2)" stroke-width="0.8" fill="rgba(201,168,76,0.02)"/>

        <!-- Symbol Rendering (Om) -->
        <g v-if="symbol === 'om'" class="symbol-content">
          <text x="140" y="165" font-size="88" text-anchor="middle" dominant-baseline="middle"
            font-family="serif" fill="none"
            stroke="url(#omg)" stroke-width="1.2"
            class="symbol-glow">ॐ</text>
          <text x="140" y="165" font-size="88" text-anchor="middle" dominant-baseline="middle"
            font-family="serif" fill="url(#omfill)"
            class="symbol-main">ॐ</text>
        </g>

        <!-- Symbol Rendering (Lotus fallback or explicit) -->
        <g v-else class="symbol-content lotus-petals">
           <path d="M50 52 C50 36, 51 20, 50 8 C49 20, 50 36, 50 52Z" fill="url(#omfill)" transform="translate(90, 88) scale(1.2)" />
           <path d="M50 52 C36 44, 18 40, 20 26 C22 12, 39 20, 50 52Z" fill="url(#omfill)" opacity="0.95" transform="translate(90, 88) scale(1.2)"/>
           <path d="M50 52 C64 44, 82 40, 80 26 C78 12, 61 20, 50 52Z" fill="url(#omfill)" opacity="0.95" transform="translate(90, 88) scale(1.2)"/>
           <path d="M50 52 C40 67, 28 78, 16 70 C4 62, 18 48, 50 52Z" fill="url(#omfill)" opacity="0.88" transform="translate(90, 88) scale(1.2)"/>
           <path d="M50 52 C60 67, 72 78, 84 70 C96 62, 82 48, 50 52Z" fill="url(#omfill)" opacity="0.88" transform="translate(90, 88) scale(1.2)"/>
        </g>
      </svg>
      <div class="center-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.logo-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mandala-zone {
  position: relative;
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.ring-slow {
  animation: rotate-cw 30s linear infinite;
  transform-origin: center;
}

.ring-fast {
  animation: rotate-ccw 20s linear infinite;
  transform-origin: center;
}

@keyframes rotate-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotate-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.16) 0%, transparent 70%);
  animation: breathe 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
}

.symbol-content {
  animation: symbol-float 5s ease-in-out infinite;
  transform-origin: center;
}

@keyframes symbol-float {
  0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 10px rgba(201,168,76,0.5)); }
  50% { transform: translateY(-5px); filter: drop-shadow(0 0 25px rgba(240,201,107,0.8)); }
}

.symbol-glow {
  opacity: 0.5;
}

.lotus-petals path {
  filter: drop-shadow(0 0 8px rgba(201,168,76,0.4));
}
</style>
