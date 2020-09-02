function loadSquat() {
    deactiveNavActive();

    $('#squat-link').css({ 'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff' });

    var html = `
    <form id="squat-log-form" method="POST">
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_weight">Weight (KG) :</label>
            <input type="number" class="form-control" id="txt_weight" placeholder="Enter weight lifted">
        </div>
    </div>


    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_year">Year: </label>
            <input type="number" class="form-control" id="txt_year" placeholder="e.g. 2020">
        </div>
        <div class="form-group col-md-3">
            <label for="month-select">Month:</label>
            <select id="month-select" class="form-control">
                <option selected disabled>Choose a month...</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
    </div>
    <div id="message">
    </div>
    <button id="new-log-button" type="submit" class="btn btn-primary">Add</button>
</form>
    `;
    $('#input-container').empty();
    $('#input-container').html(html);
    registerSquatLogForm();

}

function loadBench() {
    deactiveNavActive();
    $('#bench-link').css({ 'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff' });
    var html = `
    <form id="bench-log-form" method="POST">
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_weight">Weight (KG) :</label>
            <input type="number" class="form-control" id="txt_weight" placeholder="Enter weight lifted">
        </div>
    </div>


    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_year">Year: </label>
            <input type="number" class="form-control" id="txt_year" placeholder="e.g. 2020">
        </div>
        <div class="form-group col-md-3">
            <label for="month-select">Month:</label>
            <select id="month-select" class="form-control">
                <option selected disabled>Choose a month...</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
    </div>
    <div id="message">
    </div>
    <button id="new-log-button" type="submit" class="btn btn-primary">Add</button>
</form>
    `;
    $('#input-container').empty();
    $('#input-container').html(html);
    registerBenchLogForm();

}


function loadDeadlift() {
    deactiveNavActive();

    $('#deadlift-link').css({ 'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff' });

    var html = `
    <form id="deadlift-log-form" method="POST">
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_weight">Weight (KG) :</label>
            <input type="number" class="form-control" id="txt_weight" placeholder="Enter weight lifted">
        </div>
    </div>


    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="txt_year">Year: </label>
            <input type="number" class="form-control" id="txt_year" placeholder="e.g. 2020">
        </div>
        <div class="form-group col-md-3">
            <label for="month-select">Month:</label>
            <select id="month-select" class="form-control">
                <option selected disabled>Choose a month...</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
    </div>
    <div id="message">
    </div>
    <button id="new-log-button" type="submit" class="btn btn-primary">Add</button>
</form>
    `;
    $('#input-container').empty();
    $('#input-container').html(html);
    registerDeadliftLogForm();

}

function deactiveNavActive() {
    $('#squat-link').css({ 'color': '', 'background-color': '', 'border-color': '' });
    $('#bench-link').css({ 'color': '', 'background-color': '', 'border-color': '' });
    $('#deadlift-link').css({ 'color': '', 'background-color': '', 'border-color': '' });
}



function registerSquatLink() {
    $('#squat-link').click(loadSquat);
}

function registerBenchLink() {
    $('#bench-link').click(loadBench);
}

function registerDeadliftLink() {
    $('#deadlift-link').click(loadDeadlift);
}




function sendDataToBackendSquat(event) {
    event.preventDefault();

    var settings = {
        "url": "http://localhost:3000/insert/squat-log",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "weight": $("#txt_weight").val(),
            "year": $("#txt_year").val(),
            "month": $("#month-select option:selected").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Logged sucessfully")
    })
        .fail((response) => {
            alert("ERROR");
        });
}

function sendDataToBackendBench(event) {
    event.preventDefault();

    var settings = {
        "url": "http://localhost:3000/insert/bench-log",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "weight": $("#txt_weight").val(),
            "year": $("#txt_year").val(),
            "month": $("#month-select option:selected").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Logged sucessfully")
    })
        .fail((response) => {
            alert("ERROR");
        });
}


function sendDataToBackendDeadlift(event) {
    event.preventDefault();

    var settings = {
        "url": "http://localhost:3000/insert/deadlift-log",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "weight": $("#txt_weight").val(),
            "year": $("#txt_year").val(),
            "month": $("#month-select option:selected").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Logged sucessfully")
    })
        .fail((response) => {
            alert("ERROR");
        });
}


function registerSquatLogForm() {
    $('#squat-log-form').submit(sendDataToBackendSquat);
}


function registerBenchLogForm() {
    $('#bench-log-form').submit(sendDataToBackendBench);
}

function registerDeadliftLogForm() {
    $('#deadlift-log-form').submit(sendDataToBackendDeadlift);
}



$(document).ready(function () {//run when document is populated
    //document.getElementById("defaultOpen").click();
    loadSquat();//load as defualt
    registerSquatLink();
    registerBenchLink();
    registerDeadliftLink();
    
    
   
});
