jQuery ->
  $('.items li a').on 'click', ->
    $this = $(this)
    itemId = $this.data('id')
    $content = $('.content')
    $.get "/items/#{itemId}", (html) ->
      $content.html(html)
