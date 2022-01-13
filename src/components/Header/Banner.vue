<template>
  <div>
   <el-image
        style="width: 200px; height: 70px;padding-left:10px;float:left;"
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
      toIndex() {
          this.$router.push("/");
      }
  }
};
</script>

<style>
</style>