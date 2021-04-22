const counties = "https://data.mo.gov/resource/byps-gsbw.json",
    LawEnforcement = "https://data.mo.gov/resource/cgbu-k38b.json",
    ZipcodeData = "https://data.mo.gov/resource/8ejy-sj4q.json",
    FarmersMarkets = "https://data.mo.gov/resource/89zi-f2wa.json",
    UnemploymentRates = "https://data.mo.gov/resource/uaxb-77vv.json",
    uSUnemploymentRates = "https://data.mo.gov/resource/fks3-5x8k.json",
    GovernmentJob = "https://data.mo.gov/resource/83mm-j7ms.json",
    Url = GovernmentJob

const mainbuttons = document.getElementById('mainbuttons'),
    detailsSection = document.getElementById("details")

function getJobs() {
    fetch(`${Url}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(j => {
            populateButtons()
            j.forEach(e => {
                populateJobs(e)
            });

        })
}
getJobs()

const populateButtons = () => {
    let jobsBtn = document.createElement('button'),
        Usunemployment = document.createElement('button'),
        moUnemployment = document.createElement('button'),
        FarmersMarkets = document.createElement('button'),
        ZipcodeData = document.createElement('button'),
        LawEnforcement = document.createElement('button'),
        counties = document.createElement('button')

    mainbuttons.appendChild(jobsBtn)
    mainbuttons.appendChild(FarmersMarkets)
    mainbuttons.appendChild(LawEnforcement)
    mainbuttons.appendChild(moUnemployment)
    mainbuttons.appendChild(Usunemployment)
    mainbuttons.appendChild(counties)
    mainbuttons.appendChild(ZipcodeData)

    jobsBtn.innerHTML = "State Jobs"
    FarmersMarkets.innerHTML="Farmers Markets"
    LawEnforcement.innerHTML='LawEnforcement'
    moUnemployment.innerHTML='MO Unemployment'
    Usunemployment.innerHTML='US Unemployment'
    counties.innerHTML='Counties'
    ZipcodeData.innerHTML='Zipcode Data'
}

const populateJobs = (a) => {
    let div1 = document.createElement('div'),
        h3Tag = document.createElement('h3'),
        pTag = document.createElement('p'),
        h4Tag = document.createElement('h4')

    detailsSection.appendChild(div1)
    div1.appendChild(h3Tag)
    div1.appendChild(pTag)
    div1.appendChild(h4Tag)

    div1.className = 'moJobsDiv'
    h3Tag.innerHTML = a.title
    pTag.innerHTML = a.salarybasis
    h4Tag.innerHTML = a.salarystart
}