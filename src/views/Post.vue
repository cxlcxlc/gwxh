<template>
  <div style="padding: 10px">
    <el-row class="tac">
      <el-col :span="3">
        <el-menu>
          <el-menu-item v-for="(item, index) in postList" :key="index" @click="handleClick(item)">
            <span slot="title" class="words-style">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div style="padding-left: 110px; ">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WordCharts from "../components/WordCharts";
import instance from "../utils/request";

export default {
  components: {WordCharts},
  data() {
    return {
      postList: [],
    }
  },
  methods: {
    handleClick(item) {
      if (parseInt(this.$route.path.split('/')[3]) === item.id) return;
      this.$router.replace('' + item.id);
    },
  },
  mounted() {
    instance.get('masters').then(res => {
      this.postList = res.data;
    })
  },
}
</script>

<style>
.words-style {
  /*font-size: 16px;*/
  margin-left: 15px;
  /*font-family: 'Helvetica Neue';*/
  color: #303133
}
</style>