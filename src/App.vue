<template>
  <div id="app">
    <el-container >
      <el-header style="padding:0px">
        <Header/>
        </el-header>
      <el-main style="padding:0px;height: 700px;width: 100%">
        <router-view />
        </el-main>
      <el-footer style="padding:0px"></el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "@/components/Header/Header";
export default {
  components: {
    Header,
  },
};
</script>
<style>
*{
  margin: 0px;
  padding: 0px;
  font-family: 'Hiragino Sans GB';
  box-sizing: border-box;
}
.el-form-item .sign-input{
  width: 270px;
}
.center {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}
</style>
