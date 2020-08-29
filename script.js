var schedule = [];
var eventInput = ('input').value;
var calendarHour = $(this).attr('data-hour');
// var calendarDate = moment().format();
var $time = moment().hour();
var displayDate = document.getElementById('currentDay');
var currentTime = moment();
var currentHour = moment().hour();
var todayIs = moment().format('LL');
var eventInput = "";

console.log($time);
console.log(todayIs);


// //query the computer to get the current day and time and print in jumbotron 
$(displayDate).text(todayIs);
//   //access loca storage if there is already calendar event, and populate schedule
function init() {
    var storedEvents = JSON.parse(localStorage.getItem("schedule"));
    if (storedEvents) {
        schedule = storedEvents;
      }
      printToCalendar();
}

  
function printToCalendar(){
  for (var i = 0; i < schedule.length; i++){
      var index = schedule[i];
      var time = index.hour;
      $('[data-hour=' + time + "]").val(index.eventTitle);
  }
}

function storeEvents() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

//   //if statement that compares the current time to each row's id and adds the appr class to change background 
function compareTime () {
  $("input").each(function(response){
      var schedHour = response + 9;
    if (schedHour > currentHour) {
      $(this).addClass('future');
    }else if(schedHour < currentHour) {
      $(this).addClass('past');
    }else if(schedHour === currentHour) {
      $(this).addClass('present');
  }});
}

compareTime(calendarHour, $time);

setInterval(function(){
  var now = moment().format();
  console.log(now);
}, 1000);

// save button clickevent. 
$('.saveBtn').on("click", function(event) {
  event.preventDefault();

  var $input = $(this).prev();

    var userEvent = {
        eventTitle: $input.val(),
        hour: $input.attr('data-hour')
    };

    schedule.push(userEvent);
    console.log(schedule);
    storeEvents();
    printToCalendar();
  });
  
  console.log(schedule);
  init(); 
