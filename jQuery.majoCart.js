(function($) {
  $.fn.cart = function(options){
    // オブジェクト本体の参照を保存
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

    // カートの計算行
    var cart_cals_line = $(cart_view.find(ss(settings.cals))[0]);
    // カートのアイテム行
    var cart_item_line = $(cart_view.find(ss(settings.item))[0]);
    // カートの表示元タグ
    var cart_cals_base = cart_item_line.parent();

    // カートには入っているアイテムの保管場所
    var cart_items = [];

    // カートの表示
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
        total += parseFloat(items[i].price);
        cart_cals_base.append(this_item);
      }
      this_item = cart_cals_line.clone();
      this_item.find(ss(settings.total)).text(total);
      cart_cals_base.append(this_item);
    }

    // アイテムのカートボタンへのアクションを登録
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