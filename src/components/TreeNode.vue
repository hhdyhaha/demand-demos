<script setup lang="ts">
import CommonCard from "@/components/CommonCard.vue";
import { defineProps } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="tree-node">
    <CommonCard :node="node" />
    <div v-if="node.children && node.children.length" class="children">
      <TreeNode v-for="child in node.children" :key="child.node_id" :node="child" />
    </div>
  </div>
</template>

<style scoped>
.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.children {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 20px;
  padding-left: 40px;
}
</style>