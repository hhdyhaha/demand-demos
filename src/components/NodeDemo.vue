<script setup lang="ts">
import { getNodeDataApi } from "@/api/NodeDemo";
import TreeNode from "./TreeNode.vue";
import { onBeforeMount, ref } from "vue";

const nodesDatas = ref([]);

onBeforeMount(() => {
  getNodeDataApi().then((res) => {
    if (res.status === 200) {
      const tree = buildTree(res.data.nodes);
      nodesDatas.value = tree;
    }
  });
});

// 将扁平的数据结构转换为树形结构
function buildTree(nodes) {
  const nodeMap = new Map();
  const rootNodes = [];
  // 将所有节点放入 Map 中
  nodes.forEach(node => {
    node.children = [];
    nodeMap.set(node.node_id, node);
  });
  // 构建树结构
  nodes.forEach(node => {
    if (node.parent_id === null) {
      rootNodes.push(node);
    } else {
      const parentNode = nodeMap.get(node.parent_id);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });
  return rootNodes;
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-box">动态节点！</el-header>
      <el-main class="main-box">
        <TreeNode v-for="node in nodesDatas" :key="node.node_id" :node="node" />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header-box {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .main-box {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>