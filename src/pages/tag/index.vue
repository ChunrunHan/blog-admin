<template>
  <div>
    <d2-container>

      <div class="mt-15 flex">
        <el-input placeholder="请输入标签名" v-model="tagname" clearable></el-input>
        <el-button type="primary" size="medium" icon="el-icon-plus" v-bind:disabled="tagname == ''" @click="addTag">
          添加标签
        </el-button>
      </div>
      <div>
        <el-table
            :data="tableData"
            @select="handleSelect"
            @select-all="handleSelectAll"
            stripe
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="name"
              label="分类名称"
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
                  @click="handleDelete(scope.$index, scope.row)">删除
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
            @click="handleDeleteAll()">批量删除
        </el-button>
      </div>
      <div class="text-center">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size=10
            :current-page="page"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
        <el-input v-model="newTagname"></el-input>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editTag">确 定</el-button>
    </span>
      </el-dialog>
    </d2-container>


  </div>
</template>

<script>
import { createTag, showTagList, delTagList, modifyTag } from '@api/sys.login'

export default {
  components: {},
  data () {
    return {
      tagname: '',
      total: 20,
      page: 1,
      tableData: [],
      selectItem: [],
      dialogVisible: false,
      newTagname: '',
      newTagid: ''
    }
  },
  mounted () {
    this.getTagList()
  },
  methods: {
    // 添加标签
    addTag () {
      let { tagname } = this
      createTag(tagname).then(res => {
        this.getTagList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取标签列表
    getTagList () {
      let { page } = this
      showTagList(page).then(res => {
        this.tableData = res.list
        this.total = res.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除标签
    delTag (data) {
      delTagList(data).then(res => {
        console.log(res)
        this.page = 1
        this.getTagList()
      }).catch(err => {

      })
    },
    // 编辑标签
    editTag () {
      let { newTagname, newTagid } = this
      console.log(newTagid, newTagname)
      this.dialogVisible = false
      let json = {
        id: newTagid,
        name: newTagname
      }
      modifyTag(json).then(res => {
        this.getTagList()
      }).catch(err => {

      })
    },
    handleSelect (val, row) {
      this.selectItem = val
    },
    handleSelectAll (selection) {
      this.selectItem = selection
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getTagList()
    },
    handleEdit (index, row) {
      console.log(row.id)
      this.dialogVisible = true
      this.newTagname = row.name
      this.newTagid = row.id
    },
    handleDelete (index, row) {
      let id = row.id.toString()
      this.delTag(id)
    },
    handleDeleteAll () {
      let delId = []
      this.selectItem.forEach(res => {
        delId.push(res.id)
      })
      console.log(delId)
      this.delTag(delId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
