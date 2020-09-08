
function populateTable(data) {
    //console.log(data);
    const tableData = data.map(
        ({ weight, year, month }) => `
            <tr>
                <td>${weight}</td>
                <td>${year}</td>
                <td>${month}</td>
            </tr>
        `);

    $("#basic-data-tbody").html(tableData);
}






function getUserDataFromBackend(event) {
    event.preventDefault();
    var liftType = $("#liftType-select option:selected").val();
    var yearFilter = $('#yearFilter').val();
    var monthFilter = $('#monthFilter').val();
    var url = "";
    //console.log(liftType);
    if (liftType == "Squat") {
        url = "http://localhost:3000/get/all/squat?year=" + yearFilter + "&month=" + monthFilter;
    } else if (liftType == "Bench") {
        url = "http://localhost:3000/get/all/bench?year=" + yearFilter + "&month=" + monthFilter;
    } else if (liftType == "Deadlift") {
        url = "http://localhost:3000/get/all/deadlift?year=" + yearFilter + "&month=" + monthFilter;
    }
    //console.log(url);

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        populateTable(response)
    });
}

function registerFilterForm() {
    $("#basic-data-filter-form").submit(getUserDataFromBackend);
}


/* function defualtLoad() {
    getUserDataFromBackend();
    registerFilterForm();
} */




$(document).ready(function () {
    //defualtLoad();
    registerFilterForm();
});