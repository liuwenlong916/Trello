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
      <t-popup>
        <button class="avatar">
          <span>Z</span>
        </button>
      </t-popup>
    </div>
  </header>
</template>

<script>
import TPopup from './TPopup'
export default {
  name: 'THeader',
  components: {
    TPopup,
  },
}
</script>
