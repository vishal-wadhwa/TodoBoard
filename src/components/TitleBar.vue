<template>
  <v-toolbar app fixed clipped-left>
    <slot name='toolbar-icon'></slot>
    <slot name='toolbar-heading'>
      <v-toolbar-title class='headline text-uppercase'>
        <span>{{title}}</span>
      </v-toolbar-title>
    </slot>
    <v-spacer/>
    <slot name='toolbar-content-right'>
      <v-btn fab small flat title='Log Out' @click='ev => $emit("tb:log-out", ev)'>
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </slot>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="stylus" scoped>
</style>
