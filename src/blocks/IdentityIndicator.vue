<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="identity-indicator">
    <div class="status-ring" :class="block.state">
      <div class="inner-circle"></div>
      <div class="pulse-ring"></div>
    </div>
    <span class="status-label">{{ block.state?.toUpperCase() || 'STEADY' }}</span>
  </div>
</template>

<style scoped>
.identity-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
}

.status-ring {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
}

.inner-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid;
  opacity: 0.3;
}

/* States */
.steady .inner-circle { background: #E8C060; box-shadow: 0 0 15px #E8C060; }
.steady .pulse-ring { border-color: #E8C060; animation: pulse 2s infinite; }

.reactive .inner-circle { background: #ff4d4d; box-shadow: 0 0 15px #ff4d4d; }
.reactive .pulse-ring { border-color: #ff4d4d; animation: pulse 1.5s infinite; }

.drifting .inner-circle { background: #4dabff; box-shadow: 0 0 15px #4dabff; }
.drifting .pulse-ring { border-color: #4dabff; animation: pulse 3s infinite; }

.status-label {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--text-secondary);
  font-weight: 500;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 0; }
}
</style>
