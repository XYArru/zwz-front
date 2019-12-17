<template>
  <div id="Paper-list">
    <h3 style="float: left">有关{{type}}的博客</h3>
    <div style="clear: both;"></div>
    <el-row :gutter="30">
      <!-- 单个的卡片列 -->
      <div class="container" v-if="show" style="float: left;width: 80%">
        <el-table style="width: 600px;"
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
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="PaperList.length"
          style="float: left">    //这是显示总共有多少数据，
        </el-pagination>
        <!--      <el-col :span="6" v-for="(item, index) in PaperList"-->
        <!--              :index="index"-->
        <!--              :key="index"-->
        <!--              class="">&lt;!&ndash; 0 == flag || item.courseType == flag ? '' : 'hide' &ndash;&gt;-->
        <!--        &lt;!&ndash; card div &ndash;&gt;-->
        <!--        <router-link :to="'/index/Paper/' + item._id">-->
        <!--          <div class="Paper" >-->
        <!--            &lt;!&ndash; info div &ndash;&gt;-->
        <!--            <div class="Paper-info">-->
        <!--              &lt;!&ndash; class name div &ndash;&gt;-->
        <!--              <div class="user">-->
        <!--                {{item.username}}-->
        <!--              </div>-->
        <!--              &lt;!&ndash; teacher name div &ndash;&gt;-->
        <!--              <div class="title">-->
        <!--                {{item.title}}-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </router-link>-->
        <!--      </el-col>-->
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PaperListType',
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      PaperList: [],
      show: true,
      type: this.$route.params.PaperType
    }
  },
  created: function () {
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
      self.$axios.post('/api/searchType', {
        type: this.type
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.show = true
            self.PaperList = response.data.data
          } else if (response.data.code === 400) {
            self.show = false
            self.$message({
              type: 'warning',
              message: response.data.message})
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
