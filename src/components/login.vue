<template>
    <div class="login-parent"> 
        <el-form label-position=top label-width="80px" :model="formdata" class="login-form">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="formdata.password" type="password"></el-input>
            </el-form-item>
            <el-button 
             @click.prevent="handlelogin()"
            type="primary" class="login-btn">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      },
      labelPosition: top
    };
  },
  methods: {
  async  handlelogin() {
      // console.log(111)
      //发送post请求,第一个参数是地址,post请求需要请求体
   const res= await  this.$http.post("login", this.formdata)
        //结构赋值
        console.log(res);
        const { data: { data, meta: { msg, status } } } = res;
        if (status === 200) {
          //通过导航式编程来改变标识
          this.$router.push({
            name: "home"
          });
           localStorage.setItem('token',token)
        } else {
          //不成功跳转不跳转标识还是login
          console.log(msg)
          this.$message.error(msg)
        }
    }
  }
};
</script>

<style>
.login-parent {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
