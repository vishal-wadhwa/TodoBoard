<template>
  <v-container fluid class='pa-1' @click='onItemClickHandler'>
    <v-card v-if='!isNewView'>
      <v-layout
        row
        align-start
        :style='{borderLeftColor: ribbonColor}'
        class='pa-2 bli-ribbon-style'
      >
        <slot name='vf-icon' :type='type'>
          <v-icon>{{type}}</v-icon>
        </slot>
        <v-flex align-self-center class='mt-1 mx-2'>
          <div class='title font-weight-regular'>
            <slot name='vf-title' :title='title' :view='view'>
              <v-card-title class='pa-0'>{{title}}</v-card-title>
            </slot>
          </div>
          <v-divider class='my-2' v-if='!isCompactView'></v-divider>
          <v-card-text text-truncate class='ml-1 pa-0' v-if='!isCompactView'>{{desc}}</v-card-text>
          <v-card-text class='pa-0' v-if='!isCompactView'>
            <slot name='tags' :title='title' :tags='tags'>
              <v-chip
                v-for='(tag, idx) in tags'
                :key='idx'
                small
                label
                :color='tagColor()'
                text-color='white'
              >{{tag}}</v-chip>
            </slot>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <slot v-else name='vn-body' :title='title' :view='view'>
      <v-card flat tile>
        <v-card-actions class='bli-new--border pa-0'>
          <v-btn flat depressed block class='bli-new--height px-0'>
            <slot name='vn-content' :title='title' :view='view'>
              <v-icon>note_add</v-icon>
              {{title}}
            </slot>
          </v-btn>
        </v-card-actions>
      </v-card>
    </slot>
  </v-container>
</template>
<script>
const FULL_VIEW = 'full'
const COMPACT_VIEW = 'compact'
const NEW_VIEW = 'new'
const VIEW_TYPES = [FULL_VIEW, COMPACT_VIEW, NEW_VIEW]
export default {
  data () {
    return {
      colorChoices: ['red', 'green', 'purple', 'indigo', 'primary', 'secondary', 'teal'],
      FULL_VIEW: FULL_VIEW,
      COMPACT_VIEW: COMPACT_VIEW,
      VIEW_TYPES: VIEW_TYPES,
      NEW_VIEW: NEW_VIEW
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
      default: NEW_VIEW,
      validator (val) {
        return VIEW_TYPES.includes(val)
      }
    },
    ribbonColor: {
      type: String,
      default: 'black'
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
    },
    onItemClickHandler (ev) {
      this.$emit('bli:click', { ...this.$props }, ev)
    }
  },
  computed: {
    isCompactView () {
      return this.view === this.COMPACT_VIEW || ((!this.tags || this.tags.length === 0) && !this.desc)
    },
    isNewView () {
      return this.view === this.NEW_VIEW
    }
  }
}
</script>
<style lang="stylus" scoped>
.bli-new {
  &--border {
    border: 2px dotted gray;
  }

  &--height {
    height: 40px;

    @media screen and (min-width: 960px) {
      height: 80px;
    }
  }
}

.bli-ribbon-style {
  border-left: 3px solid black;
}
</style>
