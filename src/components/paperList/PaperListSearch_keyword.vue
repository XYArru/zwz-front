<template>
  <div>
    <div id="Paper-list" v-if="show">
      <h3>搜索博客</h3>

      <el-row>
        <div class="container" v-if="show">
          <el-col :span="14" :offset="5" >
            <el-table style="width: 100%"
                      :stripe="true"
                      :data="PaperList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column label="contributor" prop="username" width="180">
                <template slot-scope="scope">
                  <el-button @click="handleClickUser(scope.row)" type="text">{{scope.row.username}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="title" prop="title" width="240">
              </el-table-column>
              <el-table-column label="type" width="120">
                <template slot-scope="scope">
                  <el-button @click="handleClickType(scope.row)" type="text">{{scope.row.type}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <div style="clear: both"></div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="PaperList.length">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <div v-if="!show">
      <br>
      <br>
      <br>
      <img src="../../assets/blank.png">
      <br>
      <br>
      <p style="color: gray">空空如也</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperListSearch_keyword',
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      PaperList: [],
      show: false,
      input: this.$route.params.input
    }
  },
  mounted () {
    this.handlePaperList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    handlePaperList () {
      var self = this
      self.$axios.post('/api/searchTitle', {
        title: this.input
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.show = true
            self.PaperList = response.data.data
          } else if (response.data.code === 400) {
            self.show = false
            self.$message({
              type: 'warning',
              message: '无结果'
            })
          } else {
            alert('code = ' + response.data.code)
          }
        })
        .catch(function (error) {
          alert(error)
        })
    },
    handleClick (row) {
      this.$router.push('/index/Paper/' + row._id)
    },
    handleClickType (row) {
      this.$router.push('/index/PaperList/' + row.type)
    },
    handleClickUser (row) {
      this.$router.push('/user/' + row.username + '/othersProfile')
    }
  }

}
</script>

<style scoped>

</style>
