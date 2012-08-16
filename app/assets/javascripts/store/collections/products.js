Spree.Collections.Products = PaginatedCollection.extend({
  model: Spree.Models.Product,
  per_page: 12,
  collection_name: 'products',

  resetWithPagination: function(paginatedProducts) {
    this.parse(paginatedProducts);
    this.reset_pages();
    this.page_info();
    this.reset(paginatedProducts.products);
  },

  url: function() {
    var url = '/api/products';

    if(this.taxon_id!=undefined){
      url += '/search?q[taxons_id_eq]=' + this.taxon_id + '&';
    }else{
      url += '?';
    }
    url += $.param({page: this.page});

   url = encodeURI(url);

    return url;
  }
});
