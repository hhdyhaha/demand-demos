<script setup lang="ts">
import {ref} from 'vue';

// 图片地址 数组，里面有三个图片地址
const urlArr = ref([

  {
    imgId: 1,
    url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.vfWphae_aDOi2hZU_xpuRgHaOA?rs=1&pid=ImgDetMain',
    desc: '背景图片',
  },
  {
    imgId: 2,
    url: 'https://puui.qpic.cn/vpic_cover/t3504ncwn19/t3504ncwn19_1677729444_hz.jpg/1280',
    desc: '图片2',
  },
  {
    imgId: 3,
    url: 'https://puui.qpic.cn/vpic_cover/i35043m4h3x/i35043m4h3x_1677833515_hz.jpg/1280',
    desc: '图片3',
  }
])
</script>

<template>
  <div class="drag-h5-box">
    <!--左侧展示页面和右侧展示页面，左侧展示图片，右侧展示一个画布，后续要将左侧的图片拖拽到右侧画布上-->
    <div class="left-box">
      <img style="width: 100px; height: 100px; margin: 2px" v-for="item in urlArr" :key="item.imgId" :src="item.url" :alt="item.desc"/>
    </div>
    <div class="right-box">
      <!--      <canvas id="canvas" width="800" height="600"></canvas>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drag-h5-box {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.left-box {
  width: 300px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}

.right-box {
  width: calc(40% - 300px);
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
}

#canvas {
  border: 1px solid #000;
}
</style>