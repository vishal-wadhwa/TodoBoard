<template>
  <span :style='styling' style='border-radius:15px; padding: 2px; border-bottom: 3px double;'>
    <strong>{{mini ? 'T' : 'TODO'}}</strong>
    <em class='font-weight-thin'>Board</em>
  </span>
</template>
<script>
export default {
  props: {
    size: {
      type: [String, Number],
      default: 14
    },
    color: {
      type: String,
      default: 'white'
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styling () {
      return {
        fontSize: this.isNumericSize ? this.size + 'px' : this.size,
        color: this.color
      }
    },
    isNumericSize () {
      return !isNaN(parseFloat(this.size)) && isFinite(this.size)
    }
  }
}
</script>
