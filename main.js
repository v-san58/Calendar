let nav = 0; //Which month are we on? (From current Month)
let clicked = null; //refrences the clicked day
let test = "s" ? "Test1" : "testt2";
const form = document.getElementsByTagName("form")[0]
const today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
"September", "Oktober", "November","December"];
let navMonth = 0;
let currentMonth; let currentYear; let currentDay; let firstDay;
let firstLoad = true;
let round_circles = document.getElementsByClassName("round_circle")
function Day(element,day,month,year){
    this.divElement = element;
    this.day = day;
    this.month = month;
    this.year = year;
    this.divE
    this.divElement.innerHTML = day;
    {console.log("day: "+day)}
}

let firstWeek = ()=>{
    let jan1 = new Date(String(currentYear))
    let firstDayOfMonth = new Date();
    //firstDayOfMonth.setDate(1);
    console.log(Math.floor((firstDayOfMonth-jan1)/86400000/7),jan1,firstDayOfMonth)
    return Math.floor((firstDayOfMonth-jan1)/86400000/7)
} ;
function showMonth(){
    currentMonth = Math.abs((today.getMonth()+navMonth) % 12);
    currentYear = Math.abs(today.getFullYear() + Math.floor((today.getMonth()+navMonth)/12))
    let firstDayOfMonth = new Date(`${currentYear}-${currentMonth+1}-01`);
    let fw = firstWeek(); 
    console.log(test,fw);
    let monthString = monthNames[currentMonth];
    firstDay = (firstDayOfMonth.getDay() == 0 ? 7 : firstDayOfMonth.getDay())-1
    document.getElementById("month_name").innerHTML = `${monthString}<br>${currentYear}`;
    
    let lastDayOfMonth = new Date(`${today.getFullYear() + Math.floor((today.getMonth()+navMonth+1)/12)}-${(currentMonth+1)%12 + 1}-01`) //first day of next month
    lastDayOfMonth.setDate(0) //last day of THIS month
    console.log(lastDayOfMonth.toDateString(), currentMonth, currentYear)
    console.log(today.getFullYear() + Math.floor((today.getMonth()+navMonth+1)/12))
    //console.log(firstDay,firstDayOfMonth,lastDayOfMonth.getDate());
    //Monate durchgehen
    
    for(let i = 0;i<42;i++){
        let circle = round_circles[i]
        let div = circle.parentElement; 
        for(let child of div.children){
            if(child.className != "round_circle") {child.remove()}//delete all events from the previous table
             
        }
        
        div.addEventListener("mouseover",mouseoverColor)
        div.addEventListener("mouseout", mouseoutColor)
        if(i<lastDayOfMonth.getDate()+firstDay && i>=firstDay){
            circle.style.visibility = "visible";
            circle.innerHTML = i-firstDay+1;
            if(firstLoad){
                div.addEventListener("click", e => {addDate(e.target)});}
            if(navMonth == 0 && i-firstDay+1 == today.getDate()){circle.style.backgroundColor = "red";}
            else{
                div.style.backgroundColor = "#dddddd";
                circle.style.backgroundColor = "#666666";
            }
            //hover effect
            
            
            
        }
        else{
            circle.style.visibility = "hidden";
        }
        
    }
    firstLoad = false;
    
}

function mouseoverColor(e){
    
    if(e.target.tagName =="TD" && e.target.children[0].style.visibility == "visible"){e.target.style.backgroundColor = "#888888";}
    else if(e.target.style.visibility == "visible"){e.target.parentElement.style.backgroundColor = "#888888";}
}
function mouseoutColor(e){
    if(e.target.tagName =="TD"){e.target.style.backgroundColor = "#dddddd";}
    else{e.target.parentElement.style.backgroundColor = "#dddddd";}
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
    if(form.children[2].value!='' && form.children[0].value!=''){
        let values = getFormValues();
        let currentTd = round_circles[currentDay].parentElement
        let div = document.createElement("p");
        div.innerHTML = `${values[1]}:${values[2]}`; 
        div.style.backgroundColor = "lightgrey"
        div.style.border = "1px solid black"
        let dateTime = values[0] + values[1];
        saveEvent(dateTime,values[2]);
        currentTd.appendChild(div);
    }
    
})




function addDate(element){
    /**Sets the value of the Date-Form to the chosen date.
    */
    let d;
    let month_string;
    if(element.tagName == "DIV"){ d = element.innerHTML;}
    else{ d = element.children[0].innerHTML}
    currentDay = parseInt(d) + firstDay - 1;
    console.log("my day: ",currentDay)
    if(parseInt(d)<10){
        d = "0"+ d
    }
    
    if(currentMonth+1<10){month_string = "0"+(currentMonth+1);}
    else{month_string = ""+(currentMonth+1);}
    form.children[0].value = `${currentYear}-${month_string}-${d}`;
}
//todo save the events somewhere
function getFormValues(){
    let result = new Array();
    let date = document.getElementById("date_input")
    for (let i = 0; i<3;i++){
        result.push(form.children[i].value);
         form.children[i].value = ""; }
    console.log(result);
    return result;
}

function showInputDialog(id){
    console.log(document.getElementById(id).value);
    let inputDate = form.children[0]
    inputDate.value = document.getElementById(id).value
}

showMonth()
