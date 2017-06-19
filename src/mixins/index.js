export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    backs () {
      if (this.$router) {
        this.$router.back()
      }
    },
    jumpLg () {
      window.truckhomeAccountBinding.show()
    },
    getCookie (name) {
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return ''
      }
    }
  }
}
