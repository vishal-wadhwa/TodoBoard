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
      <span class='title font-weight-light font-italic white--text'>{{fullname}}</span>
      <v-btn fab small flat href='https://github.com/vishal-wadhwa' target='_blank' class='mr-0'>
        <v-avatar size='20px'>
          <img :src='require("@/assets/img/github-logo.png")' alt='github'>
        </v-avatar>
      </v-btn>
      <v-btn fab small flat title='Log Out' class='ml-0' @click='ev => $emit("tb:log-out", ev)'>
        <v-icon color='white'>power_settings_new</v-icon>
      </v-btn>
    </slot>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    title: String,
    fullname: String
  }
}
</script>
<style lang="stylus" scoped>
</style>
