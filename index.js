

const url = "https://data.usajobs.gov/api/jobs?Title=Explosive"

function getJobs(){
    fetch(`${url}`,{
        method:'GET',
        headers:{
           //"Access-Control-Allow-Origin":"*",
            "Content-Type": "application/json",
            "Accept": "application/json"
            
        }
    })
    .then(res=>res.json())
    .then(json=> {
        console.log(json)})
}
getJobs()

// function localStorage(a){
// a.forEach(e => {
//     if(e.area_name==="ST. FRANCOIS COUNTY"){
//         console.log(e);
//         console.log(e.period_type);
//     }
// });
// }