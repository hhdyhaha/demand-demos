<script setup lang="ts">
import {ref} from 'vue';

const urlArr = ref([
  {
    imgId: 1,
    url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.vfWphae_aDOi2hZU_xpuRgHaOA?rs=1&pid=ImgDetMain',
    desc: '背景图片'
  },
  {imgId: 2, url: 'https://puui.qpic.cn/vpic_cover/t3504ncwn19/t3504ncwn19_1677729444_hz.jpg/1280', desc: '图片2'},
  {imgId: 3, url: 'https://puui.qpic.cn/vpic_cover/i35043m4h3x/i35043m4h3x_1677833515_hz.jpg/1280', desc: '图片3'}
]);

const rightBox = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  images: [] as Array<{ imgId: number, url: string, desc: string, width?: number, height?: number }>
});

const handleDragStart = (e: DragEvent, imgId: number) => {
  e.dataTransfer?.setData('imgId', imgId.toString());
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const imgId = parseInt(e.dataTransfer?.getData('imgId') || '0');
  const img = urlArr.value.find(item => item.imgId === imgId);
  if (img) {
    const rightBoxElement = e.currentTarget as HTMLElement;
    const {width, height} = rightBoxElement.getBoundingClientRect();
    const x = e.clientX - rightBoxElement.getBoundingClientRect().left;
    const y = e.clientY - rightBoxElement.getBoundingClientRect().top;
    rightBox.value.images.push({
      ...img,
      width: imgId === 1 ? width : undefined,
      height: imgId === 1 ? height : undefined,
      x: imgId !== 1 ? x : undefined,
      y: imgId !== 1 ? y : undefined
    });
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};
</script>

<template>
  <div class="drag-h5-box">
    <div class="left-box">
      <el-image
          v-for="item in urlArr"
          :key="item.imgId"
          :src="item.url"
          :alt="item.desc"
          style="width: 100px; height: 100px; margin: 2px"
          @dragstart="handleDragStart($event, item.imgId)"
          draggable="true"
      />
    </div>
    <div class="right-box" @dragover="handleDragOver" @drop="handleDrop">
      <el-image
          class="img-item"
          fit="fill"
          v-for="item in rightBox.images"
          :key="item.imgId"
          :src="item.url"
          :alt="item.desc"
          :style="{
    width: item.width ? item.width + 'px' : '100px',
    height: item.height ? item.height + 'px' : '100px',
    left: item.x ? item.x + 'px' : '0px',
    top: item.y ? item.y + 'px' : '0px'
  }"
      />
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
  padding: 0;
  background-color: #c3baba;
  min-width: 400px;
  position: relative;

  .img-item {
    position: absolute;
    left: 0;
  }
}

#canvas {
  border: 1px solid #000;
}
</style>