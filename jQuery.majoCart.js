(function($) {
  $.fn.cart = function(options){
    // オブジェクト本体の参照を保存
    var cart_view = this;
    var baseup = 1000;

    var defaults = {
      item: 'item',
      name: 'name',
      code: 'code',
      price: 'price',
      add_to_cart: 'add_to_cart',
      cart_item: 'item',
      quantity: 'quantity',
      delete_btn: 'delete',
      cals: 'cals',
      total: 'total',
      form_path: '/order.html',
      form_method: 'post'
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

    // カート内容をクッキーに保存
    var save_cart = function(){
      $.cookie("majoCart", JSON.stringify(cart_items), { expires: 7 });
    }

    // カート内容からロード
    var load_cart = function(){
      return JSON.parse($.cookie('majoCart'));
    }

    // カートの表示
    var show_cart = function(){
//      alert("aaa");
      $(cart_view.find(ss(settings.cals))).remove();
      $(cart_view.find(ss(settings.item))).remove();
      var total = 0;
      for(var i = 0; i < cart_items.length; i++){
        var this_item = cart_item_line.clone();
        this_item.find(ss(settings.name)).text(cart_items[i].name);
        this_item.find(ss(settings.code)).text(cart_items[i].code);
        this_item.find(ss(settings.price)).text(cart_items[i].price / baseup);
        this_item.find(ss(settings.delete_btn)).data('code',cart_items[i].code);
        this_item.find(ss(settings.delete_btn)).click(function(){
          for(var j = 0; j < cart_items.length; j++){
            if(cart_items[j].code == $(this).data('code')){
              cart_items.splice(j,1);
              break;
            }
          }
          show_cart();
        });
        this_item.find(ss(settings.quantity)).text(cart_items[i].quantity);
        total += cart_items[i].price * cart_items[i].quantity;
        cart_cals_base.append(this_item);
      }
      this_item = cart_cals_line.clone();
      this_item.find(ss(settings.total)).text(total / baseup);
      cart_cals_base.append(this_item);
      save_cart(cart_items);
    }

    // カートに入っているアイテムの保管場所
    var cart_items = load_cart() || [];

    // アイテムのカートボタンへのアクションを登録
    $(ss(settings.item)).each(function(){
        var item_view = $(this);
        item_view.find(ss(settings.add_to_cart)).click(function(){
          var chk_flg = true;
          var o = {
            name: item_view.find(ss(settings.name)).text(),
            code: item_view.find(ss(settings.code)).text(),
            quantity: 1,
            price: parseFloat(item_view.find(ss(settings.price)).text()) * baseup
          }
          for(var j = 0; j < cart_items.length; j++){
            if(cart_items[j].code == o.code){
              // console.log(o.quantity + ':' + cart_items[j].quantity)
              cart_items[j].quantity += o.quantity;
              chk_flg = false;
              break;
            }
          }
          if(chk_flg){
            cart_items.push(o);
          }
          show_cart();
        });
    });

    show_cart();
    return(this);
  };
})(jQuery);

