import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
dayjs.locale('ru')

import Vue from 'vue'
import {mapState} from 'vuex'

Vue.mixin({
  computed: {
    ...mapState('auth', ['user'],),
  },
  methods: {
    dataFormat(date) {
      const LLL = 'D.MM.YY, H:mm'
      return dayjs(date).locale(ru).format(LLL)
    },
    capitalize(str) {
      return str[0].toUpperCase() + str.slice(1)
    }
  },
})