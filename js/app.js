const MAX_ROWS_NUMBERS = 20;


//------------- oldal betöltése -------------
$(function () {
    fetchEmployeeData();

});

//------------- szerkeszthető mező frissítése -------------
$(document).on('blur','.editable',function () {
    console.log( "Handler for on.blur called." );
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
                        <td class="emp_no table-secondary">${value.emp_no}</td>                        
                        <td class="last_name table-light editable" contenteditable="true">${value.last_name}</td>
                        <td class="first_name table-light editable" contenteditable="true">${value.first_name}</td>
                        <td class="birth_date table-secondary">${value.birth_date}</td>
                        <td class="gender table-secondary">${value.gender}</td>
                        <td class="gender table-secondary">${value.title}</td>
                        <td class="salary table-secondary">${value.salary}</td>
                        <td class="dept_name table-secondary">${value.dept_name}</td>                        
                        <td class="table-light"><button name="btn_delete" id="btn_delete">Törlés</button></td>
                    </tr>
                    `);
    });


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

function updateEmployeeData(employeeId, fieldName, fieldValue) {
$.ajax({
    method: "POST",
    url: "contents/employeeListHandler.php?req=update",
    data: {employeeId: employeeId, fieldName: fieldName, fieldValue: fieldValue },
    dataType: "text",
    success: function (data) {
        alert(data);
    }
})
}