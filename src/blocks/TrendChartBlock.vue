<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="trend-chart-container">
    <div class="chart-header">
      <span class="chart-title">{{ block.title || 'Trend' }}</span>
    </div>
    <div class="chart-area">
      <!-- Mock SVG Chart -->
      <svg viewBox="0 0 400 120" class="trend-svg">
        <!-- Lines -->
        <path 
          d="M 20 80 Q 80 85, 140 70 T 260 50 T 380 45" 
          fill="none" 
          stroke="#648e7a" 
          stroke-width="2" 
          class="line-calm"
        />
        <path 
          d="M 20 100 Q 80 90, 140 95 T 260 70 T 380 60" 
          fill="none" 
          stroke="#eab308" 
          stroke-width="2" 
          class="line-clarity"
        />
        
        <!-- Dots for Calm -->
        <circle cx="20" cy="80" r="3" fill="#648e7a" />
        <circle cx="140" cy="70" r="3" fill="#648e7a" />
        <circle cx="260" cy="50" r="3" fill="#648e7a" />
        <circle cx="380" cy="45" r="3" fill="#648e7a" />
        
        <!-- Dots for Clarity -->
        <circle cx="20" cy="100" r="3" fill="#eab308" />
        <circle cx="140" cy="95" r="3" fill="#eab308" />
        <circle cx="260" cy="70" r="3" fill="#eab308" />
        <circle cx="380" cy="60" r="3" fill="#eab308" />
      </svg>
      
      <div class="chart-legend">
        <div class="legend-item"><span class="dot calm"></span> Calm</div>
        <div class="legend-item"><span class="dot clarity"></span> Clarity</div>
      </div>
    </div>
    <div class="chart-footer">
      {{ block.footer || 'Your mind steadiness increased steadily.' }}
    </div>
  </div>
</template>

<style scoped>
.trend-chart-container {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 16px 0;
  border: 1px solid #f0ece2;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.chart-header {
  text-align: center;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 14px;
  color: #8c8881;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chart-area {
  position: relative;
  margin-bottom: 16px;
}

.trend-svg {
  width: 100%;
  height: auto;
}

.line-calm { animation: dash 2s ease-in-out; }
.line-clarity { animation: dash 2.5s ease-in-out; }

@keyframes dash {
  from { stroke-dasharray: 500; stroke-dashoffset: 500; }
  to { stroke-dasharray: 500; stroke-dashoffset: 0; }
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #8c8881;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.calm { background: #648e7a; }
.dot.clarity { background: #eab308; }

.chart-footer {
  text-align: center;
  font-size: 13px;
  color: #8c8881;
  font-style: italic;
  border-top: 1px solid #f9f7f2;
  padding-top: 12px;
}
</style>
