$(document).ready(function() {

  /* sum function for individual items */
  var total = 0;
  function sum () {
    var prices = $('.item-price');
    var quantity = $('.quantity');
    /* turn quantity into an integer, multiply by price, add to sum */
    for (i = 0; i < quantity.length; i++) {
      var price = Number($(prices[i]).text().replace(/\$/,""));
      var subtotal = (Number($(quantity[i]).val())) * price;
      if (subtotal != 0) {
        $($('.item-subtotal')[i]).text("$" + subtotal);
      } else {
        $($('.item-subtotal')[i]).text("$");
      }
      total += subtotal;
    };
    $('#cart-subtotal').text("$" + total);
    return total;
  };
  /* tax & cart total functions */
  function calcTax (total) {
    var gst = (total * 0.05) - total;
    $('#gst').text("$ " + gst);
  };
  function cartTotal () {
    var totalWithTax = total + gst;
    $('#cart-total').text("$ " + totalWithTax);
  };


  /* add new item */
  function addItem (name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $('#cart').prepend('<div class="row item"> \
      <div class="item-name col-xs-3"> \ '
      +  name + '\
      </div> \
      <div class="item-price col-xs-3"> \
        $' + cost + '.00 \
      </div> \
      <div class="item-qty col-xs-3"> \
        <label>QTY</label> \
        <input class="quantity"> \
      </div> \
      <div class="item-subtotal col-xs-2"> \
      $ \
      </div> \
      <div class="col-xs-1"> \
        <button class="remove"> \
          <i class="fas fa-trash"></i> \
        </button> \
      </div> \
    </div>');
  };

  /* event handlers */
  $(document).on('click', '#add', function() {
    addItem($('#name').val(), $('#cost').val());
  });

  $(document).on('click', '.remove', function() {
    $(this).parents('.row').remove();
    sum();
  });

  $(document).on('keyup', '.quantity', function() {
    sum();
  });

  $(document).on('keydown', '#cost', function(e) {
    if (e.which == 13) { // when user presses enter key
      addItem($('#name').val(), $('#cost').val());
      calcTax();
      cartTotal();
    };
  });

});
