<script setup lang="ts">
defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="children-line" v-if="node.parent_id !== null "></div>
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
  width: 200px;

}


/* 直线 */
.children-line {
  position: relative;
  width: var(--one-children-line-width);
  height: 110px;
  margin-top: -10px;
  background-color: #D8D8D8;
}

/* 绘制三角箭头 */
.children-line:after {
  content: "";
  position: absolute;
  border-top: var(--one-children-line-width) solid #D8D8D8;
  border-bottom: var(--one-children-line-width) solid transparent;
  border-left: var(--one-children-line-width) solid transparent;
  border-right: var(--one-children-line-width) solid transparent;
  top: 100%;
  margin-left: calc(-1 * var(--one-children-line-width));
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

<style>
/* 设置 */
:root {
  --one-children-line-width: 10px;
}
</style>