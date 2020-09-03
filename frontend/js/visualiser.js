
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

function resetUserInputs(event) {
    event.preventDefault();
    xAxis = [];
    yAxis = [];
    location.reload();
}





function getLiftDataFromBackend(event) {
    event.preventDefault();

    var liftType = $("#liftType-select option:selected").val();

    if (liftType == "Squat") {
        var settings = {
            "url": "http://localhost:3000/get/squat",
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
        var settings = {
            "url": "http://localhost:3000/get/bench",
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
        var settings = {
            "url": "http://localhost:3000/get/deadlift",
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



function registerViewGraphForm() {
    $('#user-inputs-form').submit(getLiftDataFromBackend);
}





$(document).ready(function () {//run when document is populated
    registerViewGraphForm();
});