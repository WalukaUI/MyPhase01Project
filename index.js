
const countiess = "https://data.mo.gov/resource/byps-gsbw.json",
    LawEnforcements = "https://data.mo.gov/resource/cgbu-k38b.json",
    ZipcodeDatas = "https://data.mo.gov/resource/8ejy-sj4q.json",
    FarmersMarketss = "https://data.mo.gov/resource/89zi-f2wa.json",
    UnemploymentRates = "https://data.mo.gov/resource/uaxb-77vv.json",
    uSUnemploymentRates = "https://data.mo.gov/resource/fks3-5x8k.json",
    GovernmentJob = "https://data.mo.gov/resource/83mm-j7ms.json",

    mainbuttons = document.getElementById('mainbuttons'),
    detailsSection = document.getElementById("details"),
    serchvalue = document.getElementById('allSearch'),
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
    LawEnforcement.innerHTML = 'Law Enforcement Agencies'
    LawEnforcement.value = LawEnforcements
    moUnemployment.innerHTML = 'MO Unemployment'
    moUnemployment.value=UnemploymentRates
    Usunemployment.innerHTML = 'US Unemployment'
    Usunemployment.value=uSUnemploymentRates
    counties.innerHTML = 'Counties'
    counties.value=countiess
    ZipcodeData.innerHTML = 'Zipcode Data'
    ZipcodeData.value=ZipcodeDatas
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
                }else if(a===UnemploymentRates){
                   populateUnemploymentRates(e)    
                }else if(a===uSUnemploymentRates){
console.log(e);
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
        h4Tag1 = document.createElement('h4')
        pTag = document.createElement('p'),
        h4Tag2 = document.createElement('h4')

    detailsSection.appendChild(div1)
    div1.appendChild(h3Tag)
    div1.appendChild(h4Tag1)
    div1.appendChild(pTag)
    div1.appendChild(h4Tag2)

    div1.className = 'moJobsDiv'
    h3Tag.innerHTML = a.name
    h4Tag1.innerHTML=`City Name: ${a.city}`
    pTag.innerHTML = `Contact Number: ${a.voice_number}`
    h4Tag2.innerHTML = `Address : ${a.street_address_2}`
}
//Display Unemployment data of MO on DOM
const populateUnemploymentRates=(a)=> {
    let div1 = document.createElement('div'),
        h3Tag = document.createElement('h3'),
        h4Tag1 = document.createElement('h4')
        pTag = document.createElement('p'),
        h3Tag2 = document.createElement('h3')

    detailsSection.appendChild(div1)
    div1.appendChild(h3Tag)
    div1.appendChild(h4Tag1)
    div1.appendChild(pTag)
    div1.appendChild(h3Tag2)

    div1.className = 'moJobsDiv'
    h3Tag.innerHTML = a.area_name
    h4Tag1.innerHTML=`Rate: ${a.unemployment_rate}`
    pTag.innerHTML = `Year: ${a.year}`
    h3Tag2.innerHTML = `Laborforce : ${a.laborforce}`
}



//create listner on click to main buttons and change InnerHTML in search input

function Listener() {
    const btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener('click', (x) => {
            document.getElementById('lable').innerHTML = `Search ${x.target.innerHTML}`
            let aPI = x.target.value
            serchvalue.name=aPI
            detailsSection.innerHTML = ""
            serchvalue.value=""
            getApiData(aPI)
            search()
        })
    }
}

// Taking search values 

const search = () => {
    formBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let x = serchvalue.value
        serchResult(x);
    })
}

// Flecting search values and calling functions to display results on DOM
const serchResult = (x) => {
    let y=serchvalue.name
    console.log(y)
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
                    if (j[i].city === x) {
                        foundResult.push(j[i])
                        populateLawEnforcements(j[i])
                    }
                }

            }
            if (foundResult.length === 0) {
                let h3list = document.createElement('h3'),
                    resultImg = document.createElement('img')
                detailsSection.appendChild(resultImg)
                detailsSection.appendChild(h3list)

                h3list.innerHTML = `Not Result Found  for "${x}"  SEARCH AGAIN`
                resultImg.src = "https://media.giphy.com/media/keamSClApOmrii5HEt/giphy.gif"
            }
        })
}


//Starting function
document.addEventListener('DOMContentLoaded', function () {
    getApiData(GovernmentJob)
})

