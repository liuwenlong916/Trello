<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created() {
    //路由加载之后执行
    console.log('create App')
    this.$store.commit('user/initUserInfo')
  },
}
</script>
