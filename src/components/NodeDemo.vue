<script setup lang="ts">
import CommonCard from "@/components/CommonCard.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-box">动态节点！</el-header>
      <el-main class="main-box">
        <CommonCard />
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
      justify-content: space-around;
    }
  }
</style>

