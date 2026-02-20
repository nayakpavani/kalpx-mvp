<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="choice-stack-container">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="'header-'+i"
        :block="block"
      />
    </div>

    <div class="content">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => !b.position || b.position === 'content')"
        :key="'content-'+i"
        :block="block"
      />
    </div>

    <div class="footer">
       <div class="actions">
         <BlockRenderer
            v-for="(block, i) in schema.blocks.filter(b => b.position === 'footer')"
            :key="'footer-'+i"
            :block="block"
          />
       </div>
    </div>
  </div>
</template>

<style scoped>
.choice-stack-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 24px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 40px;
  text-align: center;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
