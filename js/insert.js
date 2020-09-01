function loadSquat() {
    deactiveNavActive();
    $('#squat-link').css({'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff'});
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
    
}

function loadBench() {
    deactiveNavActive();
    $('#bench-link').css({'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff'});
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
    
}


function loadDeadlift() {
    deactiveNavActive();
    $('#deadlift-link').css({'color': '#495057', 'background-color': '#fff', 'border-color': '#dee2e6 #dee2e6 #fff'});
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
    
}

function deactiveNavActive() {
    $('#squat-link').css({'color': '', 'background-color': '', 'border-color': ''});
    $('#bench-link').css({'color': '', 'background-color': '', 'border-color': ''});
    $('#deadlift-link').css({'color': '', 'background-color': '', 'border-color': ''});
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
  

function registerSquatLogForm() {

}



$(document).ready(function () {//run when document is populated
     //document.getElementById("defaultOpen").click();
    loadSquat();//load as defualt
    registerSquatLink();
    registerBenchLink();
    registerDeadliftLink();

});
