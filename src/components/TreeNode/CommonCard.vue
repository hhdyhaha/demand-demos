<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useNodesStore } from "@/stores";
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

      // 获取元素children-line
      const childrenLine = document.querySelector('.children-line');

      // 创建SVG元素
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.position = "absolute";
      svg.style.top = "0";
      svg.style.left = "0";
      svg.style.pointerEvents = "none";
      // 创建线条
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", left+120+'');
      line.setAttribute("y1", top-120+'');
      line.setAttribute("x2", parentLeft+120+'');
      line.setAttribute("y2", parentTop+175+'');
      line.setAttribute("stroke", "#D8D8D8");
      line.setAttribute("stroke-width", "10");

      // 将线条添加到SVG中
      svg.appendChild(line);

      // 将SVG插入到children-line:before
      if (childrenLine && childrenLine.parentNode){
        childrenLine.parentNode.insertBefore(svg, childrenLine);
      }
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


</script>

<template>
  <div class="children-line" v-if="node.parent_id !== null "></div>
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
  margin: 10px 10px 0 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
}

/* 直线 */
.children-line {
  position: relative;
  width: var(--one-children-line-width);
  height: 110px;
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