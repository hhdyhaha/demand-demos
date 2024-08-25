<script setup lang="ts">
import CommonCard from "@/components/CommonCard.vue";
import { useNodesStore } from "@/stores/index.ts";
import { storeToRefs } from 'pinia'
import { ref, onMounted,  onUnmounted} from 'vue'
const store = useNodesStore()
const { multiNodes } = storeToRefs(store)

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

const nodeRef = ref(null)

if (props.node.children && props.node.children.length > 1) {
  multiNodes.value.push({ 'node_id': props.node.node_id })
}

function findParentNode() {
  if (props.node.children && props.node.children.length > 1) {
    if (nodeRef.value) {
      console.log(nodeRef.value.offsetWidth)
      const parentLineAfter = document.createElement('div')
      parentLineAfter.className = 'parent-line-after'
      parentLineAfter.style.width = `${nodeRef.value.offsetWidth-250}px`
      parentLineAfter.style.height = `10px`
      parentLineAfter.style.backgroundColor = '#D8D8D8'
      parentLineAfter.style.position = 'absolute'
      parentLineAfter.style.left = `${120}px`
      nodeRef.value.appendChild(parentLineAfter)
    }
  }
}

onMounted(() => {
  findParentNode()
  window.addEventListener('resize', findParentNode);
  window.addEventListener('scroll', findParentNode);
})

onUnmounted(() => {
  window.removeEventListener('resize', findParentNode);
  window.removeEventListener('scroll', findParentNode);
});

// 滚动监听

</script>

<template>
  <div class="tree-node">
    <CommonCard :node="node" />
    <div v-if="node.children && node.children.length > 1" class="parent-line"></div>
    <div v-if="node.children && node.children.length" class="children-box" ref="nodeRef">
      <TreeNode v-for="child in node.children" :key="child.node_id" :node="child" />
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
  position: relative; // Ensure parent-line-after is positioned relative to this container
}

.parent-line {
  position: relative;
  width: 10px;
  height: 50px;
  background-color: #D8D8D8;
}
</style>