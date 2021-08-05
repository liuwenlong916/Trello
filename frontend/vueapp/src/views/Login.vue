<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <!-- <form id="register-form" method="POST" @submit.prevent="loginSubmit"> -->
        <form id="register-form" method="POST">
          <div>
            <k-input
              autofocus="autofocus"
              placeholder="输入用户名"
              v-model="user.name"
            />
          </div>
          <div>
            <k-input
              type="password"
              placeholder="输入密码"
              v-model="user.password"
            />
          </div>
          <div>
            <k-button
              type="success"
              value="登陆"
              @click="loginSubmit"
            ></k-button>
            <span class="signin-signup-separator">或者</span>
            <router-link :to="{ name: 'Register' }" tag="button" class="btn">
              注册
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    async loginSubmit() {
      if (this.user.name.trim() === '' || this.user.password.trim() === '') {
        return this.$message('用户名或密码不能为空')
      }
      await this.$store.dispatch('user/login', { ...this.user })
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
