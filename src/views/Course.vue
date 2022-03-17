<template>
  <div style="padding: 10px;">
    <el-row>
      <el-col :span="4">
        <el-menu style="height: 800px">
          <el-submenu v-for="(item, index) in majorList" :key="index" :index="item.name">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(i, j) in item.children" :key="j"
                          @click="handleClick(i)"
                          style="color: #303133"
            >{{ i.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="padding-left: 100px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeCharts from "../components/TreeCharts.vue";
import request from "../utils/request";

export default {
  components: {TreeCharts},
  data() {
    return {
      majorList: []
    }
  },
  methods: {
    handleClick(item) {
      if (parseInt(this.$route.path.split('/')[3]) === item.id) return;
      this.$router.replace('' + item.id);
    }
  },
  mounted() {
    request.get('majors').then(res => {
      this.majorList = res.data;
    })
  }
}
</script>

<style>

</style>