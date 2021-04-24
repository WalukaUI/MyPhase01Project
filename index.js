
const counties = "https://data.mo.gov/resource/byps-gsbw.json",
    LawEnforcements = "https://data.mo.gov/resource/cgbu-k38b.json",
    ZipcodeData = "https://data.mo.gov/resource/8ejy-sj4q.json",
    FarmersMarketss = "https://data.mo.gov/resource/89zi-f2wa.json",
    UnemploymentRates = "https://data.mo.gov/resource/uaxb-77vv.json",
    uSUnemploymentRates = "https://data.mo.gov/resource/fks3-5x8k.json",
    GovernmentJob = "https://data.mo.gov/resource/83mm-j7ms.json",

    mainbuttons = document.getElementById('mainbuttons'),
    detailsSection = document.getElementById("details"),
    serchvalue = document.getElementById('allSerch'),
    formBtn = document.getElementById('submits')


//create main buttons 

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
    jobsBtn.value = GovernmentJob
    FarmersMarkets.innerHTML = "Farmers Markets"
    FarmersMarkets.value = FarmersMarketss
    LawEnforcement.innerHTML = 'LawEnforcement'
    LawEnforcement.value = LawEnforcements
    moUnemployment.innerHTML = 'MO Unemployment'
    Usunemployment.innerHTML = 'US Unemployment'
    counties.innerHTML = 'Counties'
    ZipcodeData.innerHTML = 'Zipcode Data'
}

//fletch  data 

function getApiData(a) {
    fetch(`${a}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(j => {
            mainbuttons.innerHTML = ""
            populateButtons()
            Listener()
            j.forEach(e => {
                if (a === GovernmentJob) {
                    populateJobs(e)
                } else if (a === FarmersMarketss) {
                    populateFarmersdata(e)
                } else if (a === LawEnforcements) {
                    populateLawEnforcements(e)
                }

            });
        })
}


//Display governmentJob results on DOM

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
    pTag.innerHTML = a.jobdescription
    pTag.maxlength = "10"
    h4Tag.innerHTML = `${a.salarybasis} : ${a.salarystart}`
}

//Display Farmersdata results on DOM
const populateFarmersdata = (a) => {
    let div1 = document.createElement('div'),
        h3Tag = document.createElement('h3'),
        pTag = document.createElement('p'),
        h4Tag = document.createElement('h4')

    detailsSection.appendChild(div1)
    div1.appendChild(h3Tag)
    div1.appendChild(pTag)
    div1.appendChild(h4Tag)

    div1.className = 'moJobsDiv'
    h3Tag.innerHTML = `City: ${a.city}`
    pTag.innerHTML = `Company: ${a.business_name}`
    pTag.maxlength = "10"
    h4Tag.innerHTML = a.location_description

}

//Display LawEnforcements results on DOM
const populateLawEnforcements = (a) => {
    let div1 = document.createElement('div'),
        h3Tag = document.createElement('h3'),
        pTag = document.createElement('p'),
        h4Tag = document.createElement('h4')

    detailsSection.appendChild(div1)
    div1.appendChild(h3Tag)
    div1.appendChild(pTag)
    div1.appendChild(h4Tag)

    div1.className = 'moJobsDiv'
    h3Tag.innerHTML = `${a.name}/${a.city}`
    pTag.innerHTML = `Contact Number: ${a.voice_number}`
    h4Tag.innerHTML = `Address : ${a.street_address_2}`
}

//create listner on click to main buttons and change InnerHTML in search input

function Listener() {
    const btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener('click', (x) => {
            document.getElementById('lable').innerHTML = `Search ${x.target.innerHTML}`
            let aPI = x.target.value
            detailsSection.innerHTML = ""
            getApiData(aPI)
            search(aPI)
        })
    }
}

// Taking search values 

const search = (y) => {
    console.log(y);
    formBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let x = serchvalue.value
        serchResult(x, y);
    })
}

// Flecting search values and calling functions to display results on DOM
const serchResult = (x, y) => {
    fetch(`${y}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(j => {
            detailsSection.innerHTML = ""
            let foundResult = []
            foundResult.length = 0
            for (let i = 0; i < j.length; i++) {
                if (y === GovernmentJob) {
                    if (j[i].title === x) {
                        foundResult.push(j[i])
                        populateJobs(j[i])
                    }
                } else if (y === FarmersMarketss) {
                    if (j[i].city === x) {
                        foundResult.push(j[i])
                        populateFarmersdata(j[i])
                    }
                } else if (y === LawEnforcements) {

                }

            }
            if (foundResult.length === 0) {
                let h3list = document.createElement('h3')
                detailsSection.appendChild(h3list)
                h3list.innerHTML = `Not found result for "${x}"`
            }
            for (let i = 0; i < j.length; i++) {
                if (j[i].title !== x) {
                    createjobList(j[i], x)
                }
            }
        })
}

// If search couldn't find any results

const createjobList = (e) => {

    let uL = document.createElement('il'),
        lI = document.createElement('li')
    aTag = document.createElement('a')

    detailsSection.appendChild(uL)
    uL.appendChild(lI)
    lI.appendChild(aTag)

    aTag.innerHTML = e.title
    aTag.href = e.joburl.url
    aTag.target = "blank"
}



//Starting function
document.addEventListener('DOMContentLoaded', function () {
    getApiData(GovernmentJob)
})

