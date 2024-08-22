<template>
  <div class="common-card">
    <div class="node-content">
      {{ node.node_name }} ({{ node.node_type }})
    </div>
    <div v-if="node.children.length" class="children">
      <CommonCard v-for="child in node.children" :key="child.node_id" :node="child" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.common-card {
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.node-content {
  font-weight: bold;
}

.children {
  margin-top: 10px;
}
</style>