const MAX_ROWS_NUMBERS = 20;
let order ='asc';

//------------- dolgozói adatok betöltése funkció meghívása oldal betöltésekor -------------
$(function () {
    fetchEmployeeData('emp_no');

});

//-------------  adat frissítés funkció meghívása szerkesztéskor-------------
$(document).on('blur', '.editable', function () {
    let employeeId = this.getAttribute('employeeId');
    let fieldValue = $(this).text();
    let fieldName = this.getAttribute('fieldName')
    updateEmployeeData(employeeId, fieldName, fieldValue);

});

//-------------  törlési funkció meghívása törlés gombra -------------
$(document).on('click', '.btn_delete', function () {
    let answer = confirm("Biztosan ki akarod törölni?");
    if (answer) {
        deleteEmployee(this.getAttribute('employeeId'));
        //-------- elrejtés felületen is --------
        $(this).parent().parent().addClass('hide');
/*        fetchEmployeeData();*/
    }

});
//-------------  rendezés fejléc adatokra kattitntva -------------
$(document).on('click','.orderingClass', function (){
    fetchEmployeeData(this.getAttribute('fieldType'));
});

//------------- dolgozói adatok lekérése funkció-------------
function fetchEmployeeData(sortingValue) {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=fetch",
        dataType: "json",
        cache: false,
        success: function (data) {
            //-------------- adatok rendezése ----------------------------------------
            data = order === 'asc' ? sortArrayAsc(data,sortingValue) : sortArrayDesc(data,sortingValue);
            order = order === 'asc' ? 'desc' : 'asc';
            //------------- dolgozói adatok megjelenítése funkció meghívása-------------
            renderEmployeeDataRows(data);
            //------------- oldalak lapszámozása funkció meghívása-------------
            paginateMaxNumberOfRows();
        }
    })
}

//------------- dolgozói adatsorok megjelenítése funkció-------------
function renderEmployeeDataRows(data) {
    $("#my-table tr").remove();
    $.each(data, function (index, value) {
        $('#my-table')
            .append(`
                    <tr>
                        <td class="table-secondary">${value.emp_no}</td>                        
                        <td class="table-light editable" contenteditable="true" fieldName="last_name" employeeId="${value.emp_no}">${value.last_name}</td>
                        <td class="table-light editable" contenteditable="true" fieldName="first_name" employeeId="${value.emp_no}">${value.first_name}</td>
                        <td class="table-light editable" contenteditable="true" fieldName="birth_date" employeeId="${value.emp_no}">${value.birth_date}</td>                        
                        <td class="table-light editable" contenteditable="true" fieldName="hire_date" employeeId="${value.emp_no}">${value.hire_date}</td>
                        <td class="table-secondary">${value.gender}</td>
                        <td class="table-secondary">${value.title}</td>
                        <td class="table-secondary">${value.salary}</td>
                        <td class="table-secondary">${value.dept_name}</td>     
                        <td class="table-secondary">${value.to_date}</td>                   
                        <td class="table-light"><button name="btn_delete" class="btn_delete" employeeId="${value.emp_no}">Törlés</button></td>
                    </tr>
                    `);
    });
}


//------------- oldalak lapszámozása funkció-------------
function paginateMaxNumberOfRows() {
    $("#nav").remove();
    $('#data').after('<div id="nav"></div>');
    let rowsShown = MAX_ROWS_NUMBERS;
    let rowsTotal = $('#data tbody tr').length;
    let numPages = rowsTotal / rowsShown;
    for (let i = 0; i < numPages; i++) {
        let pageNum = i + 1;
        $('#nav').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#data tbody tr').filter(':not(.hide)').hide();
    $('#data tbody tr').filter(':not(.hide)').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function () {
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        let currPage = $(this).attr('rel');
        let startItem = currPage * rowsShown;
        let endItem = startItem + rowsShown;
        $('#data tbody tr').filter(':not(.hide)').css('opacity', '0.0').hide().slice(startItem, endItem).css('display', 'table-row').animate({opacity: 1}, 300);
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
            console.log('Employee db update was successfully called.');
        }
    })
}

//------------- dolgozó törlése funkció-------------
function deleteEmployee(employeeId) {
        $.ajax({
            method: "POST",
            url: "contents/employeeListHandler.php?req=delete",
            data: {employeeId: employeeId},
            dataType: "text",
            success: function (data) {
                console.log('Employee db delete was successfully called.');
            }
        })
}

//------------- rendezés növekvő sorrendben-------------
function sortArrayAsc(objects, fieldName) {
    return objects.sort((a,b) => (a[fieldName] > b[fieldName]) ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0));
}
//------------- rendezés csökkenő sorrendben-------------
function sortArrayDesc(objects, fieldName) {
    return objects.sort((a,b) => (a[fieldName] < b[fieldName]) ? 1 : ((b[fieldName] < a[fieldName]) ? -1 : 0));
}


