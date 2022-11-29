// DOM
const elThemeButton = document.querySelector(".head-btn");
const elForm = document.querySelector(".js-form");
const elSelectRegion = document.querySelector(".js-select");
const elSearchInp = document.querySelector(".js-search");
const elTemplate = document.querySelector(".js-temp").content;
const elFragment = document.createDocumentFragment();
const elList = document.querySelector(".hero-list");

// Function
function drakMode() {
    if(document.body.classList.contains("theme-dark")) {
        document.body.classList.remove("theme-dark");
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode")
    }
    else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("theme-dark");
        localStorage.setItem("theme", "theme-dark")
    }
}
document.body.classList.add(localStorage.getItem("theme"));

function renderCountries(arr) {
    arr.forEach(item => {
        elList.innerHTML = ""
        const elTemplateClone = elTemplate.cloneNode(true);
        
        elTemplateClone.querySelector(".item-img").src = item.flags.svg;
        elTemplateClone.querySelector(".item-img").alt = item.name.common;
        elTemplateClone.querySelector(".hero-title").textContent = item.name.common;
        elTemplateClone.querySelector(".hero-span").textContent = item.population;
        elTemplateClone.querySelector(".hero-span1").textContent = item.region;
        elTemplateClone.querySelector(".hero-span").textContent = item.capital;
        elTemplateClone.querySelector(".js-btn").dataset.modalId = item.name.common;
        elFragment.appendChild(elTemplateClone)
    });
    elList.appendChild(elFragment)
}
//  MODAL
const countriesArr = []
function renderModal(arr) {
    document.querySelector(".item-img1").src = arr.flags.svg;
    document.querySelector(".item-img1").alt = arr.name.common;
    document.querySelector(".hero-span3").textContent = arr.region;
    document.querySelector(".hero-span4").textContent =  Object.values(arr.languages)[0];
    document.querySelector(".hero-span5").textContent = Object.values(arr.currencies)[0].name;
    document.querySelector(".hero-span6").textContent = arr.subregion;
    document.querySelector(".hero-span6").textContent = arr.borders;
    document.querySelector(".map-link").href = arr.maps.googleMaps;
}

async function getCountries(url) {
    try {
        const rec = await fetch(url);
        
        const data = await rec.json();
        
        renderCountries(data);
        data.forEach(item => {
            countriesArr.push(item)
        })
    } catch (error) {
        console.log(error);
    }
}

// Ligth Mode , Dark Mode
elThemeButton.addEventListener("click" , function(){
    drakMode();
})

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    const elSearchInpValue = elSearchInp.value.trim();
    
    getCountries(`https://restcountries.com/v3.1/name/${elSearchInpValue}`)
})

elSelectRegion.addEventListener("change", function(){
    const elSelectRegionValue = elSelectRegion.value.trim();
    getCountries(`https://restcountries.com/v3.1/region/${elSelectRegionValue}`);
})

elList.addEventListener("click", function(evt) {
    if (evt.target.matches(".js-btn")) {
        const newModal = evt.target.dataset.modalId;
        const findModal = countriesArr.find(item => newModal === item.name.common);
        renderModal(findModal)
    }
})

getCountries("https://restcountries.com/v3.1/all");