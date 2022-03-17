<template>
  <div class="home">
    <div class="title">
      岗位画像
    </div>
    <div class="sub-title">
      基于岗位画像的课程动态调整机制研究
    </div>
    <div class="center">
      <el-image
          src="index.png"
          style="height: 430px"
          fit="scale-down"
      ></el-image>
      <el-image
          style="height: 430px"
          src="charts.png"
          fit="scale-down"
      ></el-image>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return{
    }
  }
}
</script>
<style scoped>
.home{
  padding-top: 60px;
}
.title{
  text-align: center;
  font-size: 54px;
  font-weight: 700;
  color: #212930;
  margin-bottom: 20px;
}
.sub-title{
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #6c7d8f;
  padding-bottom: 10px;
}
</style>
