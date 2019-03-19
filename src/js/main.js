let products = [
  {
    title: 'Maggi 5 Minuten Terrine Kartoffelbrei',
    price: 0.44
  },
  {
    title: 'Gourmet Gold Feine Pastete mit Rind',
    price: 1.25
  },
  {
    title: 'Meister Jagdwurst',
    price: 5.79
  },
  {
    title: 'Johnnie Walker Red Label 40%',
    price: 8.1
  },
  {
    title: 'Salatgurken, Stück',
    price: 0.38
  },
  {
    title: 'Fussballbrötchen 3er',
    price: 1.79
  },
  {
    title: 'Donuts gezuckert 4 Stück',
    price: 3.99
  },
  {
    title: 'Géramont Classic, 60% Fett i. Tr.',
    price: 2.49
  },
  {
    title: 'Hipp Bio Kindermilch trinkfertig',
    price: 1.99
  },
  {
    title: 'Deli Reform Das Original rein pflanzlich, 80% Fett',
    price: 1.49
  },
  {
    title: 'Fol Epi Classic Nussig-mild',
    price: 2.49
  },
  {
    title: 'Hipp Bio Tee & Saft Fencheltee mit Apfel',
    price: 0.99
  },
  {
    title: 'Becel classic',
    price: 2.19
  },
  {
    title: 'Deli Reform Zwiebelschmalz mit',
    price: 1.45
  }
]

function productToCart (productId, count) {
  let $cartContainer = $('.cart-container')
  let $cartContent = $cartContainer.find('.cart-content')
  let foundItem = $cartContent.find('.items .item[data-product-id="' + productId + '"]')
  let product = products[productId]
  let price = (product.price * count).toFixed(2)
  price = (price + '').split('.')

  if (count) {
    if ($cartContent.find('.no-item').hasClass('visible')) {
      $cartContent.find('.no-item').removeClass('visible')
      $cartContainer.find('.footer').addClass('visible')
    }

    if (foundItem.length) {
      foundItem.find('.count').text('x' + count)
      foundItem.find('.price span:not(.currency)').text(price[0])
      foundItem.find('.price sup').text(price[1])
    } else {
      $cartContent.find('.items').append(
        $('<div>')
          .addClass('item')
          .attr('data-product-id', productId)
          .append(
            $('<i>')
              .addClass('far fa-trash-alt remove-item-button')
              .on('click', function () {
                let currentItem = $(this).closest('.item')
                let relatedProduct = $('.product-list .product[data-product-id="' + currentItem.attr('data-product-id') + '"]')

                currentItem.remove()

                if (relatedProduct.length) {
                  relatedProduct.find('.actions .count').text('0')
                  relatedProduct.find('.actions .remove-from-card-button, .actions .count').removeClass('visible')
                }

                if (!$cartContent.find('.items .item').length) {
                  if (!$cartContent.find('.no-item').hasClass('visible')) {
                    $cartContent.find('.no-item').addClass('visible')
                    $cartContainer.find('.footer').removeClass('visible')
                  }
                }

                updateCartTotalPrice()
              })
          )
          .append(
            $('<div>')
              .addClass('title')
              .text(product.title)
          )
          .append(
            $('<div>')
              .addClass('count')
              .text('x1')
          )
          .append(
            $('<div>')
              .addClass('price')
              .append(
                $('<span>')
                  .addClass('currency')
                  .text('$')
              )
              .append($('<span>').text(price[0]))
              .append($('<sup>').text(price[1]))
          )
      )
    }
  } else {
    if (foundItem.length) {
      foundItem.remove()
    }

    if (!$cartContent.find('.items .item').length) {
      if (!$cartContent.find('.no-item').hasClass('visible')) {
        $cartContent.find('.no-item').addClass('visible')
        $cartContainer.find('.footer').removeClass('visible')
      }
    }
  }

  updateCartTotalPrice()
}

function updateCartTotalPrice () {
  let $cartContainer = $('.cart-container')
  let $cartContent = $cartContainer.find('.cart-content')
  let totalPrice = 0

  $cartContent.find('.items .item').each(function () {
    totalPrice += parseFloat(
      $(this)
        .find('.price span:not(.currency)')
        .text() +
        '.' +
        $(this)
          .find('.price sup')
          .text()
    )
  })

  $cartContainer.find('.footer .total-price').text('total: $ ' + totalPrice.toFixed(2))
}

$(function () {
  $('.ingredient-list .item .title').on('click', function (e) {
    let $parent = $(e.target).closest('.item')
    let $list = $parent.parent()
    let $icon = $parent.find('.item-arrow')
    let $content = $parent.find('.content')

    if (!$content.hasClass('visible')) {
      $icon.addClass('rotated')

      $content.animate(
        {
          marginTop: 10,
          height: $content.find('.product-list').height(),
          opacity: 1
        },
        500,
        function () {
          $(this).addClass('visible')
          $(this).removeAttr('style')
        }
      )

      $list.find('.item .item-arrow').each(function () {
        if ($(this)[0] !== $icon[0]) {
          $content = $(this)
            .closest('.item')
            .find('.content')
          $(this).removeClass('rotated')

          if ($content.hasClass('visible')) {
            $content.animate(
              {
                marginTop: 0,
                height: 0,
                opacity: 0
              },
              500,
              function () {
                $(this).removeClass('visible')
                $(this).removeAttr('style')
              }
            )
          }
        }
      })
    } else {
      $icon.removeClass('rotated')
      $content.animate(
        {
          marginTop: 0,
          height: 0,
          opacity: 0
        },
        500,
        function () {
          $(this).removeClass('visible')
          $(this).removeAttr('style')
        }
      )
    }
  })

  $('.add-to-card-button').on('click', function () {
    let $product = $(this).closest('.product')
    let productId = parseInt($product.attr('data-product-id'))
    let $parent = $(this).parent()
    let $count = $parent.find('.count')
    let count = parseInt($count.text())

    if (!count) {
      $(this)
        .parent()
        .find('.remove-from-card-button, .count')
        .addClass('visible')
    }

    count++

    $count.text(count + ' ' + (count === 1 ? 'pc' : 'pcs'))
    productToCart(productId, count)
  })

  $('.remove-from-card-button').on('click', function () {
    let $product = $(this).closest('.product')
    let productId = parseInt($product.attr('data-product-id'))
    let $parent = $(this).parent()
    let $count = $parent.find('.count')
    let count = parseInt($count.text()) - 1

    if (!count) {
      $(this)
        .parent()
        .find('.remove-from-card-button, .count')
        .removeClass('visible')
    }

    $count.text(count + ' ' + (count === 1 ? 'pc' : 'pcs'))
    productToCart(productId, count)
  })

  $('.cart-button').on('click', function () {
    if (!$('.cart-container').hasClass('visible')) {
      $(this).animate(
        {
          right: 234
        },
        200
      )
      $('.cart-container').animate(
        {
          right: -1
        },
        200,
        function () {
          $(this).addClass('visible')
          $(this).removeAttr('style')
        }
      )
    } else {
      $(this).animate(
        {
          right: 15
        },
        200,
        function () {
          $(this).removeAttr('style')
        }
      )
      $('.cart-container').animate(
        {
          right: -220
        },
        200,
        function () {
          $(this).removeClass('visible')
          $(this).removeAttr('style')
        }
      )
    }
  })
})
