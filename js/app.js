const MAX_ROWS_NUMBERS = 20;


//------------- oldal betöltése -------------
$(function () {
    fetchEmployeeData();
});

//------------- dolgozói adatok lekérdezése kliens oldalról  -------------
function fetchEmployeeData () {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=fetch",
        dataType: "json",
        cache: false,
        success: function (data) {
            //------------- visszakapott dolgozói adatok megjelenítése -------------
            $.each(data, function (index, value) {
                $('#my-table').append(`<tr><td class="table-primary">${value.first_name}</td></tr>`);
            })

            paginateMaxNumberOfRows();
        }
    })
}

//------------- oldalak lapszámozása -------------
function paginateMaxNumberOfRows () {
    $('#data').after ('<div id="nav"></div>');
    let rowsShown = MAX_ROWS_NUMBERS;
    let rowsTotal = $('#data tbody tr').length;
    let numPages = rowsTotal/rowsShown;
    for (let i = 0;i < numPages;i++) {
        let pageNum = i + 1;
        $('#nav').append ('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#data tbody tr').hide();
    $('#data tbody tr').slice (0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function() {
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        let currPage = $(this).attr('rel');
        let startItem = currPage * rowsShown;
        let endItem = startItem + rowsShown;
        $('#data tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });

}