<template>
  <!--
  Simple wrapper component for vue file pond with all needed props preset.
  -->
  <file-pond
    image-validate-size-min-width='10'
    image-validate-size-min-height='10'
    label-idle='<span class="filepond--label-action">Upload</span> a profile picture'
    max-file-size='1MB'
    name='profile-pic'
    ref='ppic'
    style-panel-layout='compact circle'
    style-load-indicator-position='center bottom'
    style-progress-indicator-position='right bottom'
    style-button-process-item-position='right bottom'
    style-button-remove-item-position='center bottom'
    :accepted-file-types='["image/jpeg", "image/png"]'
    :files='imgs'
    :image-preview-height='height - 10'
    :image-resize-target-width='height'
    :image-resize-target-height='height'
    :server='serverConfig'
    @error='onError'
    @warning='onWarning'
  />
</template>
<script>
import vueFilePond from 'vue-filepond'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'

const FilePond = vueFilePond(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageValidateSize)

export default {
  components: {
    FilePond
  },
  props: {
    defaultImageSrc: String,
    height: {
      type: [String, Number],
      default: 200
    },
    serverConfig: Object
  },
  data () {
    return {
      imgs: []
    }
  },
  methods: {
    onError (err, file, opts) {
      file.abortLoad()
      file.abortProcessing()
      this.$refs['ppic'].removeFile(file.id)
      this.$emit('pp:error', `Error ${err.code}: ${err.body}.`)
    },
    onWarning (err, file, opts) {
      file.abortLoad()
      file.abortProcessing()
      this.$refs['ppic'].removeFile(file.id)
      this.$emit('pp:warning', `Error ${err.code}: ${err.body}.`)
    }
  },
  created () {
    if (this.defaultImageSrc) this.imgs.push(this.defaultImageSrc)
  }
}
</script>
<style lang="stylus">
.filepond--drop-label {
  color: #4c4e53;
}

.filepond--label-action {
  text-decoration-color: #babdc0;
}

.filepond--panel-root {
  background-color: #edf0f4;
}

.filepond--root {
  width: 200px;
  margin: 0 auto;
  border: 1px dashed black;
}
</style>
