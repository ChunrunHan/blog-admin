<template>
  <div>
    <d2-container>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" @submit.native.prevent>
        <el-form-item label="文章标题" prop="title">
          <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="classid">
          <el-select v-model="form.classid" placeholder="请选择文章分类">
            <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="lableid">
          <el-select multiple
                     filterable
                     clearable
                     default-first-option v-model="form.lableid" placeholder="请选择文章标签">
            <el-option
                v-for="item in tagsList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
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
        <el-button type="warning" @click="saveraft('form')">存为草稿</el-button>
      </div>
    </d2-container>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js' // 七牛上传
import { uploadToken, qiniuDel, postArticle, getArticleOptions, getArticleDetail } from '@api/sys.login'

export default {
  name: 'index',
  data () {
    return {
      token: '', // 七牛上传token
      pos: '',
      form: {
        id: '',
        title: '',
        classid: '',
        lableid: '',
        content: '',
        status: 1 // 文章状态\n1-已发布\n2-草稿箱\n3-垃圾箱
      },
      categoryList: [],
      tagsList: [],
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        classid: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        lableid: [
          { required: true, message: '请选择文章标签', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // alert("hahhahah")
    this.getQiniuToken()
    this.getArticleSelectOptions()
    if (this.$route.params.id) {
      console.log('获取文章信息啊')
      let { id } = this.$route.params
      getArticleDetail(id).then(res => {
        // console.log(res)
        let newLable = res.lableid.split(',')
        // console.log(newLable)
        this.form = res
        this.form.lableid = []
        newLable.forEach(key => {
          this.form.lableid.push(parseInt(key))
        })
        console.log('文章信息', this.form)

      })
    }
  },
  methods: {
    // 请求七牛token
    getQiniuToken () {
      uploadToken().then(res => {
        if (res.token) {
          this.token = res.token
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getArticleSelectOptions () {
      getArticleOptions().then(res => {
        this.categoryList = res.categoryList
        this.tagsList = res.tagsList
      }).catch(err => {
      })
    },
    submitForm (formName) {
      this.form.status = 1
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addArticle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveraft (formName) {
      this.form.status = 2
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addArticle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addArticle () {
      var json = JSON.parse(JSON.stringify(this.form))
      json.lableid = json.lableid.join(',')
      console.log('上传的数据', json)
      postArticle(json).then(res => {
        console.log('上传文章或修改文章返回结果', res)
        this.$router.push('/index')
      }).catch(err => {
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
