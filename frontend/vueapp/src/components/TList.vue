<template>
  <div class="list-wrap">
    <div class="list-placeholder"></div>

    <div class="list">
      <div class="list-header">
        <textarea class="form-field-input" v-model="data.name" />
        <div class="extras-menu">
          <span class="icon icon-more"></span>
        </div>
      </div>

      <div class="list-cards">
        <t-card></t-card>
        <div class="list-card-add-form">
          <textarea
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success">添加卡片</button>
          <span class="icon icon-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from './TCard'
export default {
  name: 'TList',
  components: {
    TCard,
  },
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
