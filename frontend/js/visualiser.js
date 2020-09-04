
function populateGraph(liftType, yAxis, xAxis) {
    //chart creation
    //event.preventDefault();
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: liftType + ' weight progression',
                data: yAxis,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });
}

/* function resetUserInputs(event) {
    event.preventDefault();
    xAxis = [];
    yAxis = [];
    location.reload();
} */



function getFilterData(filterType) {
    //console.log(filterType);
    if (filterType == "option1") {
        var year = $("#txt_year").val()
        //console.log(year);
        return year;
    } else if (filterType == "option2") {
        var year1 = $("#txt_year1").val()
        var year2 = $("#txt_year2").val()
        return [year1, year2]
    }
}




function getLiftDataFromBackend(event) {
    event.preventDefault();

    var liftType = $("#liftType-select option:selected").val();
    var filterType = $("input[name='filterOption']:checked").val();
    
    
    if (liftType == "Squat") {
        var url = "http://localhost:3000/get/squat";
        if (filterType == "option1" || filterType == "option2") {
            var filterData = getFilterData(filterType);
            //console.log(filterData);
            if (filterType == "option1") {
                url = "http://localhost:3000/get/squat?startYear="+filterData;
            } else if (filterType == "option2") {
                url = "http://localhost:3000/get/squat?startYear="+filterData[0]+"&endYear="+filterData[1];
            }
        }
    
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
            var xAxis = [];
            var yAxis = [];

            for (let i = 0; i < response.length; i++) {
                xAxis.push(response[i].year + "-" + response[i].month);
                yAxis.push(response[i].weight);
            }

            populateGraph(liftType, yAxis, xAxis);
            
        });
    } else if (liftType == "Bench") {
        var url = "http://localhost:3000/get/bench";
        if (filterType == "option1" || filterType == "option2") {
            var filterData = getFilterData(filterType);
            //console.log(filterData);
            if (filterType == "option1") {
                url = "http://localhost:3000/get/bench?startYear="+filterData;
            } else if (filterType == "option2") {
                url = "http://localhost:3000/get/bench?startYear="+filterData[0]+"&endYear="+filterData[1];
            }
            console.log(url);
        }

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
            var xAxis = [];
            var yAxis = [];

            for (let i = 0; i < response.length; i++) {
                xAxis.push(response[i].year + "-" + response[i].month);
                yAxis.push(response[i].weight);
            }

            populateGraph(liftType, yAxis, xAxis);
            
        });
    } else if (liftType == "Deadlift") {
        var url = "http://localhost:3000/get/deadlift";
        if (filterType == "option1" || filterType == "option2") {
            var filterData = getFilterData(filterType);
            //console.log(filterData);
            if (filterType == "option1") {
                url = "http://localhost:3000/get/deadlift?startYear="+filterData;
            } else if (filterType == "option2") {
                url = "http://localhost:3000/get/deadlift?startYear="+filterData[0]+"&endYear="+filterData[1];
            }
        }

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
            var xAxis = [];
            var yAxis = [];

            for (let i = 0; i < response.length; i++) {
                xAxis.push(response[i].year + "-" + response[i].month);
                yAxis.push(response[i].weight);
            }

            populateGraph(liftType, yAxis, xAxis);
            
        });
    }

    
}


function checkRadioSelected() {
    var currentSelectedRadio = $("input[name='filterOption']:checked").val();
    //console.log(currentSelectedRadio);
    //console.log("CHANGING");

    if (currentSelectedRadio == "option1") {
        var html = `
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="txt_year">Year:</label>
                    <input type="number" class="form-control" id="txt_year" placeholder="Enter a year">
                </div>
            </div>
        `;

        //$('#filter-inputs').empty();
        $('#filter-inputs').html(html);

    } else if (currentSelectedRadio == "option2") {
        var html = `
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="txt_year1">Start Year:</label>
                <input type="number" class="form-control" id="txt_year1" placeholder="Enter first year to sort between">
            </div>

            <div class="form-group col-md-3">
            <label for="txt_year2">End Year:</label>
            <input type="number" class="form-control" id="txt_year2" placeholder="Enter ending year to sort between">
        </div>
        </div>
    `;

    //$('#filter-inputs').empty();
    $('#filter-inputs').html(html);

    } else if (currentSelectedRadio == "option3") {
        $('#filter-inputs').empty();
    }
}



function registerViewGraphForm() {
    $('#user-inputs-form').submit(getLiftDataFromBackend);
}

function registerFilterRadioButtonsChange() {
    $('#user-inputs-form input[type=radio]').change(checkRadioSelected)//only when radio buttons change
}



$(document).ready(function () {//run when document is populated
    registerViewGraphForm();
    registerFilterRadioButtonsChange();
});