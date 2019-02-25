<template>
  <v-snackbar v-show='!!msg' v-model='snackbar' bottom auto-height>
    <v-icon :color='type' class='mr-3' medium>{{TYPE_TO_ICON[type]}}</v-icon>
    {{msg}}
    <v-btn color='pink' flat @click='snackbar = false'>Close</v-btn>
  </v-snackbar>
</template>
<script>
const TYPES = ['success', 'info', 'warning', 'error']

export default {
  props: {
    msg: String,
    type: {
      type: String,
      default: 'info',
      validator: v => TYPES.includes(v)
    }
  },
  data () {
    return {
      snackbar: false,
      TYPE_TO_ICON: {
        success: 'check_circle',
        info: 'info',
        warning: 'warning',
        error: 'error'
      }
    }
  },
  created () {
    this.snackbar = !!this.msg
  },
  watch: {
    msg (nv) {
      this.snackbar = true
    }
  }
}
</script>
