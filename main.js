let nav = 0; //Which month are we on? (From current Month)
let clicked = null; //refrences the clicked day
let test = "s" ? "Test1" : "testt2";
const form = document.getElementsByTagName("form")[0]
const today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
"September", "Oktober", "November","December"];
let navMonth = 0;
let currentMonth; let currentYear;
function Day(element,day,month,year){
    this.divElement = element;
    this.day = day;
    this.month = month;
    this.year = year;
    this.divE
    this.divElement.innerHTML = day;
    {console.log("day: "+day)}
}

function showMonth(){
    currentMonth = (today.getMonth()+navMonth) % 12;
    currentYear = today.getFullYear() + Math.floor((today.getMonth()+navMonth)/12)
    let firstDayOfMonth = new Date(`${currentYear}-${currentMonth+1}-01`);
    
    let monthString = monthNames[currentMonth];
    let firstDay = (firstDayOfMonth.getDay() == 0 ? 7 : firstDayOfMonth.getDay())-1
    document.getElementById("month_name").innerHTML = monthString;
    let lastDayOfMonth = new Date(`${today.getFullYear() + Math.floor((today.getMonth()+navMonth+1)/12)}-${(currentMonth+1)%12 + 1}-01`) //first day of next month
    lastDayOfMonth.setDate(0) //last day of THIS month
    console.log(lastDayOfMonth.toDateString(), currentMonth, currentYear)
    console.log(today.getFullYear() + Math.floor((today.getMonth()+navMonth+1)/12))
    //console.log(firstDay,firstDayOfMonth,lastDayOfMonth.getDate());
    //Monate durchgehen
    for(let i = 0;i<42;i++){
        let element = document.getElementsByClassName("round_circle")[i]
        //new Day(element,i+firstDay, firstDayOfMonth.getMonth(),1999)
        
        if(i<lastDayOfMonth.getDate()+firstDay && i>=firstDay)
        {
            element.style.visibility = "visible";
            element.innerHTML = i-firstDay+1;
            element.onlick = addDate(i-firstDay+1)
            if(navMonth == 0 && i-firstDay+1 == today.getDay()){
                element.parentElement.style.backgroundColor = "#444444";
                element.style.backgroundColor = "red";
            }
        }
        else{
            element.style.visibility = "hidden";
        }
       
        
    }

    
}


function nextMonth(){
    navMonth++;
    showMonth();
}
function prevMonth(){
    navMonth--;
    showMonth();
}
function actualMonth(){
    navMonth = 0;
    showMonth()
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addEvent()

})



function addDate(d){
    console.log(today.toDateString("mm"))
    form.children[0].value = new Date(`${currentYear}-${currentMonth+1}-${d}`).toLocaleDateString();
}

function addEvent(){
    let result = ""
    let date = document.getElementById("date_input")
    for (let child of form.children){
        console.log(child.value);
    }
    console.log(result);
    return result;
}

function showInputDialog(id){
    console.log(document.getElementById(id).value);
    let inputDate = form.children[0]
    inputDate.value = document.getElementById(id).value
}

showMonth()
