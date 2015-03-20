(function($) {
  $.fn.cart = function(options){
    var cart_view = this;
    var defaults = {
      item: 'item',
      name: 'name',
      code: 'code',
      price: 'price',
      add_to_cart: 'add_to_cart',
      cart_item: 'item',
      quantity: 'quantity',
      cals: 'cals',
      total: 'total'
    };
    var settings = $.extend(defaults, options);

    // セレクタの生成helper
    var ss = function(selecter_str){
      return('.' + selecter_str);
    }

    var cart_cals_line = $(cart_view.find(ss(settings.cals))[0]);
    var cart_item_line = $(cart_view.find(ss(settings.item))[0]);
    var cart_cals_base = cart_item_line.parent();

    var cart_items = [];

    var show_cart = function(items){
      $(cart_view.find(ss(settings.cals))).remove();
      $(cart_view.find(ss(settings.item))).remove();
      var total = 0;
      for(var i = 0; i < items.length; i++){
        var this_item = cart_item_line.clone();
        this_item.find(ss(settings.name)).text(items[i].name);
        this_item.find(ss(settings.code)).text(items[i].code);
        this_item.find(ss(settings.price)).text(items[i].price);
        this_item.find(ss(settings.quantity)).text(1);
        total += parseInt(items[i].price);
        cart_cals_base.append(this_item);
      }
      this_item = cart_cals_line.clone();
      this_item.find(ss(settings.total)).text(total);
      cart_cals_base.append(this_item);
    }

    $(ss(settings.item)).each(function(){
        var item_view = $(this);
        item_view.find(ss(settings.add_to_cart)).click(function(){
          cart_items.push({
            name: item_view.find(ss(settings.name)).text(),
            code: item_view.find(ss(settings.code)).text(),
            price: item_view.find(ss(settings.price)).text()
          });
          show_cart(cart_items);
        });
    });

    show_cart(cart_items);
    return(this);
  };
})(jQuery);