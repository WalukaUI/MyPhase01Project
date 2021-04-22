//const counties = "https://data.mo.gov/resource/byps-gsbw.json"
//const LawEnforcement = "https://data.mo.gov/resource/cgbu-k38b.json"
//const ZipcodeData = "https://data.mo.gov/resource/8ejy-sj4q.json"
//const FarmersMarkets = "https://data.mo.gov/resource/89zi-f2wa.json"
//const UnemploymentRates ="https://data.mo.gov/resource/uaxb-77vv.json"
//const uSUnemploymentRates = "https://data.mo.gov/resource/fks3-5x8k.json"
const GovernmentJob ="https://data.mo.gov/resource/83mm-j7ms.json"
const Url=GovernmentJob

const mainbuttons=document.getElementById('mainbuttons')

function getJobs() {
    fetch(`${Url}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        } 
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            populateButtons()
            populateJobs(json)
        })
}
getJobs()


const populateButtons=()=>{
    let jobsBtn=document.createElement('button')
    mainbuttons.appendChild(jobsBtn)
    jobsBtn.innerHTML="State Jobs"
}




const populateJobs= (a)=>{

}