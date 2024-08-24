<script setup lang="ts">
import CommonCard from "@/components/CommonCard.vue";

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="tree-node">
    <CommonCard :node="node"/>
    <div v-if="node.children && node.children.length" class="children">
      <TreeNode v-for="child in node.children" :key="child.node_id" :node="child"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tree-node {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.children {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
</style>