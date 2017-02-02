function getData(page){
    var ajaxUrl = 'http://app.alidiscovery.ru/api/products';
    if (page){
        ajaxUrl = ajaxUrl + "?page=" + page;
        $('.cssload-container').show();
    }
    $.ajax({
        url:ajaxUrl,
        type:"GET",
        dataType:"json",
        success:function (json) {
            var productsArray = json.data;
            var index_of_max_price = 0;
            var productCount = productsArray.length;
            window.max_page = json.meta.pagination.total;
            for(key in productsArray){
                if(key < productCount-1){
                    var nextIndex = parseInt(key) + 1;
                    if (productsArray[nextIndex].price > productsArray[index_of_max_price].price){
                        index_of_max_price = parseInt(key) + 1;
                    }
                }
            }
            var cutElem = productsArray.splice( index_of_max_price, 1 )
            productsArray.unshift(cutElem[0]);


            var pagination_page = json.meta.pagination.current_page;
            var $productsRow = $('.products-row');
            window.Current__page = pagination_page;
            for (key in productsArray) {
                //products_Array
                var productObj = productsArray[key];
                var $block = $('<div class="col-md-4 thumbnail" />');
                //image
                var $image_block = $('<div class="image_block" />');
                var $image = $('<img class="image" />');
                $image.attr('src',productObj.images[0]);
                $image_block.append($image);
                $block.append($image_block);
                //link
                var $link =$('<a class="link" />');
                $link.attr('href',productObj.link);
                $link.attr('target','_blank');
                $block.append($link);
                //title
                var $title = $('<p class="title" />');
                $title.text(productObj.title);
                $link.append($title);
                //description
                // var $description = $('<p class="description" />');
                //$title.text(productObj.description);
                //$block.append($description);
                //price
                var $price = $('<p class="price"/>');
                $price.text("Цена: " + productObj.price);
                $block.append($price);
                //discount
                var $discount = $('<p class="discount"/>');
                $discount.text("Скидка: " + productObj.discount + "%");
                $block.append($discount);
                //count_fav_rep
                var $count_wrapper = $('<div class="count_wrapper"/>');
                $block.append($count_wrapper);
                //count_fav
                var $count_fav = $('<div class="count_fav"/>');
                $count_wrapper.append($count_fav);
                $count_fav.text("добавленно в избранное: " + productObj.count_favorites);
                if (productObj.count_favorites == null){
                    $count_fav.text("добавленно в избранное: " + "0");
                }
                //count_rep
                var $count_reposts = $('<div class="count_reposts"/>');
                $count_wrapper.append($count_fav);
                $count_reposts.text("Репосты " + productObj.count_reposts);
                //wrapper
                $(document).ready($productsRow.append($block));
                $('.cssload-container').hide();
            }

        }

    });
};
getData(false);
$(document).ready(function() {
    var win = $(window);
    win.scroll(function () {
        if(max_page > Current__page) {
            if ($(document).height() - win.height() == win.scrollTop()) {
                getData(Current__page + 1);
            }
        }
    });
});

