<template>
  <div class="header-container">
    <Avatar url="https://img0.baidu.com/it/u=3258727808,3216045793&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1044"></Avatar>
    <router-link v-for="item in items" :key="item.link" :exact='item.exact' :to="{name:item.name}">
    <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
import Avatar from "./Avatar";
export default {
    components:{
        Avatar,

    },
    data(){
        return {
            items:[
                {
                    name: "Home",
                    title: "首页",
                    exact: true,
                },
                {
                    name:'Post',
                    title:'岗位',
                    exact:true,
                },
                {
                    name:"Course",
                    title:'课程',
                    exact:true,
                },
                {
                    name:'About',
                    title:'个人',
                    exact:true,
                }
            ]
        }
    }
}
</script>

<style scoped>
.header-container {
    width: 100%;
    height: 70px;
    border: 1px solid ;
}
</style>
