const MAX_ROWS_NUMBERS = 20;


//------------- oldal betöltése -------------
$(function () {
    fetchEmployeeData();
});

//------------- dolgozói adatok elkérése kliens oldalról  -------------
function fetchEmployeeData () {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=fetch",
        dataType: "json",
        cache: false,
        success: function (data) {
            //------------- visszakapott dolgozói adatok megjelenítése -------------

            renderEmployeeDataRows(data);
            paginateMaxNumberOfRows();
        }
    })
}

//------------- dolgozói adatsorok megjelenítése -------------
function renderEmployeeDataRows (data) {
    $.each(data, function (index, value) {
        $('#my-table')
            .append(`
                    <tr>
                        <td class="table-primary">${value.emp_no}</td>                        
                        <td class="table-primary">${value.full_name}</td>
                        <td class="table-primary">${value.birth_date}</td>
                        <td class="table-primary">${value.gender}</td>
                        <td class="table-primary">${value.salary}</td>
                        <td class="table-primary">${value.dept_name}</td>
                    </tr>
                    `);
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