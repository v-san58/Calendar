


function getEmptyMonthArray(){
    let res = new Array() 
    for (let i = 0;i<12;i++){
        let days = new Array()
        for (let j = 0;j<31;j++){
            days.push(new Array())
        }
        res.push(days)
    }
    return res
}
let year_map;


function saveAppointment(app){
    
    
    const year = app.date.getFullYear();
    const month = app.date.getMonth();
    const day = app.date.getDate();
    
    
    if (!year_map){
        year_map = new Map();
        year_map.set(currentYear,getEmptyMonthArray())
    }
    else if(!year_map.has(year)){
        year_map.set(year, getEmptyMonthArray());
    }
    let yearArray = year_map.get(year) 
    yearArray[month][day-1].push(app)
    //year_map.set(year,yearArray) 
    

    const StringForSaving = JSON.stringify([...year_map])
    localStorage.setItem("year_map",StringForSaving)
    console.log("save");
    
}


saveCurrentMap = ()=> {
    const StringForSaving = JSON.stringify([...year_map])
    localStorage.setItem("year_map",StringForSaving)
}

function removeAppFromLocalStorage(button_element){
    const app_num = parseInt(button_element.target.parentElement.id.split("_")[2]);
    const currentDay = parseInt(button_element.target.parentElement.id.split("_")[4]);
    console.log(app_num,currentDay);
    
    year_map.get(currentYear)[currentMonth][currentDay].splice(app_num, 1); 
    saveCurrentMap()
}

function loadAppointments(currentMonth,currentYear){
    
    const saved = localStorage.getItem("year_map");
    
    
    if(!saved){
        year_map = new Map();
        year_map.set(currentYear,getEmptyMonthArray()) 
    }
    
    else{
        year_map = new Map(JSON.parse(saved));
    }
    
    if(!year_map.has(currentYear)){
        year_map.set(currentYear, getEmptyMonthArray());
    }

    return year_map.get(currentYear)[currentMonth];
    
}
