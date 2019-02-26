<template>
  <transition name='v-snack-transition'>
    <div v-show='isActive' class='v-snack' :class='classes' :on='$listeners'>
      <div class='v-snack__wrapper' :style='setBackgroundColor(color, {}).style'>
        <div class='v-snack__content'>
          <v-icon :color='type' class='mr-3' medium>{{TYPE_TO_ICON[type]}}</v-icon>
          {{msg}}
          <v-btn color='pink' flat @click='onClose'>Close</v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { VSnackbar } from 'vuetify/lib'
import { EventBus } from './event_bus'

export default {
  name: 'Notify',
  extends: VSnackbar,
  data () {
    return {
      type: 'info',
      msg: '',
      TYPE_TO_ICON: {
        success: 'check_circle',
        info: 'info',
        warning: 'warning',
        error: 'error'
      }
    }
  },
  methods: {
    notify (data = {}) {
      if (!data.msg) return
      this.onClose()
      this.msg = data.msg
      this.type = data.type || 'info'
      // watch on this.isActive will trigger this.setTimeout()
      this.$nextTick(() => (this.isActive = true))
    },
    onClose () {
      this.isActive = false
      window.clearTimeout(this.activeTimeout)
    },
    setTimeout () {
      if (!this.isActive) return
      this.activeTimeout = window.setTimeout(this.onClose, this.timeout)
    }
  },
  created () {
    EventBus.$on('show', this.notify)
  }
}
</script>
