<template>
  <v-container fluid>
    <slot name='header' :header='header' :len='list.length' :show-count='showCount'>
      <v-layout class='mx-1'>
        <v-badge :color='highlightColor'>
          <template slot='badge' v-if='showCount'>
            <span>{{list.length}}</span>
          </template>
          <span class='headline font-weight-light'>{{header}}</span>
        </v-badge>
        <v-spacer></v-spacer>
        <v-btn flat icon small @click.stop='ev => $emit("bl:delete", ev)'>
          <v-icon small>close</v-icon>
        </v-btn>
      </v-layout>
    </slot>
    <base-list-item
      @bli:click='(data, ev) => onItemClickHandler(item._id, data, ev)'
      @bli:delete='ev => $emit("bl:item-delete", item._id, ev)'
      v-for='item in list'
      :key='item._id'
      :title='item.title'
      :type='item.type'
      :desc='item.desc'
      :tags='item.tags'
      :ribbon-color='highlightColor'
      :view='item.view || "full"'
    ></base-list-item>
    <slot name='new-item'>
      <base-list-item view='new' title='Create new' @bli:click='onItemAddHandler'></base-list-item>
    </slot>
  </v-container>
</template>
<script>
import BaseListItem from './BaseListItem'

export default {
  components: { BaseListItem },
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
  }
}
</script>
<style lang="stylus" scoped>
</style>
