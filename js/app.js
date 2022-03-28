//----------------alap értékek beállítása  -------------
const MAX_ROWS_NUMBERS = 20;
let order ='asc';
let sortingValue='emp_no';
let filteringName ='';
let filteringValue ='';
let pageNumber = 1;

//------------- dolgozói adatlekérés oldal betöltésekor -------------
$(function () {
    fetchEmployeeData();
});

//------------- oldal lapszámozása plugin beállítása -------------
$(function () {
    window.pagObj = $('#pagination').twbsPagination({
        totalPages: 500,
        visiblePages: 5,
        onPageClick: function (event, page) {
            pageNumber = page;
            fetchEmployeeData();
        }
    }).on('page', function (event, page) {
        console.info(page + ' (from event listening)');
    });
});


//-------------  dolgozói adat módosítása, 'editable' osztállyal rendelkező mező szerkesztése után-------------
$(document).on('blur', '.editable', function () {
    let employeeId = this.getAttribute('employeeId');
    let fieldValue = $(this).text();
    let fieldName = this.getAttribute('fieldName')
    updateEmployeeData(employeeId, fieldName, fieldValue);

});

//------------- dolgozó törlése, törlés gombra kattintva -------------
$(document).on('click', '.btn_delete', function () {
    let answer = confirm("Biztosan ki akarod törölni?");
    if (answer) {
        deleteEmployee(this.getAttribute('employeeId'));
        //-------- elrejtés felületen is --------
        $(this).parent().parent().addClass('hide');
    }

});
//-------------  dolgozók rendezése,'orderingClass' osztállyal rendelkező fejlécre kattintva -------------
$(document).on('click','.orderingClass', function (){
    sortingValue=this.getAttribute('fieldType');
    fetchEmployeeData();
});

//-------------  'filter...' szöveg eltávolítása 'filteringClass' osztállyal rendelkező fejléc mező mezőre kattintva-------------
$(document).on('click','.filteringClass', function (){
    this.innerHTML='';
});
//-------------  dolgozók szűrése, 'filteringClass' osztállyal rendelkező fejléc mező szerkesztése után -------------
$(document).on('blur', '.filteringClass', function () {
    console.log(this);
    filteringName=this.getAttribute('fieldType');
    filteringValue=this.innerHTML;
    if (filteringName && filteringValue) {
        fetchEmployeeData();
    } else {
        this.innerHTML='filter...';
    }
});


//------------- dolgozói adatlekérése funkció-------------
function fetchEmployeeData() {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=fetch",
        data: {pageNumber: pageNumber},
        dataType: "json",
        cache: false,
        success: function (data) {
            //-------------- adatok szűrése --------------
            data = filterEmployeeList(data,filteringName,filteringValue);
            //-------------- adatok rendezése ------------
            data = order === 'asc' ? sortEmployeeListAsc(data,sortingValue) : sortEmployeeListDesc(data,sortingValue);
            order = order === 'asc' ? 'desc' : 'asc';
            //------------- dolgozói adatok megjelenítése-
            renderEmployeeDataRows(data);
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
                        <!------------- adatok megjelenítése és módosítható mezők felszerelése 'editable' osztállyal------------->
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



//------------- dolgozói adat módosítás funkció-------------
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

//------------- rendezés növekvő sorrendben funkció-------------
function sortEmployeeListAsc(objects, fieldName) {
    return objects.sort((a,b) => (a[fieldName] > b[fieldName]) ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0));
}
//------------- rendezés csökkenő sorrendben funkció-------------
function sortEmployeeListDesc(objects, fieldName) {
    return objects.sort((a,b) => (a[fieldName] < b[fieldName]) ? 1 : ((b[fieldName] < a[fieldName]) ? -1 : 0));
}

//------------- dolgozói object tömb szűrése funkció---------------------------------
function filterEmployeeList(objects,fieldName,fieldValue) {
        return objects.filter(x => (String(x[fieldName]).includes(fieldValue)));
}

