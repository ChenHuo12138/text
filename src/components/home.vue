<template>
    <div class="home">
        <el-container class="container">
        <el-header>
              <!--
        el-row 一行
        el-col 一列
        份数  24
      -->
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a href="#" 
             @click="handleOut()"
             class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
        </el-header>
        <el-container>
        <el-aside width="200px" class="aside">
            <el-menu
      default-active="1" router  unique-opened 
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              用户列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
             <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-menu"></i>
              权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
             <i class="el-icon-menu"></i>
              商品列表
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-menu"></i>
              分类参数
          </el-menu-item>
          <el-menu-item index="1-1">
             <i class="el-icon-menu"></i>
              商品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
              订单列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
              数据报表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 提供容器 -->
          <router-view></router-view>
        </el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
export default {
  //if(没有正确的token){返回登录页}
  //有token渲染home
  //代码位置 渲染完毕页面之前触发的函数
  //berforeMount (){ }
  beforeMount() {
    //取出token
    if(!localStorage.getItem('token')){
      this.$router.push({
        name:'login'
      })
    }
  },
  methods: {
    handleOut(){
      //移除token
      localStorage.clear()
      //跳转页面
      this.$router.push({
        name:'login'
      })
      this.$message.success('退出成功')
    }
  },
};
</script>

<style>
.home {
  height: 100%;
}
.middle {
  text-align: center;
  line-height: 60px;
}
.container {
  height: 100%;
  background-color: hsl(212, 33%, 39%);
}
.aside {
  background-color: hsl(212, 33%, 39%);
}
.main {
  background: rgb(168, 166, 166);
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
