const MAX_ROWS_NUMBERS = 20;


//------------- dolgozói adatok betöltése funkció meghívása oldal betöltésekor -------------
$(function () {
    fetchEmployeeData();

});

//-------------  adat frissítés funkció meghívása szerkesztéskor-------------
$(document).on('blur', '.editable', function () {
    let employeeId = this.getAttribute('employeeId');
    let fieldValue = $(this).text();
    let fieldName = this.getAttribute('fieldName')
    updateEmployeeData(employeeId, fieldName, fieldValue);

});

//------------- dolgozói adatok lekérése funkció-------------
function fetchEmployeeData() {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=fetch",
        dataType: "json",
        cache: false,
        success: function (data) {
            //------------- dolgozói adatok megjelenítése funkció meghívása-------------
            renderEmployeeDataRows(data);
            //------------- oldalak lapszámozása funkció meghívása-------------
            paginateMaxNumberOfRows();
        }
    })
}

//------------- dolgozói adatsorok megjelenítése funkció-------------
function renderEmployeeDataRows(data) {
    $.each(data, function (index, value) {
        $('#my-table')
            .append(`
                    <tr>
                        <td class="emp_no table-secondary">${value.emp_no}</td>                        
                        <td class="last_name table-light editable" contenteditable="true" fieldName="last_name" employeeId="${value.emp_no}">${value.last_name}</td>
                        <td class="first_name table-light editable" contenteditable="true" fieldName="first_name" employeeId="${value.emp_no}">${value.first_name}</td>
                        <td class="birth_date table-light editable" contenteditable="true" fieldName="birth_date" employeeId="${value.emp_no}">${value.birth_date}</td>
                        <td class="gender table-secondary">${value.gender}</td>
                        <td class="gender table-secondary">${value.title}</td>
                        <td class="salary table-secondary">${value.salary}</td>
                        <td class="dept_name table-secondary">${value.dept_name}</td>                        
                        <td class="table-light"><button name="btn_delete" id="btn_delete">Törlés</button></td>
                    </tr>
                    `);
    });
}


//------------- oldalak lapszámozása funkció-------------
function paginateMaxNumberOfRows() {
    $('#data').after('<div id="nav"></div>');
    let rowsShown = MAX_ROWS_NUMBERS;
    let rowsTotal = $('#data tbody tr').length;
    let numPages = rowsTotal / rowsShown;
    for (let i = 0; i < numPages; i++) {
        let pageNum = i + 1;
        $('#nav').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#data tbody tr').hide();
    $('#data tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function () {
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        let currPage = $(this).attr('rel');
        let startItem = currPage * rowsShown;
        let endItem = startItem + rowsShown;
        $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).css('display', 'table-row').animate({opacity: 1}, 300);
    });
}


//------------- dolgozói adat frissítés funkció-------------
function updateEmployeeData(employeeId, fieldName, fieldValue) {
    $.ajax({
        method: "POST",
        url: "contents/employeeListHandler.php?req=update",
        data: {employeeId: employeeId, fieldName: fieldName, fieldValue: fieldValue},
        dataType: "text",
        success: function (data) {
        }
    })
}