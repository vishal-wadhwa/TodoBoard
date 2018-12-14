<template>
  <v-container fluid>
    <v-card>
      <v-layout row align-start :style='{borderLeft: ribbonStyle}' class='pa-2'>
        <v-icon>{{type}}</v-icon>
        <v-flex align-self-center class='mt-1 mx-2'>
          <v-card-title class='title pa-0'>{{title}}</v-card-title>
          <v-divider class='my-2' v-if='!isCompactView'></v-divider>
          <v-card-text text-truncate class='ml-1 pa-0' v-if='!isCompactView'>{{desc}}</v-card-text>
          <v-card-text class='pa-0 ml-1' v-if='!isCompactView'>
            <v-chip
              v-for='(tag, idx) in tags'
              :key='idx'
              small
              label
              :color='tagColor()'
              text-color='white'
            >{{tag}}</v-chip>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
const FULL_VIEW = 'full'
const COMPACT_VIEW = 'compact'
const VIEW_TYPES = [FULL_VIEW, COMPACT_VIEW]
export default {
  data () {
    return {
      colorChoices: ['red', 'green', 'purple', 'indigo', 'primary', 'secondary', 'teal'],
      FULL_VIEW: FULL_VIEW,
      COMPACT_VIEW: COMPACT_VIEW,
      VIEW_TYPES: VIEW_TYPES
    }
  },
  props: {
    type: {
      type: String,
      default: 'assignment'
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    view: {
      type: String,
      default: FULL_VIEW,
      validator (val) {
        return VIEW_TYPES.includes(val)
      }
    },
    ribbonStyle: {
      type: String,
      default: '3px solid black'
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tagColor () {
      const idx = Math.random() * this.colorChoices.length >> 0
      return this.colorChoices[idx]
    }
  },
  computed: {
    isCompactView () {
      return this.view === this.COMPACT_VIEW
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
