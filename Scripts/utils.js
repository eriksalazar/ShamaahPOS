function priceFormatter(value) {
    // 16777215 == ffffff in decimal
    var color = '#' + Math.floor(Math.random() * 6777215).toString(16);
    return '<div  style="color: ' + color + '">' +
            '<i class="glyphicon glyphicon-usd"></i>' +
            value.substring(1) +
            '</div>';
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}