<template>
  <v-card class='ma-1'>
    <v-card-title class='title'>{{formHeading}}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class='pb-0'>
      <v-form ref='form'>
        <slot name='form'>
          <v-text-field
            autofocus
            validate-on-blur
            v-model='title'
            prepend-icon='title'
            box
            :rules='[NO_BLANK_RULE]'
            clear-icon='close'
            clearable
            label='Title'
            ref='titleField'
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
            validate-on-blur
            :rules='[NO_BLANK_ELE_ARRAY_RULE]'
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
          <v-btn round @click='onDiscard' color='error' :small='$vuetify.breakpoint.xs'>
            <v-icon>clear</v-icon>&nbsp;Discard
          </v-btn>
          <v-btn round @click='onSave' color='success' :small='$vuetify.breakpoint.xs'>
            <v-icon>check_circle_outline</v-icon>&nbsp;Save
          </v-btn>
        </v-layout>
      </slot>
    </v-card-actions>
  </v-card>
</template>
<script>
const NO_BLANK_RULE_GEN = msg => v => (typeof v === 'string' && !!v && !!v.trim().length) || msg

export default {
  data () {
    return {
      title: '',
      tagSelect: [],
      desc: '',
      ERROR_MSG: 'This field must be non-empty.',
      NO_BLANK_RULE: null,
      ERROR_MSG_TAGS: 'Tags must be non-empty',
      NO_BLANK_ELE_ARRAY_RULE: null
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
    onDiscard (ev) {
      this.$emit('lif:discard', ev)
      this.reset()
    },
    onSave (ev) {
      if (!this.$refs['form'].validate()) return
      this.$emit('lif:save', this.getItemData(), ev)
      this.reset()
    },
    reset () {
      this.title = ''
      this.tagSelect = []
      this.desc = ''
      this.$refs['form'].reset()
    },
    getItemData () {
      return {
        title: this.title.trim(),
        tags: this.tagSelect.map(v => v.trim()),
        desc: (this.desc || '').trim()
      }
    },
    focus () {
      this.$refs['titleField'].focus()
    }
  },
  created () {
    this.NO_BLANK_RULE = NO_BLANK_RULE_GEN(this.ERROR_MSG)

    const NO_BLANK_RULE_BOOL = NO_BLANK_RULE_GEN(false)
    this.NO_BLANK_ELE_ARRAY_RULE = v => v.reduce((res, tag) => res && NO_BLANK_RULE_BOOL(tag), true) || this.ERROR_MSG_TAGS
  }
}
</script>
<style lang="stylus" scoped>
</style>
