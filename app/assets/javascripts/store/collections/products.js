Spree.Collections.Products = PaginatedCollection.extend({
  model: Spree.Models.Product,
  baseUrl: '/api/products',
  per_page: 8,
  collection_name: 'products',

  resetWithPagination: function(paginatedProducts) {
    this.parse(paginatedProducts);
    this.reset_pages();
    this.page_info();
    this.reset(paginatedProducts.products);
  }
});
