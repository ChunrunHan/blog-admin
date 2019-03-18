<template>
  <div>
    <d2-container>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" @submit.native.prevent>
        <el-form-item label="文章标题" prop="name">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag">
          <el-select multiple
                     filterable
                     allow-create
                     default-first-option v-model="form.tag" placeholder="请选择活动区域">
            <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div>
        <div id="main">
          <mavon-editor v-model="form.content" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
        </div>
      </div>
      <div class="mt-15">
        <el-button type="success" @click="submitForm('form')">发布</el-button>
        <el-button type="warning">存为草稿</el-button>
      </div>
    </d2-container>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js' // 七牛上传
import { uploadToken, qiniuDel } from '@api/sys.login'

export default {
  name: 'index',
  data () {
    return {
      token: '', // 七牛上传token
      pos: '',
      form: {
        title: '',
        category: '',
        tag: ''
      },
      options5: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '请选择文章标签', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // alert("hahhahah")
    // 请求七牛token
    uploadToken().then(res => {
      console.log(res.token)
      if (res.token) {
        this.token = res.token
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    submitForm (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    $imgAdd (pos, $file) {
      console.log('图片上传啊')
      if (this.token == '') {
        return
      }
      let { token } = this
      console.log('token', token)
      console.log(pos, $file)
      this.pos = pos
      var observable = qiniu.upload($file, $file.name, token)
      observable.subscribe(this.uploadNext, this.uploadError, this.uploadComplete)
      return false
    },
    uploadNext (res) {

    },
    uploadError (err) {

    },
    uploadComplete (res) {
      console.log(res)
      let { pos } = this
      let url = 'http://po8vwrl7r.bkt.clouddn.com/' + res.key
      this.$refs.md.$img2Url(pos, url)
    },
    // 删除文件
    $imgDel (pos) {
      console.log('删除七牛图片', pos)
      let key = pos[0].name
      qiniuDel(key).then(res => {
        // console.log('删除成功', res)
        delete this.form.content[pos[0]]
        this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos[0])
      }).catch(err => {
        console.log(err)
      })
    },
    base64toBlob (dataurl) {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    }
  }
}
</script>

<style scoped>

</style>
