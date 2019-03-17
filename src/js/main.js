$(function () {
  $('.ingredient-list .item .title').on('click', function (e) {
    let $parent = $(e.target).closest('.item')
    let $list = $parent.parent()
    let $icon = $parent.find('i')
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

      $list.find('.item i').each(function () {
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
})
