<template>
  <div>
    <el-image
        class="banner"
        :src="url"
        fit="cover"
    ></el-image>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "banner.png",
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.banner {
  width: 200px;
  height: 58px;
  padding-left: 10px;
  float: left;
}
</style>