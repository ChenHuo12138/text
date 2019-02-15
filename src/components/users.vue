<template>
   <!-- el-card自带样式的小容器 -->
    <el-card class="box">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="searchbox">
            <el-col>
                <el-input class="searchInput" placeholder="请输入内容" v-model="query">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
         <el-button type="success">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="list" style="width: 100%">
             <el-table-column prop="id" label="#" width="80"></el-table-column>
             <el-table-column prop="username" label="姓名" width="100"></el-table-column>
             <el-table-column prop="email" label="邮箱" width="140"> </el-table-column>
             <el-table-column prop="mobile" label="电话" width="140"> </el-table-column>
             <el-table-column prop="create_time" label="创建日期" width="200"> 
                 <template slot-scope="list">
                     <!-- slot-scope的值就是外层数据 -->
                     <!-- 固定写法list.row 表示的是list 的每个对象 -->
                    {{list.row.create_time|fmtdate}}
                 </template>
             </el-table-column>
             <el-table-column prop="address" label="用户状态" width="120"> </el-table-column>
             <el-table-column prop="address" label="操作" width="200"> </el-table-column>
       </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum:1,
      pagesize:6,
      list:[]
    };
  },
  created() {
      this.getTableData()
  },
  methods: {
     async getTableData(){
         //参数拼接
        //  query	查询参数	可以为空
        //  pagenum	当前页码	不能为空
        //  pagesize	每页显示条数	不能为空
        //模板字符串提取变量值&{}
        this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token');
          const res= await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          //解构赋值
          const {data,meta:{status,msg}}=res.data
          if(status===200){
              this.list=data.users
              console.log(this.list)
          }
        
      }
  }
};
</script>

<style>
.searchbox {
  margin-top: 20px;
}
.searchInput {
  width: 400px;
}
</style>
