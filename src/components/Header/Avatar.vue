<template>
  <img class="avatar-container"
      :src="url"
      :style="{
            width: size + 'px',
            height: size +'px'
        }"
   />
</template>

<script>
export default {
    props:{
        url:{
            type:String,
            required:true,
        },
        size:{
            type:Number,
        }
    }
}
</script>

<style scoped>
    .avatar-container {
        width: 80px;
        height:100%;
        object-fit: cover;
    }
</style>