define(['jquery', 'ravenjs'], function ($) {

    return {
        jsonPost: function (url, data) {
            return $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            });
        }
    };
});
