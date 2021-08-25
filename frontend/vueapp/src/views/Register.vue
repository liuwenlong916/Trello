<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <k-form
          :model="user"
          :rules="rules"
          ref="registerForm"
          @submit.prevent
          @keyup.enter="registerSubmit"
        >
          <k-form-item label="账号" prop="name">
            <label>
              <k-input
                autofocus="autofocus"
                placeholder="输入用户名"
                v-model="user.name"
              />
            </label>
          </k-form-item>
          <k-form-item label="密码" prop="password">
            <k-input
              placeholder="输入密码"
              type="password"
              v-model="user.password"
            ></k-input>
          </k-form-item>
          <k-form-item label="再次输入密码" prop="rePassword">
            <k-input
              type="password"
              placeholder="再次确认密码"
              v-model="user.rePassword"
            />
          </k-form-item>
          <k-form-item>
            <!-- <input type="submit" class="btn btn-success" value="注册" /> -->
            <k-button type="success" @click="registerSubmit">注册</k-button>
            <span class="signin-signup-separator">或者</span>
            <!-- <input type="button" class="btn" value="登录" /> -->
            <router-link :to="{ name: 'Login' }" tag="button" class="btn"
              >登录</router-link
            >
            <!-- <k-button @click="$router.push({ name: 'Login' })">登陆</k-button> -->
          </k-form-item>
        </k-form>
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
      rules: {
        name: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }],
        rePassword: [{ required: true, message: '请再次输入密码' }],
      },
    }
  },
  methods: {
    async registerSubmit() {
      this.$refs['registerForm'].validator(async valid => {
        if (valid) {
          await this.$store.dispatch('user/register', { ...this.user })
          this.$router.push({ name: 'Login' })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
