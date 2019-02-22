<template>
  <v-card class='ma-1'>
    <v-card-title class='title'>{{formHeading}}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div>
        <v-text-field
          autofocus
          class='mr-2'
          v-model='header'
          prepend-icon='title'
          box
          ref='headerField'
          :rules='[NO_BLANK_RULE]'
          clear-icon='close'
          clearable
          label='Header'
          validate-on-blur
        ></v-text-field>
      </div>
      <div>
        <v-subheader>Choose a highlight color for your list</v-subheader>
        <swatches
          v-model='highlightColor'
          inline
          colors='material-basic'
          class='swatches'
          tabindex='-1'
        />
      </div>
      <div>
        <v-subheader>Choose a list type</v-subheader>
        <v-layout justify-center>
          <v-btn-toggle class='transparent' v-model='type' mandatory>
            <v-flex class='text-xs-center'>
              <v-btn
                large
                flat
                v-for='(iconName, idx) in LIST_TYPE_PRESET'
                :key='idx'
                :value='iconName'
                :title='iconName'
              >
                <v-icon>{{iconName}}</v-icon>
              </v-btn>
            </v-flex>
          </v-btn-toggle>
        </v-layout>
      </div>
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
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'

const NO_BLANK_RULE_GEN = msg => v => (typeof v === 'string' && !!v && !!v.trim().length) || msg

const strNumToHex = snum => parseInt(snum).toString(16).padStart(2, '0')
const rgbToHex = rgb => {
  if (/^#[\dA-Z]{6}$/i.test(rgb)) return rgb

  const shadeStr = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).map(strNumToHex).slice(1).join('')
  return '#' + shadeStr
}

const ENTER_KEY_CODE = 13
const SPACE_KEY_CODE = 32

const DEFAULT_LIST_TYPE = 'assignment'
const DEFAULT_COLOR_HEX = '#f44336'
const LIST_TYPE_PRESET = [
  'assignment',
  'list',
  'view_list',
  'playlist_add_check',
  'playlist_play',
  'alarm',
  'assignment_turned_in',
  'bookmark',
  'done',
  'done_all',
  'delete',
  'event',
  'info',
  'label',
  'note_add',
  'payment',
  'question_answer',
  'subject',
  'error',
  'create',
  'add',
  'mail',
  'send',
  'attach_file'
]

export default {
  components: { Swatches },
  props: {
    formHeading: {
      type: String,
      default: 'Create new list'
    }
  },
  data () {
    return {
      DEFAULT_LIST_TYPE,
      DEFAULT_COLOR_HEX,
      LIST_TYPE_PRESET,
      type: DEFAULT_LIST_TYPE,
      highlightColor: DEFAULT_COLOR_HEX,
      header: '',
      NO_BLANK_RULE: null,
      ERROR_MSG: 'This field must be non-empty.',
      onPressEnterOnSwatch: null
    }
  },
  methods: {
    getData () {
      return {
        type: this.type,
        highlightColor: this.highlightColor,
        header: this.header.trim()
      }
    },
    onDiscard (ev) {
      this.$emit('lf:discard', ev)
      this.reset()
    },
    onSave (ev) {
      if (this.NO_BLANK_RULE(this.header) === this.ERROR_MSG) return
      this.$emit('lf:save', this.getData(), ev)
      this.reset()
    },
    reset () {
      this.type = this.DEFAULT_LIST_TYPE
      this.highlightColor = this.DEFAULT_COLOR_HEX
      this.header = ''
    },
    focus () {
      this.$refs['headerField'].focus()
    }
  },
  mounted () {
    const swatches = document.querySelectorAll('.vue-swatches__swatch')
    for (let i = 0; i < swatches.length; ++i) {
      swatches[i].setAttribute('tabindex', 0)
      swatches[i].addEventListener('keydown', this.onPressEnterOnSwatch)
    }
  },
  created () {
    this.NO_BLANK_RULE = NO_BLANK_RULE_GEN(this.ERROR_MSG)
    this.onPressEnterOnSwatch = evt => {
      if (evt.keyCode === ENTER_KEY_CODE || evt.keyCode === SPACE_KEY_CODE) {
        evt.preventDefault()
        this.highlightColor = rgbToHex(evt.target.style.backgroundColor)
      }
    }
  },
  beforeDestroy () {
    const swatches = document.querySelectorAll('.vue-swatches__swatch')
    for (let i = 0; i < swatches.length; ++i) {
      swatches[i].removeEventListener('keydown', this.onPressEnterOnSwatch)
    }
  }
}
</script>
<style lang="stylus" scoped>
.swatches {
  & >>> .vue-swatches {
    &__wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    &__swatch {
      &:focus {
        border: 2px solid #DDDDDD;
      }
    }
  }
}
</style>
