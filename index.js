const counties = "https://data.mo.gov/resource/byps-gsbw.json",
    LawEnforcements = "https://data.mo.gov/resource/cgbu-k38b.json",
    ZipcodeData = "https://data.mo.gov/resource/8ejy-sj4q.json",
    FarmersMarketss = "https://data.mo.gov/resource/89zi-f2wa.json",
    UnemploymentRates = "https://data.mo.gov/resource/uaxb-77vv.json",
    uSUnemploymentRates = "https://data.mo.gov/resource/fks3-5x8k.json",
    GovernmentJob = "https://data.mo.gov/resource/83mm-j7ms.json",

    mainbuttons = document.getElementById('mainbuttons'),
    detailsSection = document.getElementById("details"),
    serchvalue = document.getElementById('allSerch')

function getJobs(a) {
    fetch(`${a}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(j => {
            populateButtons()
            Listener()
            j.forEach(e => {
                populateJobs(e)
                serchvalue.name = a
            });
        })
}

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
    LawEnforcement.value=LawEnforcements
    moUnemployment.innerHTML = 'MO Unemployment'
    Usunemployment.innerHTML = 'US Unemployment'
    counties.innerHTML = 'Counties'
    ZipcodeData.innerHTML = 'Zipcode Data'
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
    pTag.innerHTML = a.jobdescription
    pTag.maxlength = "10"
    h4Tag.innerHTML = `${a.salarybasis} : ${a.salarystart}`
}

function Listener() {
    const btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {
        
        btns[i].addEventListener('click', (x) => {
            document.getElementById('lable').innerHTML=`Search ${x.target.innerHTML}`
            //x.target.style.backgroundColor="green"
            search()


            // if(x.target.innerHTML === "State Jobs"){
            //     document.getElementById('lable').innerHTML=`Search ${x.target.innerHTML}`
            //    // x.target.style.backgroundColor="green"
            //     
            // }else if(x.target.innerHTML === "Farmers Markets"){
            //     //x.target.style.backgroundColor="green"
            //     document.getElementById('lable').innerHTML=`Search ${x.target.innerHTML}`
            // }else{
            //     x.target.style.backgroundColor="red"
            // }
        })
    }
}
const formBtn = document.getElementById('submits')
const search = () => {
    formBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let x = serchvalue.value
        let y = serchvalue.name
        serchResult(x, y);
    })
}
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
            for (let i = 0; i < j.length; i++) {
                if (j[i].title === x) {
                    foundResult.length = 0
                    foundResult.push(j[i])
                    populateJobs(j[i])
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

const createjobList = (e, x) => {

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

document.addEventListener('DOMContentLoaded', () => {
    getJobs(GovernmentJob)
})


