const paginationQuery = {
    limit: 5,//limit is page size
    offset: 0//offset is page number
}

const paginationFunction = {
    gotoFirstPage: function() {
        paginationQuery["offset"] = 0;
    },
    changePage: function(delta) {
        paginationQuery["offset"] += parseInt(delta);
    },
    changePageSize: function (newPageSize) {
        //console.log(newPageSize);
        
        paginationQuery["limit"] = newPageSize
    }
}

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






function getUserDataFromBackend() {
    //event.preventDefault();
    var liftType = $("#liftType-select option:selected").val();
    var yearFilter = $('#yearFilter').val();
    var monthFilter = $('#monthFilter').val();
    var url = "";
    //console.log(liftType);
    if (liftType == "Squat") {
        url = "http://localhost:3000/get/all/squat?year=" + yearFilter + "&month=" + monthFilter+"&limit="+paginationQuery.limit+"&offset="+paginationQuery.offset;
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

function dataRetrievalMiddleMan(event) {
    event.preventDefault();
    getUserDataFromBackend();
    return false;//return false is like prevent defualt.
}

function registerFilterForm() {
    $("#basic-data-filter-form").submit(dataRetrievalMiddleMan);
}


function paginateBasicData(event) {
    //console.log("clicked");
    //console.log($(this)); this refers to the caller/ the link the was clicked
    const fn = $(this).attr("fn");
    const value = $(this).attr("value") || $(this).val();//this or operation says if the first is nothing, take the second value instead
    paginationFunction[fn](value);
    getUserDataFromBackend();
};



function registerBasicDataPaginationForm() {
    $("#first-page").click(paginateBasicData);
    $("#previous-page").click(paginateBasicData);
    $("#next-page").click(paginateBasicData);
    $("#page-size-select").change(paginateBasicData);
};


/* function defualtLoad() {
    getUserDataFromBackend();
    registerFilterForm();
} */





$(document).ready(function () {
    //defualtLoad();
    registerFilterForm();
    registerBasicDataPaginationForm();
});