<script setup lang="ts">
import { ref } from 'vue';

const fileList = ref([
  { name: 'demo.jpg', url: 'https://puui.qpic.cn/vpic_cover/i35043m4h3x/i35043m4h3x_1677833515_hz.jpg/1280' }
]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};
const handlePreview = file => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleSuccess = (response, file, fileList) => {
  console.log(response, file, fileList);
};

</script>

<template>
  <div>
<!--    element 文件上传-->
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :onSuccess="handleSuccess"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<style scoped>

</style>