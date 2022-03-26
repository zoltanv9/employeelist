/*
    Dolgozói adatok elkérése és megjelenítése kliens oldalról.
    req paraméterben adjuk meg, hogy milyen kérésről van szó.
 */
$(function () {
    $.ajax({
        type: "GET",
        url: "contents/employeeListHandler.php?req=select",
        dataType: "json",
        cache: false,
        success: function (data) {
            //------------- visszakapott dolgozói tömb megjelenítése -------------
            $.each(data, function (index, value) {
                $('#my-table').append(`<tr><td class="table-primary">${value.first_name}</td></tr>`);
            })

        }
    })
});