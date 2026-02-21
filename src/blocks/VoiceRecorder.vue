<script setup>
import { ref, onUnmounted } from "vue";

// const props = defineProps({
//   block: Object,
// });

const isRecording = ref(false);
const duration = ref(0);
let timer = null;

function toggleRecording() {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}

function startRecording() {
  isRecording.value = true;
  duration.value = 0;
  timer = setInterval(() => {
    duration.value++;
  }, 1000);
}

function stopRecording() {
  isRecording.value = false;
  clearInterval(timer);
}

const formatTime = (s) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="voice-recorder-block">
    <div class="recorder-visualizer">
      <div v-if="isRecording" class="bars">
        <div
          v-for="i in 12"
          :key="i"
          class="bar"
          :style="{ animationDelay: `${i * 0.1}s` }"
        ></div>
      </div>
      <div v-else class="idle-state">
        <i class="fas fa-microphone-alt"></i>
      </div>
    </div>

    <div class="timer">{{ formatTime(duration) }}</div>

    <button
      class="record-btn"
      :class="{ recording: isRecording }"
      @click="toggleRecording"
    >
      <div class="btn-inner">
        <div v-if="isRecording" class="stop-icon"></div>
        <div v-else class="record-icon"></div>
      </div>
      <div class="pulse-ring" v-if="isRecording"></div>
    </button>

    <p class="hint">
      {{ isRecording ? "Tap to stop recording" : "Tap to start speaking" }}
    </p>
  </div>
</template>

<style scoped>
.voice-recorder-block {
  display: flex;
  flex-direction: column;
  items-center: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 0;
  width: 100%;
  text-align: center;
}

.recorder-visualizer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.idle-state {
  font-size: 32px;
  color: var(--border-color);
  opacity: 0.5;
}

.bars {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 40px;
}

.bar {
  width: 3px;
  height: 20%;
  background: var(--gold-accent);
  border-radius: 10px;
  animation: wave 1s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    height: 20%;
  }
  50% {
    height: 100%;
  }
}

.timer {
  font-family: var(--font-outfit);
  font-size: 24px;
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 2px;
}

.record-btn {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: var(--surface-1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.btn-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.record-icon {
  width: 20px;
  height: 20px;
  background: #ff4d4d;
  border-radius: 50%;
}

.stop-icon {
  width: 18px;
  height: 18px;
  background: var(--text-primary);
  border-radius: 3px;
}

.pulse-ring {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid #ff4d4d;
  opacity: 0;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.hint {
  font-size: 13px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
