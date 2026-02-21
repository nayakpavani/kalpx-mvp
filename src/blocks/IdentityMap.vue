<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const rawData = screenStore.screenState[props.block?.data_key || "identity_map_data"] || {};

const categories = Object.keys(rawData);
const values = Object.values(rawData);
const numPoints = categories.length;
const size = 300;
const center = size / 2;
const radius = (size / 2) * 0.8;

const points = computed(() => {
  return values.map((val, i) => {
    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
    const r = (val / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });
});

const polygonPoints = computed(() => {
  return points.value.map((p) => `${p.x},${p.y}`).join(" ");
});

const axisLines = computed(() => {
  return categories.map((_, i) => {
    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
    return {
      x1: center,
      y1: center,
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle),
    };
  });
});

const labels = computed(() => {
  return categories.map((name, i) => {
    const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
    const labelRadius = radius + 25;
    return {
      name,
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  });
});

const gridCircles = [10, 8, 6, 4, 2];
</script>

<template>
  <div class="identity-map">
    <svg :viewBox="`0 0 ${size} ${size}`" class="radar-svg">
      <!-- Grid Circles -->
      <circle
        v-for="r in gridCircles"
        :key="r"
        :cx="center"
        :cy="center"
        :r="(r / 10) * radius"
        class="grid-circle"
      />

      <!-- Axis Lines -->
      <line
        v-for="(line, i) in axisLines"
        :key="'axis-' + i"
        v-bind="line"
        class="axis-line"
      />

      <!-- Data Polygon -->
      <polygon :points="polygonPoints" class="data-polygon" />

      <!-- Data Points -->
      <circle
        v-for="(p, i) in points"
        :key="'point-' + i"
        :cx="p.x"
        :cy="p.y"
        r="4"
        class="data-dot"
      />

      <!-- Labels -->
      <text
        v-for="(label, i) in labels"
        :key="'label-' + i"
        :x="label.x"
        :y="label.y"
        text-anchor="middle"
        dominant-baseline="middle"
        class="label-text"
      >
        {{ label.name }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.identity-map {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.radar-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.grid-circle {
  fill: none;
  stroke: var(--border-color);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.axis-line {
  stroke: var(--border-color);
  stroke-width: 1;
}

.data-polygon {
  fill: var(--gold-accent);
  fill-opacity: 0.15;
  stroke: var(--gold-accent);
  stroke-width: 2;
  transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1);
  animation: fadeInPath 2s ease-out;
}

.data-dot {
  fill: var(--gold-accent);
  stroke: #fff;
  stroke-width: 2;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  animation: pulsePoint 3s infinite;
}

@keyframes fadeInPath {
  from { opacity: 0; transform: scale(0.8); transform-origin: center; }
  to { opacity: 1; transform: scale(1); transform-origin: center; }
}

@keyframes pulsePoint {
  0% { r: 4; fill-opacity: 1; }
  50% { r: 6; fill-opacity: 0.7; }
  100% { r: 4; fill-opacity: 1; }
}

.label-text {
  font-family: var(--font-outfit);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  fill: var(--text-secondary);
  font-weight: 500;
}
</style>
