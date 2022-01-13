<template>
  <div class="header-container">
    <el-menu
      default-active="/"
      mode="horizontal"
      :router="true"
      style="padding-left: 10px"
    >
      <Banner />

      <el-menu-item index="/">处理中心</el-menu-item>
      <el-menu-item index="/post">处理中心</el-menu-item>
      <el-menu-item index="/course">消息中心</el-menu-item>
      <el-menu-item index="/about">订单管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import Banner from "./Banner";
export default {
  components: {
    Avatar,
    Banner,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 70px;
}
.el-menu--horizontal>.el-menu-item {
    line-height: 70px;
    margin:3px
}
</style>
