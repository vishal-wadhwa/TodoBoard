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
      <v-speed-dial v-model='fab' direction='bottom'>
        <v-btn v-model='fab' slot='activator' small fab flat>
          <v-icon>more_vert</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-tooltip left :value='true' nudge-left='20' :close-delay='365*24*60*60*1000'>
          <v-btn
            fab
            dark
            small
            color='green'
            slot='activator'
            @click='ev => $emit("tb:create-list", ev)'
          >
            <v-icon>add</v-icon>
          </v-btn>Create new list
        </v-tooltip>
        <v-tooltip left :value='true' nudge-left='20' :close-delay='365*24*60*60*1000'>
          <v-btn
            fab
            dark
            small
            color='indigo'
            slot='activator'
            @click='ev => $emit("tb:create-board", ev)'
          >
            <v-icon>add</v-icon>
          </v-btn>Create new board
        </v-tooltip>
      </v-speed-dial>
    </slot>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      fab: false
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
