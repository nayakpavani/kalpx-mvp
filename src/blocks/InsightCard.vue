<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="insight-card-content">
    <div v-if="block.icon" class="icon-wrap">
      <i :class="block.icon"></i>
    </div>
    <div class="text-wrap">
      <!-- Title handling -->
      <h3 v-if="block.title" class="title">{{ block.title }}</h3>

      <!-- Bulleted list handling -->
      <ul v-if="block.list" class="insight-list">
        <li v-for="(item, i) in block.list" :key="i">
          <i v-if="item.icon" :class="item.icon" class="list-icon"></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>

      <!-- Descriptions and meta text handling -->
      <p v-if="block.description" class="description">
        {{ block.description }}
      </p>
      <p v-if="block.meta" class="meta">{{ block.meta }}</p>
    </div>
  </div>
</template>

<style scoped>
.insight-card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.icon-wrap {
  font-size: 24px;
  color: var(--gold-accent);
  margin-bottom: 8px;
}

.title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: #3d3b38;
  margin: 0 0 8px;
  font-weight: 500;
}

.description {
  font-size: 15px;
  color: #3d3b38;
  margin: 0;
  line-height: 1.5;
}

.meta {
  font-size: 13px;
  color: #8c8881;
  font-style: italic;
  margin: 8px 0 0;
}

/* Bullet list stylings specific to insight cards */
.insight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.insight-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #3d3b38;
}

.list-icon {
  color: var(--gold-accent);
  width: 20px;
  text-align: center;
}
</style>
