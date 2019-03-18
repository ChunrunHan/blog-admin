<template>
  <div>
    <d2-container>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="serachvalue" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search" style="background: #409EFF;color:white;"></el-button>
        </el-input>
      </div>
      <div>
        <el-table
            :data="tableData"
            stripe
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="date"
              label="日期"
              sortable
              align="center"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
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
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                  size="medium"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>

          </el-table-column>
        </el-table>

      </div>
      <div class="mt-15">
        <el-button
            size="medium"
            icon="el-icon-delete"
            type="danger"
            @click="handleDeleteAll()">批量删除</el-button>
      </div>
      <div class="text-center">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size=10
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </d2-container>
  </div>
</template>

<script>
import D2HelpBtn from './components/d2-help-btn'
import D2Badge from './components/d2-badge'
export default {
  components: {
    D2HelpBtn,
    D2Badge
  },
  data () {
    return {
      serachvalue:'',
      total: 20,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]

    }
  },
  methods:{
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
