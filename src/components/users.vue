<template>
   <!-- el-card自带样式的小容器 -->
    <el-card class="box" shadow='always'>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="searchbox">
            <el-col>
                <el-input 
                 @clear="getAll()"
                clearable class="searchInput" placeholder="请输入内容" v-model="query" >
            <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
         <el-button type="success" @click="showlist()">添加用户</el-button>
            </el-col>
        </el-row>
        
        <!-- 表格 -->
        <el-table :data="list" style="width: 100%">
             <el-table-column prop="id" label="#" width="80"></el-table-column>
             <el-table-column prop="username" label="姓名" width="100"></el-table-column>
             <el-table-column prop="email" label="邮箱" width="140"> </el-table-column>
             <el-table-column prop="mobile" label="电话" width="140"> </el-table-column>
             <el-table-column prop="create_time" label="创建日期" width="200"> 
                 <template slot-scope="scope">
                     <!-- 会自动锁定scope -->
                     <!-- slot-scope的值就是外层数据 -->
                     <!-- 固定写法list.row 表示的是list 的每个对象 -->
                    {{scope.row.create_time|fmtdate}}
                 </template>
             </el-table-column>
             <el-table-column prop="address" label="用户状态" width="120"> 
                 <template slot-scope="scope">
                     <el-switch 
                      @change="changeStatu(scope.row)"
                     v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                 </template>
             </el-table-column>
             <el-table-column prop="address" label="操作" width="200"> 
               <template slot-scope="scope">
                  <el-button 
                   @click="handleEidt(scope.row)"
                  type="primary" icon="el-icon-edit" circle size='mini' plain></el-button>
                  <el-button 
                   @click="handleDelete(scope.row)"
                   type="danger" icon="el-icon-delete" circle size='mini' plain></el-button>
                  <el-button 
                   @click="handleCheck(scope.row)"
                  type="success" icon="el-icon-check" circle size='mini' plain></el-button>
               </template>
             </el-table-column>
       </el-table>
       <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
        </el-pagination>
  
    <!-- 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
          <el-form label-position="left" label-width="80px" :model="formdata">
              <el-form-item label="用户名">
                 <el-input v-model="formdata.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                 <el-input v-model="formdata.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                 <el-input v-model="formdata.email"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                 <el-input v-model="formdata.mobile"></el-input>
              </el-form-item>
           </el-form>
    <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
       <el-button type="primary" @click="addItems()">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit">
          <el-form label-position="left" label-width="80px" :model="formdata">
              <el-form-item label="用户名" >
                 <el-input v-model="formdata.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                 <el-input v-model="formdata.email"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                 <el-input v-model="formdata.mobile"></el-input>
              </el-form-item>
           </el-form>
    <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
       <el-button type="primary" @click="addEditItems()">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="分配角色" :visible.sync="dialogFormVisibleCheck">
          <el-form label-position="left" label-width="80px" :model="formdata">
              <el-form-item label="用户名" >
                 {{formdata.username}}
              </el-form-item>
              <el-form-item label="角色">
              <el-select v-model="selectval" placeholder="请进行选择">
                <el-option :value="-1" label="请选择"></el-option>
                <el-option :label="item.roleName" 
                :value="item.id"
                 v-for="(item) in roles" :key="item.id"></el-option>
                <!-- v-for 遍历出所有的option -->
                <!-- 表单元素的特性 -->
                <!-- 1.当v-model的值和option的value值一样的时候显示 label的值  -->
                <!-- 2.当我们选中某个label，此时v-model绑定的数据值=被选中的label的value值 -->
              </el-select>
              </el-form-item>
           </el-form>
    <div slot="footer" class="dialog-footer">
       <el-button @click=" dialogFormVisibleCheck= false">取 消</el-button>
       <el-button type="primary" @click="changeCheck()">确 定</el-button>
    </div>
  </el-dialog>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      list: [],
      selectval:-1,
      total: -1,
      roles:[],
      userID: -1,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleCheck: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
     async  changeCheck(){
         //请求体 角色id rid
          const res =await this.$http.put(`users/${this.userID}/role`,{rid:this.selectval})
          const {meta:{status,msg},data}=res.data
          if(status===200){
            //提示信息
            this.$message.success(msg)
            this.dialogFormVisibleCheck=false
          }
       }
      ,
    async changeStatu(users) {
      //点击按钮修改状态
      const res = await this.$http.put(
        `users/${users.id}/state/${users.mg_state}`
      );
      const { data, meta: { msg, status } } = res.data;
      if (status === 200) {
        //  this.getTableData()
        //双向数据绑定
        this.$message.success(msg);
      }
    },
   async handleCheck(users) {
      this.userID=users.id
      // this.formdata.username=users
      this.formdata=users
      this.dialogFormVisibleCheck = true;
      //获取所有角色名称
       const res = await this.$http.get(`roles`)
       const {data,meta:{msg,status}}=res.data
       if(status===200){
         this.roles=data
       }
       const res2= await this.$http.get(`users/${users.id}`)
       this.selectval=res2.data.data.rid

    },
    async addEditItems() {
      //
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      const { meta: { msg, status }, data } = res.data;
      if (status === 200) {
        this.getTableData();
        //关闭对话框
        this.dialogFormVisibleEdit = false;
      }
    },
    async handleEidt(users) {
      //编辑,首先需要获取的是被点击的用户的信息
      //将所有的数据赋值给formdata
      this.formdata = users;
      //发送请求
      this.dialogFormVisibleEdit = true;
      //  const res =await this.$http.get(`users/${users.id}`)
      //  const {meta:{msg,status},data}=res.data
    },
    async handleDelete(users) {
      //slot-scope 关联外部数据 ,scope.row可以将数据一条一条全部取出
      //发送请求 ,通过用户id删除用户，用户id信息就在users.id中
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${users.id}`);
          const { meta: { msg, status } } = res.data;
          if (status === 200) {
            this.$message.success(msg);
            this.getTableData();
            this.pagenum = 1;
          }
        })
        .catch(() => {
          // this.msg=res.data.meta.msg
          this.$message.info("已取消删除");
        });
    },
    async addItems() {
      const res = await this.$http.post("users", this.formdata);
      const { data, meta: { msg, status } } = res.data;
      //关闭对话框
      //同步执行的情况下一行一行执行
      //弹出提示信息
      this.$message.success(msg);
      this.dialogFormVisibleAdd = false;
      this.getTableData();
      //清空数据
      this.formdata = {};
    },
    async getTableData() {
      //参数拼接
      //  query	查询参数	可以为空
      //  pagenum	当前页码	不能为空
      //  pagesize	每页显示条数	不能为空
      //模板字符串提取变量值&{}
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      //解构赋值
      const { data, meta: { status, msg } } = res.data;
      if (status === 200) {
        this.list = data.users;
        this.total = data.total;
        console.log(this.list);
      }
    },
    getAll() {
      this.getTableData();
    },
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    async showlist() {
      // 改变值为true
      this.dialogFormVisibleAdd = true;
      //添加用户发送post请求
    },
    handleSizeChange(val) {
      //当前条数
      this.pagesize = val;
      this.pagenum = 1;
      this.getTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.searchbox {
  margin-top: 20px;
}
.searchInput {
  width: 400px;
}
</style>
