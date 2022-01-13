<template>
  <div id="app">
    <el-container >
      <el-header style="padding:0px">
        <Header/>
        </el-header>
      <el-main style="padding:0px">
        <router-view />
        </el-main>
      <el-footer style="padding:0px">Footer</el-footer>
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

</style>
