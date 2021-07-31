<template>
  <ul class="popup-menu-list">
    <template v-for="item of items">
      <li v-if="item.separator" :key="item.command" class="separator"></li>
      <li v-else :key="item.command" @click="command(item.command)">
        <span>{{ item.name }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'TPopupMenu',
  props: {
    items: {
      type: Array,
      default() {
        //{name, command, separator}
        return []
      },
    },
  },
  methods: {
    command(command) {
      this.$emit('command', command)
    },
  },
}
</script>

<style lang="scss" scoped></style>
