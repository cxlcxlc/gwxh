<template>
  <div class="header-container">
    <el-menu
      default-active="/"
      mode="horizontal"
      :router="true"
      style="padding-left: 10px;height: 60px;"
    >
      <Banner />
      <el-menu-item index="/" style="font-size: 16px">首页</el-menu-item>
      <el-menu-item index="/post" style="font-size: 16px">岗位</el-menu-item>
      <el-menu-item index="/course" style="font-size: 16px">课程</el-menu-item>
      <el-menu-item index="/about" style="font-size: 16px">个人</el-menu-item>
      <Sign/>
    </el-menu>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import Banner from "./Banner";
import Sign from "./Sign";

export default {
  name: "Header",
  components: {
    Sign,
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
  height: 60px;
}
.el-menu--horizontal>.el-menu-item {
    line-height: 60px;
    margin:3px;

}
</style>
