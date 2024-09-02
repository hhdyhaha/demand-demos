<template>
  <div style="border: 1px solid #ccc">
    <Editor
        ref="inputRef"
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
    <el-button @click="insertHyperlink">插入链接</el-button>
  </div>
</template>
<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref<string>('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<a href="https://www.baidu.com" target="_blank">访问示例网站</a>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  'link': {
    menuKeys: ['editLink'],
  },
}
const mode = 'default' // 或 'simple'
toolbarConfig.toolbarKeys = [
];
const inputRef = ref(null)
const insertHyperlink = () => {
  const linkText = `(https://www.baidu.com)`;
  console.log('inputRef.value',inputRef.value.box)
  if (inputRef.value) {
    const textAreaElement = inputRef.value.textarea; // 获取实际的 textarea 元素
    if (textAreaElement) {
      const selectionStart = textAreaElement.selectionStart;
      const inputValue = textAreaElement.value;
      textarea.value = inputValue.substring(0, selectionStart) + linkText + inputValue.substring(selectionStart);
      nextTick(() => {
        // 设置新的光标位置
        textAreaElement.focus();
        textAreaElement.setSelectionRange(selectionStart + linkText.length, selectionStart + linkText.length);
      });
    }
  }
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
<style scoped>
</style>