<template>
  <div>
    <d2-container>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="serachvalue" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search"
                     style="background: #409EFF;color:white;" @click="searchKeyword">查找文章
          </el-button>
        </el-input>
      </div>
      <div>
        <el-table
            :data="tableData"
            stripe
            @select="handleSelect"
            @select-all="handleSelectAll"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="日期"
              sortable
              align="center"
              width="180">
          </el-table-column>
          <el-table-column
              prop="title"
              label="文章标题"
              align="center"
              width="500">
          </el-table-column>
          <el-table-column
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button
                  size="medium"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="medium"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">移到垃圾箱
              </el-button>
            </template>

          </el-table-column>
        </el-table>

      </div>
      <div class="mt-15">
        <el-button
            size="medium"
            icon="el-icon-delete"
            type="danger"
            :disabled="selectItem.length == 0"
            @click="handleDeleteAll()">批量到垃圾箱
        </el-button>
      </div>
      <div class="text-center">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size=10
            :current-page="page"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </d2-container>
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@api/sys.login'

export default {
  components: {},
  data () {
    return {
      selectItem: [],
      serachvalue: '',
      page: 1,
      total: 10,
      status: 1,
      tableData: []

    }
  },
  mounted () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      let json = {
        keyword: this.serachvalue,
        page: this.page,
        status: this.status
      }
      getArticleList(json).then(res => {
        console.log(res)
        this.tableData = res.list
        this.total = res.count
      })
    },
    searchKeyword () {
      this.page = 1
      this.getArticle()
    },
    delArticleList (data) {
      let json = {
        data: data,
        truly: false
      }
      delArticle(json).then(res => {
        console.log(res)
        this.page = 1
        setTimeout(() => {
          this.getArticle()
        }, 1000)
      }).catch(err => {
      })
    },
    handleSelect (val, row) {
      this.selectItem = val
    },
    handleSelectAll (selection) {
      this.selectItem = selection
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getArticle()
    },
    handleEdit (index, row) {
      console.log(index, row)
      console.log(row.id)
      this.$router.push({ name: 'article', params: { id: row.id } })
    },
    handleDelete (index, row) {
      let id = row.id.toString()
      this.delArticleList(id)
    },
    handleDeleteAll () {
      let delId = []
      this.selectItem.forEach(res => {
        delId.push(res.id)
      })
      console.log(delId)
      this.delArticleList(delId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
