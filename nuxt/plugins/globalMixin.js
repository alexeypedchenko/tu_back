import Vue from 'vue'
import {mapState} from 'vuex'
// import {mapGetters} from 'vuex'

Vue.mixin({
  computed: {
    ...mapState('auth', ['user'],),
  },
  methods: {
  },
})