<script setup lang="ts">
import NodeDemo from '@/components/TreeNode/NodeDemo.vue';
import DragH5 from "@/components/DragH5/DragH5.vue";
import DescriptionTextControl from "@/components/DescriptionTextControl/DescriptionTextControl.vue";
import { ref, computed } from 'vue';

const templateMap = [
  { key: '1', component: DragH5, name: 'Drag H5' },
  { key: '2', component: NodeDemo, name: 'Node Demo' },
  { key: '3', component: DescriptionTextControl, name: 'Description Text Control' }
];

const activeIndex = ref('3');
const activeComponent = computed(() => {
  const activeTemplate = templateMap.find(template => template.key === activeIndex.value);
  return activeTemplate ? activeTemplate.component : null;
});

const handleSelect = (key: string) => {
  activeIndex.value = key;
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect">
          <el-menu-item v-for="template in templateMap" :key="template.key" :index="template.key">
            {{ template.name }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <component :is="activeComponent"/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>