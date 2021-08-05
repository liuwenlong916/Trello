<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form">
          <div>
            <label>
              <k-input
                autofocus="autofocus"
                placeholder="输入用户名"
                v-model="user.name"
              />
            </label>
          </div>
          <div>
            <k-input
              placeholder="输入密码"
              type="password"
              v-model="user.password"
            ></k-input>
          </div>
          <div>
            <k-input
              type="password"
              placeholder="再次确认密码"
              v-model="user.rePassword"
            />
          </div>
          <div>
            <!-- <input type="submit" class="btn btn-success" value="注册" /> -->
            <k-button
              type="success"
              value="注册"
              @click="registerSubmit"
            ></k-button>
            <span class="signin-signup-separator">或者</span>
            <!-- <input type="button" class="btn" value="登录" /> -->
            <router-link :to="{ name: 'Login' }" tag="button" class="btn"
              >登录</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        password: '',
        rePassword: '',
      },
    }
  },
  methods: {
    async registerSubmit() {
      console.log(this.user)
      if (this.user.name.trim() === '' || this.user.password.trim() === '') {
        return this.$message.error('用户名和密码不能为空')
      }
      if (this.user.password !== this.user.rePassword) {
        return this.$message.error('两次密码不一致')
      }
      try {
        await this.$store.dispatch('user/register', { ...this.user })
        this.$router.push({ name: 'Login' })
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
