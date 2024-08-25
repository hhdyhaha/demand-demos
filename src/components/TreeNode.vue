<script setup lang="ts">
import CommonCard from "@/components/CommonCard.vue";
import { useNodesStore } from "@/stores/index.ts";
import { storeToRefs } from 'pinia'
const store = useNodesStore()
const { multiNodes } = storeToRefs(store)

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

if(props.node.children && props.node.children.length > 1){
  multiNodes.value.push({'node_id':props.node.node_id})
}
</script>

<template>
  <div class="tree-node">
    <CommonCard :node="node"/>
    <div v-if="node.children && node.children.length > 1" class="parent-line"></div>
    <div v-if="node.children && node.children.length" class="children-box">
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

.children-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.parent-line {
  position: relative;
  width: 10px;
  height: 50px;
  margin-top: -10px;
  background-color: #D8D8D8;
}
</style>