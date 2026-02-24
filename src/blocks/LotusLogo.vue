<script setup>
import { computed } from 'vue';

const props = defineProps({
  block: Object,
  variant: {
    type: String,
    default: 'om'
  }
});

const symbol = computed(() => props.block?.symbol || props.variant);
const size = computed(() => Number(props.block?.size) || 180); // Defaulting to 180 for header use
</script>

<template>
  <div class="logo-wrapper" :class="symbol" :style="{ width: size + 'px', height: size + 'px' }">
    <div class="mandala-zone">
      <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <linearGradient id="sacred-gold" x1="100" y1="100" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F5D070"/>
            <stop offset="50%" stop-color="#E8943A"/>
            <stop offset="100%" stop-color="#C9A227"/>
          </linearGradient>
          <radialGradient id="inner-glow" cx="140" cy="140" r="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F5D070" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#F5D070" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Outer Orbit -->
        <circle class="ring-slow" cx="140" cy="140" r="130"
          stroke="rgba(201, 162, 39, 0.1)" stroke-width="1" stroke-dasharray="2 10"/>
        
        <!-- Radial Marks -->
        <g class="ring-slow">
          <line v-for="n in 12" :key="n" x1="140" y1="5" x2="140" y2="15" 
            stroke="rgba(201, 162, 39, 0.3)" stroke-width="1" 
            :transform="`rotate(${(n-1)*30} 140 140)`"/>
        </g>

        <!-- Inner Orbit -->
        <circle class="ring-fast" cx="140" cy="140" r="90"
          stroke="rgba(201, 162, 39, 0.15)" stroke-width="0.5" stroke-dasharray="1 6"/>

        <!-- Core Ambient -->
        <circle cx="140" cy="140" r="70" fill="url(#inner-glow)"/>

        <!-- Symbol: Om -->
        <g v-if="symbol === 'om'" class="symbol-content">
          <text x="140" y="160" font-size="94" text-anchor="middle" dominant-baseline="middle"
            font-family="serif" fill="url(#sacred-gold)"
            class="symbol-main">ॐ</text>
        </g>

        <!-- Symbol: Lotus -->
        <g v-else class="symbol-content lotus-petals">
           <path d="M50 52 C50 36, 51 20, 50 8 C49 20, 50 36, 50 52Z" fill="url(#sacred-gold)" transform="translate(90, 88) scale(1.1)" />
           <path d="M50 52 C36 44, 18 40, 20 26 C22 12, 39 20, 50 52Z" fill="url(#sacred-gold)" opacity="0.9" transform="translate(90, 88) scale(1.1)"/>
           <path d="M50 52 C64 44, 82 40, 80 26 C78 12, 61 20, 50 52Z" fill="url(#sacred-gold)" opacity="0.9" transform="translate(90, 88) scale(1.1)"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.logo-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  animation: rotate-cw 60s linear infinite;
  transform-origin: center;
}

.ring-fast {
  animation: rotate-ccw 40s linear infinite;
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

.symbol-content {
  animation: symbol-pulse 6s ease-in-out infinite;
  transform-origin: center;
}

@keyframes symbol-pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; filter: drop-shadow(0 0 10px rgba(201, 162, 39, 0.4)); }
  50% { transform: scale(1.03); opacity: 1; filter: drop-shadow(0 0 20px rgba(201, 162, 39, 0.7)); }
}

.symbol-main {
  font-family: "Cormorant Garamond", serif;
}

.lotus-petals path {
  filter: drop-shadow(0 0 8px rgba(201, 162, 39, 0.3));
}
</style>
