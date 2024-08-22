<script setup lang="ts">
defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="common-card">
    <h3>{{ node.node_name }}</h3>
    <p>ID: {{ node.node_id }}</p>
    <p>Type: {{ node.node_type }}</p>
  </div>
</template>

<style scoped>
.common-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

h3 {
  margin-top: 0;
  color: #333;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>