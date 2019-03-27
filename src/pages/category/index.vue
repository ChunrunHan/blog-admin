<template>
  <div>
    <d2-container>

      <div class="mt-15 flex">
        <el-input placeholder="请输入分类名" v-model="classname" clearable></el-input>
        <el-button type="primary" size="medium" icon="el-icon-plus" v-bind:disabled="classname == ''" @click="addClass">
          添加分类
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
        <el-input v-model="newClassname"></el-input>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editCategory">确 定</el-button>
    </span>
      </el-dialog>
    </d2-container>


  </div>
</template>

<script>
import { addCategory, showCategory, delCategoryList, modifyCategory } from '@api/sys.login'

export default {
  components: {},
  data () {
    return {
      classname: '',
      total: 20,
      page: 1,
      tableData: [],
      selectItem: [],
      dialogVisible: false,
      newClassname: '',
      newClassid: ''
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    // 添加分类
    addClass () {
      let { classname } = this
      addCategory(classname).then(res => {
        this.getCategoryList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取分类列表
    getCategoryList () {
      let { page } = this
      showCategory(page).then(res => {
        this.tableData = res.list
        this.total = res.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除分类
    delCategory (data) {
      delCategoryList(data).then(res => {
        console.log(res)
        this.page = 1
        this.getCategoryList()
      }).catch(err => {

      })
    },
    // 编辑分类
    editCategory () {
      let { newClassid, newClassname } = this
      console.log(newClassid, newClassname)
      this.dialogVisible = false
      let json = {
        id: newClassid,
        name: newClassname
      }
      modifyCategory(json).then(res => {
        this.getCategoryList()
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
      this.getCategoryList()
    },
    handleEdit (index, row) {
      console.log(row.id)
      this.dialogVisible = true
      this.newClassname = row.name
      this.newClassid = row.id
    },
    handleDelete (index, row) {
      let id = row.id.toString()
      this.delCategory(id)
    },
    handleDeleteAll () {
      let delId = []
      this.selectItem.forEach(res => {
        delId.push(res.id)
      })
      console.log(delId)
      this.delCategory(delId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
