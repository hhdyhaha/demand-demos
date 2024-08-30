<script setup lang="ts">
import { getNodeDataApi } from "@/api/NodeDemo";
import TreeNode from "./TreeNode.vue";
import { onBeforeMount, ref } from "vue";
import { buildTree } from "@/utils/treeUtils";

const nodesDatas = ref([]);

onBeforeMount(() => {
  getNodeDataApi().then((res) => {
    if (res.status === 200) {
      nodesDatas.value = buildTree(res.data.nodes);
    }
  });
});
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