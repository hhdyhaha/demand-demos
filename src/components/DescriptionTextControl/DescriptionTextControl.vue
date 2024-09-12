<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
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
import { Editor,Toolbar } from '@wangeditor/editor-for-vue'
import { Boot, IEditorConfig } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule)
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

// const toolbarConfig = {}
const toolbarConfig: Partial<IToolbarConfig> = {
  // 插入哪些菜单
  insertKeys: {
    index: 0, // 自定义插入的位置
    keys: ['uploadAttachment'], // “上传附件”菜单
  },

  // 其他...
}
// const editorConfig = {
//   placeholder: '请输入内容...',
//   'link': {
//     menuKeys: ['editLink'],
//   },
// }

const editorConfig: Partial<IEditorConfig> = {

  // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
  hoverbarKeys: {
    attachment: {
      menuKeys: ['downloadAttachment'], // “下载附件”菜单
    },
  },
  MENU_CONF: {
    // // “上传附件”菜单的配置
    // uploadAttachment: {
    //   server: '/api/upload', // 服务端地址
    //   timeout: 5 * 1000, // 5s
    //
    //   fieldName: 'custom-fileName',
    //   meta: { token: 'xxx', a: 100 }, // 请求时附加的数据
    //   metaWithUrl: true, // meta 拼接到 url 上
    //   headers: { Accept: 'text/x-json' },
    //
    //   maxFileSize: 10 * 1024 * 1024, // 10M
    //
    //   onBeforeUpload(file: File) {
    //     console.log('onBeforeUpload', file)
    //     return file // 上传 file 文件
    //     // return false // 会阻止上传
    //   },
    //   onProgress(progress: number) {
    //     console.log('onProgress', progress)
    //   },
    //   onSuccess(file: File, res: any) {
    //     console.log('onSuccess', file, res)
    //   },
    //   onFailed(file: File, res: any) {
    //     alert(res.message)
    //     console.log('onFailed', file, res)
    //   },
    //   onError(file: File, err: Error, res: any) {
    //     alert(err.message)
    //     console.error('onError', file, err, res)
    //   },

      // // 上传成功后，用户自定义插入文件
      // customInsert(res: any, file: File, insertFn: Function) {
      //   console.log('customInsert', res)
      //   const { url } = res.data || {}
      //   if (!url) throw new Error(`url is empty`)

      //   // 插入附件到编辑器
      //   insertFn(`customInsert-${file.name}`, url)
      // },

      // 用户自定义上传
      customUpload(file: File, insertFn: Function) {
        console.log('customUpload', file)
        // 返回 Promise，必须
        return new Promise(resolve => {
          // 插入一个文件，模拟异步
          setTimeout(() => {
            const src = `https://www.w3school.com.cn/i/movie.ogg`
            insertFn(`customUpload-${file.name}`, src)
            resolve('ok')
          }, 500)
        })
      },

      // // 自定义选择
      // customBrowseAndUpload(insertFn: Function) {
      //   alert('自定义选择文件，如弹出图床')
      //   // 自己上传文件
      //   // 上传之后用 insertFn(fileName, link) 插入到编辑器
      // },

      // 插入到编辑器后的回调
      onInsertedAttachment(elem: AttachmentElement) {
        console.log('inserted attachment', elem)
      },
    },

  // 其他...
}

editorConfig.maxLength = 1000

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