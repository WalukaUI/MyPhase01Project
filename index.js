const counties = "https://data.mo.gov/resource/byps-gsbw.json",
    LawEnforcement = "https://data.mo.gov/resource/cgbu-k38b.json",
    ZipcodeData = "https://data.mo.gov/resource/8ejy-sj4q.json",
    FarmersMarkets = "https://data.mo.gov/resource/89zi-f2wa.json",
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
    FarmersMarkets.innerHTML = "Farmers Markets"
    LawEnforcement.innerHTML = 'LawEnforcement'
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
            (x.target.innerHTML === "State Jobs" ? search() : null)

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
            //Listener()
            j.forEach(e => {
                if (x === e.title) {
                    populateJobs(e)
                } else {
                    console.log(e);
                    createjobList(e, x)
                }
            });
        })
}

const createjobList = (e, x) => {
    let H3 = document.createElement('h3'),
        uL = document.createElement('il'),
        lI = document.createElement('li')
        aTag=document.createElement('a')

    detailsSection.appendChild(H3)
    detailsSection.appendChild(uL)
    uL.appendChild(lI)
    lI.appendChild(aTag)
    H3.innerHTML = `Unfortunatly could't find any job of ${x}`
    aTag.innerHTML = e.title
    aTag.href=e.joburl.url
    aTag.target="blank"
}

document.addEventListener('DOMContentLoaded', () => {
    getJobs(GovernmentJob)
})

// $(document).on("click",function(){
//     $("h1").slideUp("slow",function (){animate({speed:0.1});});
//   });
