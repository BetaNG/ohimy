class Admin::ProductsController < AdminController
  def index
    @products = Product.all
  end
end
