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

function showMonth(){
    currentMonth = Math.abs((today.getMonth()+navMonth) % 12);
    currentYear = Math.abs(today.getFullYear() + Math.floor((today.getMonth()+navMonth)/12))
    let firstDayOfMonth = new Date(`${currentYear}-${currentMonth+1}-01`);
    
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
        let element = round_circles[i]
        
        for(let child of element.parentElement.children){
            if(child.className != "round_circle") {child.remove()}//delete all events from the previous table
             
        }
        if(i<lastDayOfMonth.getDate()+firstDay && i>=firstDay){
            element.style.visibility = "visible";
            element.innerHTML = i-firstDay+1;
            if(firstLoad){
                element.parentElement.addEventListener("click", e => {addDate(e.target)});}
            if(navMonth == 0 && i-firstDay+1 == today.getDate()){element.style.backgroundColor = "red";}
            else{
                element.parentElement.style.backgroundColor = "#dddd";
                element.style.backgroundColor = "#444444";
            }
            //hover effect
            element.parentElement.addEventListener("mouseover", (e) => {
                if(e.target.tagName =="TD"){e.target.style.backgroundColor = "#888888";}
                else{e.target.parentElement.style.backgroundColor = "#888888";}
            })
            element.parentElement.addEventListener("mouseout", (e) => {
                if(e.target.tagName =="TD"){e.target.style.backgroundColor = "#dddddd";}
                else{e.target.parentElement.style.backgroundColor = "#dddddd";}
            })
            
        }
        else{
            element.style.visibility = "hidden";
            
        }
        
    }
    firstLoad = false;
    
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
        let div = document.createElement("div");
        div.innerHTML = `${values[1]} ${values[2]}`; 
        div.style.backgroundColor = "lightgrey"
        div.style.border = "1px solid black"
        currentTd.appendChild(div);
    }
    
})




function addDate(element){
    let d;
    let month_string;
    if(element.tagName == "DIV"){ d = element.innerHTML}
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
