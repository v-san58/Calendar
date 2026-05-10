
const year = (new Date()).getFullYear()

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



let year_map = new Map();
year_map.set(year,getEmptyMonthArray()) 



function saveAppointment(app){
    
    const year = app.date.getFullYear();
    const month = app.date.getMonth();
    const day = app.date.getDate();
    
    
    
    if(!year_map.has(year)){
        year_map.set(year, getEmptyMonthArray());
    }
    let yearArray = year_map.get(year) 
    yearArray[month][day-1].push(app)
    //year_map.set(year,yearArray) 
    

    const StringForSaving = JSON.stringify([...year_map])
    localStorage.setItem("year_map",StringForSaving)
}


function loadAppointments(currentMonth,currentYear){
    
    const saved = localStorage.getItem("year_map");
    if(!saved)
        return getEmptyMonthArray[0]
    const year_map = new Map(JSON.parse(saved));

    return year_map.get(currentYear)[currentMonth];
    
}
