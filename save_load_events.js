function loadAppointments(currentMonth,currentYear){
    let year_map = localStorage.getItem("year_map")
    
    return year_map.get(currentYear)[currentMonth];
    
}

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

const year = (new Date()).getFullYear()

let year_map = new Map();
year_map.set(year,getEmptyMonthArray()) 



function saveAppointment(app){
    
    const year = app.date.getFullYear();
    const month = app.date.getMonth();
    const day = app.date.getDate();
    console.log(year_map);
    
    let yearArray = year_map.get(year) 
    yearArray[month][day].push(app)
    
    //year_map.set(year,yearArray) 
    console.log(year_map);

    const StringForSaving = JSON.stringify(year_map)
    localStorage.setItem("year_map",year_map)
}



