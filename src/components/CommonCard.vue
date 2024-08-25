<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
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
const commonCardRef = ref();

const calculatePosition = () => {
  multiNodes.value.forEach(nodeItem => {
    if(nodeItem.node_id === props.node.node_id){
      // 获取父节点的位置坐标
      const { top: parentTop, left: parentLeft } = getNodePosition();
      // 分别打印
      // console.log(`父节点位置: top=${parentTop}, left=${parentLeft}`);
      nodeItem.node_position = {
        'top': parentTop,
        'left': parentLeft
      };
    }
  })
  const result = isParentIdInMultiNodes()
  if(result){
    // 获取当前节点的位置坐标
    const { top, left } = getNodePosition();
    console.log(`当前节点位置: top=${top}, left=${left}`);
    const parentMultiNodes = multiNodes.value.find(nodeItem => nodeItem.node_id === props.node.parent_id);
    if (parentMultiNodes && parentMultiNodes.node_position){
      const {top:parentTop, left:parentLeft} = parentMultiNodes.node_position;
      console.log(`父节点位置: top=${parentTop}, left=${parentLeft}`)
    }
  }
};

/**
 * 获取节点的位置坐标
 */
function getNodePosition() {
  const rect = commonCardRef.value.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left
  };
}

/**
 * 判断props.node.parent_id 是否在multiNodes中
 */
function isParentIdInMultiNodes() {
  return multiNodes.value.some(nodeItem => nodeItem.node_id === props.node.parent_id);
}

onMounted(() => {
  calculatePosition()
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});
</script>

<template>
  <div class="children-line" v-if="node.parent_id !== null "></div>
  <svg width="200" height="10">
    <line x1="10" y1="10" x2="60" y2="10" stroke="#D8D8D8" stroke-width="10" />
  </svg>
  <div class="common-card" ref="commonCardRef">
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