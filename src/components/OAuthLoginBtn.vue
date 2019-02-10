<template>
  <span
    class='v-chip chip-wrapper ma-0'
    :style='{background: btnBg, color: textColor, border: `1px solid ${iconBg}`}'
    :title='title'
  >
    <v-avatar v-if='!!iconSrc' class='ma-0 pa-1' size='32' :style='{background: iconBg}'>
      <img :src='iconSrc' alt='login'>
    </v-avatar>
    &nbsp;{{title}}&nbsp;
  </span>
</template>
<script>
export default {
  props: {
    iconSrc: String,
    title: String,
    iconBg: { type: String, default: 'rgba(0, 0, 0, 0.15)' },
    btnBg: { type: String, default: 'rgba(0, 0, 0, 0.05)' },
    textColor: { type: String, default: 'black' }
  }
}
</script>
<style lang="stylus" scoped>
.chip-wrapper {
  max-width: 34px;
  max-height: 34px;
  overflow: hidden;
  transition: max-width ease 0.5s;
  cursor: pointer;

  &:hover {
    @media screen and (min-width: 600px) {
      max-width: 100%;
    }
  }
}
</style>
