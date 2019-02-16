<template>
    <el-card class="box">
        <!-- 面包屑导航 -->
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
         <el-table :data="list" style="width: 100% " height="500" border class="table-style">
            <el-table-column type="index"></el-table-column>
             <!-- <el-table-column prop="id" label="#" width="160"></el-table-column> -->
             <el-table-column prop="authName" label="权限名称" width="160"></el-table-column>
             <el-table-column prop="path" label="路径" width="160"> </el-table-column>
             <el-table-column prop="level" label="层级" width="160">
              <!-- 当单元格的内容不是prop的内容的时候需要加template     -->
               <template slot-scope="scope">
                  <!-- 注意： 这里数字0与字符串的0 -->
                     <span v-if="scope.row.level==='0'">一级</span>
                     <span v-if="scope.row.level==='1'">二级</span>
                     <span v-if="scope.row.level==='2'">三级</span>   
               </template>
              </el-table-column>
       </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    //获取首屏数据
    this.getRightList();
  },
  methods: {
    async getRightList() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      //发送请求
      const res = await this.$http.get(`rights/list`);
      const { meta: { msg, status }, data } = res.data;
      if (status === 200) {
        this.list = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.table-style{
    margin-top: 20px;
}
</style>
