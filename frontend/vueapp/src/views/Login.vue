<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <!-- <form id="login-form" method="POST" @submit.prevent="loginSubmit"> -->
        <k-form
          :model="user"
          :rules="rules"
          ref="loginForm"
          @submit.prevent
          @keyup.enter="loginSubmit"
        >
          <k-form-item label="账号" prop="name">
            <k-input
              autofocus="autofocus"
              placeholder="输入用户名"
              v-model="user.name"
            />
          </k-form-item>
          <k-form-item label="密码" prop="password">
            <k-input
              type="password"
              placeholder="输入密码"
              v-model="user.password"
            />
          </k-form-item>
          <k-form-item>
            <k-button type="success" @click="loginSubmit">登陆</k-button>
            <span class="signin-signup-separator">或者</span>
            <router-link :to="{ name: 'Register' }" tag="button" class="btn">
              注册
            </router-link>
            <!-- <k-button @click="$router.push({ name: 'Register' })"
              >注册</k-button
            > -->
          </k-form-item>
        </k-form>
      </div>
    </div>
  </div>
</template>

<script>
import KForm from '../components/KForm/KForm.vue'
import KFormItem from '../components/KForm/KFormItem.vue'
export default {
  components: { KFormItem, KForm },
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
    }
  },
  methods: {
    async loginSubmit() {
      this.$refs['loginForm'].validator(async valid => {
        if (valid) {
          await this.$store.dispatch('user/login', { ...this.user })
          this.$router.push({ name: 'Home' })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
