var appId = 'f8b82b988a70d286e363bfc13958bb645abca3270089c5aeb21f0b6f28c91d10'

Vue.component('pagination', {
  template: '#pagination-template',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2
    }
  },
  computed: {
    pages: function() {
      var pages = []

      for(var i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },
    rangeStart: function() {
      var start = this.current - this.pageRange

      return (start > 0) ? start : 1
    },
    rangeEnd: function() {
      var end = this.current + this.pageRange

      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages: function() {
      return Math.ceil(this.total/this.perPage)
    },
    nextPage: function() {
      return this.current + 1
    },
    prevPage: function() {
      return this.current - 1
    }
  },
  methods: {
    hasFirst: function() {
      return this.rangeStart !== 1
    },
    hasLast: function() {
      return this.rangeEnd < this.totalPages
    },
    hasPrev: function() {
      return this.current > 1
    },
    hasNext: function() {
      return this.current < this.totalPages
    },
    changePage: function(page) {
      this.$emit('page-changed', page)
    }
  }
})

new Vue({
  el: '#app',
  data: {
    photos: [],
    totalPhotos: 0,
    perPage: 9,
    currentPage: 1
  },
  methods: {
    fetchPhotos: function(page) {
      var options = {
        params: {
          client_id: appId,
          page: page,
          per_page: this.perPage
        }
      }

      this.$http.get('https://api.unsplash.com/photos', options).then(function(response) {

        this.photos = response.data

        this.totalPhotos = parseInt(response.headers.get('x-total'))

        this.currentPage = page

      }, console.log)
    }
  },
  created: function() {
    this.fetchPhotos(this.currentPage)
  }
})