<template>
  <v-toolbar app fixed clipped-left>
    <slot name='toolbar-icon'></slot>
    <slot name='toolbar-heading'>
      <v-toolbar-title class='headline text-uppercase'>
        <span>{{title}}</span>
      </v-toolbar-title>
    </slot>
    <v-spacer/>
    <slot name='toolbar-content-right'></slot>
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
