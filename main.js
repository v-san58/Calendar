
let clicked = null; //refrences the clicked day
let test = "s" ? "Test1" : "testt2";
const form = document.getElementsByTagName("form")[0]
const today = new Date();
console.log(today)
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
    
}
function Appoinment(values){
    this.hasTime = (values[1]!="")
    
        
    
     if(this.hasTime)
        this.date = new Date(values[0] + "T" + values[1]);
     else 
        this.date = new Date(values[0]);
        
    console.log(this.date);
    console.log(this.hasTime);
    
    
    this.eventName = values[2]
    
}

let firstWeek = ()=>{
    let jan1 = new Date(String(currentYear))
    let firstDayOfMonth = new Date();
    //firstDayOfMonth.setDate(1);
    return Math.floor((firstDayOfMonth-jan1)/86400000/7)
} ;
function showMonth(){
    currentMonth = Math.abs((today.getMonth()+navMonth) % 12);
    currentYear = Math.abs(today.getFullYear() + Math.floor((today.getMonth()+navMonth)/12))
    let firstDayOfMonth = new Date(`${currentYear}-${currentMonth+1}-01`);
    let fw = firstWeek(); 
    let monthAppoinments = loadAppointments(currentMonth,currentYear)
    
    
    let monthString = monthNames[currentMonth];
    firstDay = (firstDayOfMonth.getDay() == 0 ? 7 : firstDayOfMonth.getDay())-1
    document.getElementById("month_name").innerHTML = `${monthString}<br>${currentYear}`;
    
    let lastDayOfMonth = new Date(`${today.getFullYear() + Math.floor((today.getMonth()+navMonth+1)/12)}-${(currentMonth+1)%12 + 1}-01`) 
    let appindex
    lastDayOfMonth.setDate(0) //last day of THIS month
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
            appindex = i-firstDay
            if (appindex>=0){
                let id_num = 0
                for (const app of monthAppoinments[appindex]){
                
                const p = document.createElement("p")
                date = new Date (app.date)
                
                p.innerHTML= Boolean(app.hasTime) ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    + "&#x231A;"+ app.eventName :
                    app.eventName;
                p.id = "Termin_num_"+id_num+"_day_"+appindex
                
                createDelButton(p)
                div.appendChild(p)
                
                
                }
            }

            if(firstLoad){
                div.addEventListener("click", e => {addDate(e.target)});
            }
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
function createDelButton(element){
    const b = document.createElement("button");
    b.onclick = (element1) => {
        console.log(year_map.get(currentYear)[currentMonth]);
        console.log(element1.target.parentElement.id);
        //
        element.remove();
        
        
        //delete from Map
         removeAppFromLocalStorage(element1)

       
        
        
    }
    b.textContent = "❌"
    element.appendChild(b);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if(form.children[2].value!='' && form.children[0].value!=''){
        let values = getFormValues();
        app = new Appoinment(values)
        saveAppointment(app);
        showMonth()
    }
    
})




function addDate(element){
    /**Sets the value of the Date-Form to the chosen date.
    */
    let d;
    let month_string;
    if(element.tagName == "DIV"){ d = element.innerHTML;}

    else if(element.tagName == "TD"){ d = element.children[0].innerHTML}
    else return;
    currentDay = parseInt(d) + firstDay - 1;
    
    
    if(parseInt(d)<10){
        d = "0"+ d
    }
    
    if(currentMonth+1<10){month_string = "0"+(currentMonth+1);}
    else{month_string = ""+(currentMonth+1);}
    form.children[0].value = `${currentYear}-${month_string}-${d}`;
}
/
function getFormValues(){
    let result = new Array();
    let date = document.getElementById("date_input")
    for (let i = 0; i<3;i++)
        {
        result.push(form.children[i].value);
        form.children[i].value = ""; 
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
