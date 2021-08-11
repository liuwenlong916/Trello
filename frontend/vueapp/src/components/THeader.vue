<template>
  <header>
    <div class="left">
      <router-link :to="{ name: 'Home' }" class="btn btn-icon">
        <i class="icon icon-home"></i>
      </router-link>
      <router-link :to="{ name: 'Home' }" class="btn btn-icon">
        <i class="icon icon-board"></i>
        <span class="txt">看板</span>
      </router-link>
    </div>
    <router-link :to="{ name: 'Home' }" class="logo"></router-link>
    <div class="right">
      <a href="" class="btn btn-icon">
        <i class="icon icon-add"></i>
      </a>
      <t-popup :title="username">
        <button class="avatar">
          <span>{{ username[0].toUpperCase() }}</span>
        </button>
        <t-popup-menu
          slot="content"
          :items="menuItems"
          @command="execute"
        ></t-popup-menu>
      </t-popup>
    </div>
  </header>
</template>

<script>
import TPopup from '@/components/TPopup'
import TPopupMenu from '@/components/TPopupMenu'
import { mapState } from 'vuex'
export default {
  name: 'THeader',
  components: {
    TPopup,
    TPopupMenu,
  },
  data() {
    return {
      menuItems: [
        { name: '登出', command: 'logout' },
        { name: '登出2', command: 'logout2', separator: true },
        { name: '登出1', command: 'logout1' },
      ],
    }
  },
  computed: {
    ...mapState('user', {
      username: state => state.info.name,
    }),
  },
  methods: {
    execute(command) {
      console.log(command)
      switch (command) {
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout() {
      this.$store.commit('user/removeUserInfo')
      // this.$store.dispatch('user/logout')
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
