<template>
  <v-card class='ma-1'>
    <v-card-title class='title'>{{formHeading}}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class='pb-0'>
      <v-form ref='form'>
        <slot name='form'>
          <v-text-field
            autofocus
            v-model='title'
            prepend-icon='title'
            box
            :rules='[v => v && !!v.length || "Required"]'
            clear-icon='close'
            clearable
            label='Title'
          ></v-text-field>
          <v-textarea box v-model='desc' prepend-icon='description' rows='3'>
            <div slot='label'>
              Description
              <small>(optional)</small>
            </div>
          </v-textarea>
          <v-combobox
            box
            small-chips
            v-model='tagSelect'
            prepend-icon='category'
            deletable-chips
            multiple
            :chips='!!tagSelect.length'
            hint='Add a tag and press enter.'
            :items='tags'
            clearable
          >
            <div slot='label'>
              Tags
              <small>(optional)</small>
            </div>
          </v-combobox>
        </slot>
      </v-form>
    </v-card-text>
    <v-card-actions class='pt-0 pb-3'>
      <slot name='actions'>
        <v-layout justify-end>
          <v-btn round @click='discard' color='error'>
            <v-icon>clear</v-icon>&nbsp;Discard
          </v-btn>
          <v-btn round @click='save' color='success'>
            <v-icon>check_circle_outline</v-icon>&nbsp;Save
          </v-btn>
        </v-layout>
      </slot>
    </v-card-actions>
  </v-card>
</template>
<script>
// import BaseListItem from './BaseList/BaseListItem'

export default {
  data () {
    return {
      title: '',
      tagSelect: [],
      desc: ''
    }
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    formHeading: {
      type: String,
      default: 'Create new note'
    }
  },
  methods: {
    discard (ev) {
      this.$emit('lif:discard', ev)
      this.reset()
    },
    save (ev) {
      if (!this.$refs['form'].validate()) return
      this.$emit('lif:save', {
        title: this.title,
        tags: this.tagSelect,
        desc: this.desc
      }, ev)
      this.reset()
    },
    reset () {
      this.title = ''
      this.tagSelect = []
      this.desc = ''
      this.$refs['form'].reset()
    }
  }/* ,
  created () {
    console.log(BaseListItem.data())
  } */
}
</script>
<style lang="stylus" scoped>
</style>
