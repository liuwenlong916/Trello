<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <form id="register-form" method="POST" @submit.prevent="loginSubmit">
          <div>
            <label>
              <input
                class="form-field"
                autofocus="autofocus"
                placeholder="输入用户名"
                v-model="user.name"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                class="form-field"
                placeholder="输入密码"
                v-model="user.password"
              />
            </label>
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="登录" />
            <span class="signin-signup-separator">或者</span>
            <input type="button" class="btn" value="注册" />
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
