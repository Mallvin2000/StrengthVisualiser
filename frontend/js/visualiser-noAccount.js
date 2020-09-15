var xAxis = [];
var yAxis = [];





function addNewLog(event) {
    event.preventDefault();
    xAxis.push("" + $("#txt_year").val() + "-" + $("#month-select option:selected").val());
    yAxis.push($("#txt_weight").val());
    console.log("X-axis: " + xAxis);
    console.log("Y-axis: " + yAxis);
    $('#message').html(`<p id="msg" style="color:green;">Log Added!</p>`);//show success message
    setTimeout(() => { 
        $('#message').html(``);
        $('#user-inputs-form')[0].reset();//reset the values in the input fields of the form/ clear them. Page doesnt refresh, just empty the inputs https://stackoverflow.com/questions/8937285/form-resetting-is-not-working-using-jquery/8937323 
    }, 2000)//after 2 seconds, call the callback function to make the message disappear
    
}


function registerNewInputForm() {
    $('#user-inputs-form').submit(addNewLog);//listen for the submit action of the form
}

function registerViewGraphSubmit() {
    $('#submit-form').submit(populateGraph);
}


function registerResetInputsForm() {
    $('#reset-form').submit(resetUserInputs);
}



function compare(a, b) {
    const bandA = a.date;
    const bandB = b.date;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }



function populateGraph(event) {
    //chart creation
    event.preventDefault();

    var xAxisTemp = [];
    var yAxisTemp = [];
    for (let i = 0; i < xAxis.length; i++) {
        xAxisTemp.push({
            date: xAxis[i]
        });

        yAxisTemp.push({
            date: yAxis[i]
        });
    }
    
    xAxisTemp.sort(compare);
    yAxisTemp.sort(compare);

    var xAxisSorted = [];
    var yAxisSorted = [];
    for (let i = 0; i < xAxisTemp.length; i++) {
        xAxisSorted.push(xAxisTemp[i].date);
        yAxisSorted.push(yAxisTemp[i].date);
        
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxisSorted,
            datasets: [{
                label: 'Squat weight progression',
                data: yAxisSorted,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

function resetUserInputs(event) {
    event.preventDefault();
    xAxis = [];
    yAxis = [];
    location.reload();
}


function registerCheckInputs() {
    $(":input").focusout(() => {//checking all input elements

    })
}


function checkValid() {
    var valid = true;

    //check lift type
    var liftType = $("#liftType-select option:selected").val()
    if (liftType != "Squat" || liftType != "Bench" || liftType != "Deadlift") {
        valid = false;
    }

    //check weight
    var weight = $("#txt_weight").val();
    if (weight.length == 0) {
        valid = false;
    }

    //check year
    var year = $("#txt_year").val();
    if (year.length == 0) {
        valid = false;
    }

    //check month
    var month = $("#month-select option:selected").val()
    var month = parseInt(month);//conver the string to an integer
    if (isNaN(month)) {//if selected option is not a number means user didnt choose an option
        valid = false;
    }


    return valid;

}




function registerModal() {
    $('#open-modal').on("click", (event) => {
        modal()
    });
}





function populateModal() {
    var data = [];
    for (let i = 0; i < xAxis.length; i++) {
        data.push({
            weight: yAxis[i],
            date: xAxis[i]
        });

    }
    data.sort(compare);//Sort array in ascending order of date
    const dataTableHTML = data.map(
        ({ weight, date }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${date}</td>
                </tr>
    `);
    $("#data-tbody").html(dataTableHTML);
}



function modal() {
    //console.log("ENTER");
    // Get the modal
    var modal = $("#myModal");

    // Get the button that opens the modal
    var btn = $('#open-modal');

    // Get the Close button that opens the modal
    var btnClose = $('.btn-close');

    // Get the <span> element that closes the modal
    var span = $(".close");

    // When the user clicks on the button, open the modal
    btn.click(function () {
        //console.log("Pressed");
        modal.attr("style", "display:block");
        populateModal();

    })


    // When the user clicks on <span> (x), close the modal
    span.click(function () {
        modal.attr("style", "display:none");
        $(".data-tbody").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        //$(".modal-title-container").empty();
    }
    )

    // When the user clicks on <button> close, close the modal
    btnClose.click(function () {
        modal.attr("style", "display:none");
        $(".data-tbody").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        // $(".modal-title-container").empty();
    }
    )


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.attr("style", "display:none");
        }
    }
}






$(document).ready(function () {//run when document is populated
    registerNewInputForm();//send data from backend once page is fully loaded
    registerViewGraphSubmit();
    registerResetInputsForm();
    modal();//run the function so that wont have to press button twice on first run to open modal
    registerModal();
});