// there's a difference between this.length and this.count
//
// this.length is the number of models we have loaded
// this.count is the number of modeals that exist (on the server)
//
var PaginatedCollection = Backbone.Collection.extend({
  initialize: function() {
    this.on('add', this.reset_pages, this);
    this.on('remove', this.removed, this);
    this.page = 1;
  },

  parse: function(resp) {
    this.page = parseInt(resp.current_page);
    this.count = resp.count;
    this.pages = resp.pages;
    return resp[this.collection_name];
  },

  url: function() {
     return this.baseUrl + '?' + $.param({page: this.page});
  },

  page_info: function() {
    var info = {
      count: this.count,
      page: this.page,
      pages: this.pages,
      prev: false,
      next: false
    };

    if (this.page > 1) {
      info.prev = this.page - 1;
    }

    if (this.page < info.pages) {
      info.next = this.page + 1;
    }

    return info;
  },

  paged_models: function(){
    return this.models.slice(((this.page * this.per_page) - this.per_page), (this.page * this.per_page));
  },

  added: function(){
    this.count += 1;
    this.reset_pages();
  },

  removed: function(){
    this.count -= 1;
    this.reset_pages();
  },

  reset_pages: function(){
    this.pages = Math.ceil(this.count / this.per_page);
    this.page = Math.min(this.page, this.pages);
  },

  next_page: function() {
    if (!this.page_info().next) {
      return false;
    }
    this.page = this.page + 1;

    if(this.length<this.count){
      this.fetch({add: true});
    }else{
      this.trigger('paged');

    }
  },

  previous_page: function() {
    if (!this.page_info().prev) {
      return false;
    }
    this.page = this.page - 1;
    this.trigger('paged');
  }

});
