function loadEvent(dateTime){
    //todo all times
    
    return localStorage.getItem(dateTime);
    
}


function saveEvent(date,eventString){
        if(localStorage.getItem(date)!=null){
            let eventList = JSON.parse(localStorage.getItem(date));
            eventList.push(eventString);
            localStorage.setItem(date,eventList);
        }
        else{
            localStorage.setItem(date,`[${eventString}]`);
        }

        console.log(localStorage);
        
        
}



