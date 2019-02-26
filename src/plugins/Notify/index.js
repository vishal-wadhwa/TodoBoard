import Notify from './Notify'
import { EventBus } from './event_bus'

const Notif = {
  install (Vue, args = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = args

    Vue.component(args.componentName || 'notify', Notify)

    const notify = (params) => {
      if (typeof params === 'object') {
        EventBus.$emit('show', params)
      }
    }

    const name = args.name || 'notify'

    Vue.prototype['$' + name] = notify
    Vue[name] = notify
  }
}

export default Notif
