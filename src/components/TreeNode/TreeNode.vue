<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CommonCard from "@/components/TreeNode/CommonCard.vue"
import { useNodesStore } from "@/stores"
import { storeToRefs } from 'pinia'

const store = useNodesStore()
const { multiNodes } = storeToRefs(store)

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const nodeRef = ref(null)

if (props.node.children && props.node.children.length > 1) {
  multiNodes.value.push({ 'node_id': props.node.node_id })
}

function findParentNode() {
  if (props.node.children && props.node.children.length > 1) {
    if (nodeRef.value) {
      nextTick(() => {
        const parentLineAfter = document.createElement('div')
        parentLineAfter.className = 'parent-line-after'

        // 计算子节点的总宽度
        const childrenWidth = Array.from(nodeRef.value.children)
            .reduce((total, child) => total + child.offsetWidth, 0)

        // 设置线的宽度为子节点总宽度减去一些边距
        const lineWidth = Math.max(childrenWidth - 40, 0) // 40px for margins
        parentLineAfter.style.width = `${lineWidth}px`

        parentLineAfter.style.height = `10px`
        parentLineAfter.style.backgroundColor = '#D8D8D8'
        parentLineAfter.style.position = 'absolute'
        parentLineAfter.style.top = '-1px'
        parentLineAfter.style.left = '20px'

        nodeRef.value.appendChild(parentLineAfter)
      })
    }
  }
}

function handleResize() {
  // 移除旧的线
  if (nodeRef.value) {
    const elements = nodeRef.value.querySelectorAll('.parent-line-after')
    elements.forEach(el => el.remove())
  }
  // 重新计算和添加线
  findParentNode()
}

onMounted(() => {
  findParentNode()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  // 清理动态创建的元素
  if (nodeRef.value) {
    const elements = nodeRef.value.querySelectorAll('.parent-line-after')
    elements.forEach(el => el.remove())
  }
})
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
  position: relative;
}

.parent-line {
  position: relative;
  width: 10px;
  height: 50px;
  background-color: #D8D8D8;
}

.parent-line-after {
  position: absolute;
  height: 10px;
  background-color: #D8D8D8;
  top: -1px;
  left: 20px;
}
</style>