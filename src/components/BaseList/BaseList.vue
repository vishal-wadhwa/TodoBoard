<template>
  <v-container fluid>
    <div class='headline mb-3 font-weight-light'>
      {{header}}
      <v-avatar :color='highlightColor' size='30' class='white--text ml-3'>{{dataList.length}}</v-avatar>
    </div>
    <base-list-item
      @bli:click='(data, ev) => onItemClickHandler(item._id, data, ev)'
      v-for='item in dataList'
      :key='item._id'
      :title='item.title'
      :desc='item.desc || ""'
      :tags='item.tags || []'
      :ribbon-color='highlightColor'
      :view='item.view || "full"'
    ></base-list-item>
    <base-list-item view='new' title='Create new' @bli:click='onItemAddHandler'></base-list-item>
  </v-container>
</template>
<script>
import BaseListItem from './BaseListItem'

export default {
  components: { BaseListItem },
  data () {
    return {
      dataList: []
    }
  },
  props: {
    highlightColor: {
      type: String,
      default: 'black'
    },
    showCount: {
      type: Boolean,
      default: true
    },
    header: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onItemAddHandler (data, ev) {
      this.$emit('bl:add', ev)
    },
    onItemClickHandler (id, data, ev) {
      this.$emit('bl:click', this.list.find(it => it['_id'] === id), ev)
    }
  },
  computed: {

  },
  created () {
    this.dataList = this.list.slice()
  },
  watch: {
    list (newv, oldv) {
      this.dataList = newv.slice()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
