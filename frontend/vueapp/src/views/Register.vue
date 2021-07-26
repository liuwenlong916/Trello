<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form" method="POST" @submit.prevent="registerSubmit">
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
                v-model="user.passowrd"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                class="form-field"
                placeholder="再次确认密码"
                v-model="user.rePassword"
              />
            </label>
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="注册" />
            <span class="signin-signup-separator">或者</span>
            <input type="button" class="btn" value="登录" />
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
    registerSubmit() {
      // TMessage({
      //   message: '用户名不能为空',
      //   duration: 3000,
      // })
      this.$Message.error('用户名不能为空')
    },
  },
}
</script>

<style lang="scss" scoped></style>
