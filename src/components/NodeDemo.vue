<script setup lang="ts">
import {getNodeDataApi} from "@/api/NodeDemo";
import CommonCard from "@/components/CommonCard.vue";
import {onBeforeMount,ref} from "vue";

const nodesDatas = ref([]);
// 挂载的时候调用接口
onBeforeMount(() => {
  getNodeDataApi().then((res) => {
    if (res.status === 200) {
      nodesDatas.value = res.data.nodes;
      const tree = buildTree(nodesDatas.value);
      console.log(JSON.stringify(tree));
      const a = flattenTree(tree)
      console.log(a)
    }
  })
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

// 将树形结构转换为扁平的数据结构
function flattenTree(tree) {
  const flatNodes = [];

  function traverse(node) {
    // 将当前节点添加到扁平数组中
    flatNodes.push({
      node_id: node.node_id,
      node_type: node.node_type,
      node_name: node.node_name,
      parent_id: node.parent_id
    });

    // 递归遍历子节点
    node.children.forEach(child => traverse(child));
  }

  // 遍历根节点
  tree.forEach(rootNode => traverse(rootNode));

  return flatNodes;
}


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-box">动态节点！</el-header>
      <el-main class="main-box">
        <div class="main-box-level">
          <CommonCard/>
        </div>
        <div class="main-box-level">
          <CommonCard/>
          <CommonCard/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
// 主布局容器
.common-layout {
  display: flex; // 使用 Flexbox 简化布局
  flex-direction: column;
  width: 100%;
  height: 100%;

  // 头部区域
  .header-box {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  // 主要内容区域
  .main-box {
    flex-grow: 1; // 让 .main-box 自动扩展以填充剩余空间
    width: 100%;
    display: flex;
    flex-direction: column;

    .main-box-level {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>

