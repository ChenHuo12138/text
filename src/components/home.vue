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
            <a href="#" class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
        </el-header>
        <el-container>
        <el-aside width="200px" class="aside">
            <el-menu
      default-active="1" unique-opened router='trues'
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
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
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        </el-aside>
        <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
export default {};
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
  background-color: yellow;
}
.aside {
  background-color: red;
}
.main {
  background: gray;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
