const paginationQuery = {
    limit: 5,//limit is page size
    offset: 0//offset is page number
}

const paginationFunction = {
    gotoFirstPage: function () {
        paginationQuery["offset"] = 0;
    },
    changePage: function (delta) {
        paginationQuery["offset"] += parseInt(delta);
    },
    changePageSize: function (newPageSize) {
        //console.log(newPageSize);

        paginationQuery["limit"] = newPageSize
    }
}

function modal() {
    console.log("ENTER");
    // Get the modal
    var modal = $("#myModal");

    // Get the button that opens the modal
    var btn = $('.btn-update');

    // Get the Close button that opens the modal
    var btnClose = $('.btn-close');

    // Get the <span> element that closes the modal
    var span = $(".close");

    // When the user clicks on the button, open the modal
    btn.click(function () {
        console.log("Pressed");
        modal.attr("style", "display:block");
    })


    // When the user clicks on <span> (x), close the modal
    span.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )

    // When the user clicks on <button> close, close the modal
    btnClose.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.attr("style", "display:none");
        }
    }
}



function populateOptions(data) {
    var liftType = $("#liftType-select option:selected").val();


    if (liftType == "Squat") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].squatid).on("click", (event) => {
                //console.log("CLICKED" + data[i].squatid);
            });

            $('#update-' + data[i].squatid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "http://localhost:3000/get/all/squat/" + data[i].squatid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        $(".modal-body").append("<p>Squat ID: " + response[i].squatid + "</p>");//change these to a form with inputs with a submit button with a register/listener
                        $(".modal-body").append("<p>Weight: " + response[i].weight + "</p>");
                        $(".modal-body").append("<p>Year: " + response[i].year + "</p>");
                        $(".modal-body").append("<p>Month: " + response[i].month + "</p>");
                        $(".modal-title-container").append("<h4 class=\"modal-title\">" + response[i].squatid + " Specifications</h4>");

                    }

                })
                    .fail((response) => {
                        console.log("Error!");
                        //alert("Wrong username/password");

                    });



            });
        }
        modal();


    } else if (liftType == "Bench") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].benchid).on("click", (event) => {
                //console.log("CLICKED" + data[i].benchid);
            });

            $('#update-' + data[i].benchid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "http://localhost:3000/get/all/bench/" + data[i].benchid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        $(".modal-body").append("<p>" + response[i].benchid + "</p>");
                        $(".modal-title-container").append("<h4 class=\"modal-title\">" + response[i].benchid + " Specifications</h4>");

                    }

                })
                    .fail((response) => {
                        console.log("Error!");
                        //alert("Wrong username/password");

                    });



            });

            
        }

        modal();

    } else if (liftType == "Deadlift") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].deadliftid).on("click", (event) => {
                //console.log("CLICKED" + data[i].deadliftid);
            });

            $('#update-' + data[i].deadliftid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "http://localhost:3000/get/all/deadlift/" + data[i].deadliftid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        $(".modal-body").append("<p>" + response[i].deadliftid + "</p>");
                        $(".modal-title-container").append("<h4 class=\"modal-title\">" + response[i].deadliftid + " Specifications</h4>");

                    }

                })
                    .fail((response) => {
                        console.log("Error!");
                        //alert("Wrong username/password");

                    });



            });

        }

        modal();
    }
}


function populateTable(data) {
    //console.log(data);
    var liftType = $("#liftType-select option:selected").val();
    if (liftType == "Squat") {
        var tableData = data.map(
            ({ squatid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${squatid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${squatid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    } else if (liftType == "Bench") {
        var tableData = data.map(
            ({ benchid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${benchid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${benchid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    } else if (liftType == "Deadlift") {
        var tableData = data.map(
            ({ deadliftid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${deadliftid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${deadliftid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    }


    $("#basic-data-tbody").html(tableData);

    populateOptions(data);

}






function getUserDataFromBackend() {
    //event.preventDefault();
    var liftType = $("#liftType-select option:selected").val();
    var yearFilter = $('#yearFilter').val();
    var monthFilter = $('#monthFilter').val();
    var url = "";
    //console.log(liftType);
    if (liftType == "Squat") {
        url = "http://localhost:3000/get/all/squat?year=" + yearFilter + "&month=" + monthFilter + "&limit=" + paginationQuery.limit + "&offset=" + paginationQuery.offset;
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