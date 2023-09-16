// select elements
let darkMode=document.querySelector(".header-content i")
let headerContent=document.querySelector(".header-content")
let searchInp=document.querySelector(".search input")
let searchInpPlace=document.getElementById("click")
let searchIcon=document.querySelector(".search-icon")
let main=document.querySelector("main")
let searchDiv=document.querySelector(".search")
let select=document.querySelector("select")
let divOfMain=document.querySelector(".main-content")
let filterSearch=document.querySelector(".filter-search")
// select elements for details page
let countryImage=document.querySelector(".country img")
let native=document.querySelector(".country .native span")
let countryPopulation=document.querySelector(".country .population span")
let countryRegion=document.querySelector(".country .region span")
let countrySubRegion=document.querySelector(".country .sub-region span")
let countryCapital=document.querySelector(".country .capital span")
let countryTopLevel=document.querySelector(".country .top-level-domain span")
let countryCurrencies=document.querySelector(".country .currencies span")
let countryLanguages=document.querySelector(".country .languages span")
let countryBorder=document.querySelector(".country .border-countries .buttons-container ")

let langs=''
let countryDetails=document.querySelector(".country-details")
let btn=document.querySelector(".country-details button")
let infosDiv=document.querySelector(".infos")

window.addEventListener("DOMContentLoaded",()=>{
let resp=new XMLHttpRequest();
resp.open("GET","data.json");
resp.send();
resp.onload=function(){
    if(this.readyState===4&&this.status===200){

        
        resp=JSON.parse(this.responseText)
        for(let i=0;i<resp.length;i++){
            
            countryDetails.style.cssText="display:none"
            
            // creating elements
            let divOfContent=document.createElement("div")
            let image=document.createElement("img")
            const divOfText=document.createElement("div")
            let countryName=document.createElement("h3")
            let population=document.createElement("p")
            let region=document.createElement("p")
            let capital=document.createElement("p")
            // styling the elements
            divOfText.style.cssText="padding: 25px;box-shadow: initial;"
            image.style.cssText=" width: 100%;height: 40%;"
            image.setAttribute("src",`${resp[i].flags.png}`)
            countryName.innerHTML=`${resp[i].name}`;
            population.innerHTML=`Population: ${resp[i].population}`;
            region.innerHTML=`Region: ${resp[i].region}`;
            capital.innerHTML=`Capital: ${resp[i].capital}`;
            // replacing El-Sahyna with palestine
            if(i===111){
                countryName.innerHTML=resp[171].name;
                image.setAttribute("src",`${resp[171].flags.png}`)
                population.innerHTML=`Population: ${resp[171].population}`;
                region.innerHTML=`Region: ${resp[171].region}`;
                capital.innerHTML=`Capital: ${resp[171].capital}`;
                
            }            
            // appending elements
            divOfContent.appendChild(image)            
            divOfContent.appendChild(divOfText)
            divOfText.appendChild(countryName)            
            divOfText.appendChild(population)            
            divOfText.appendChild(region)            
            divOfText.appendChild(capital)       
            divOfMain.appendChild(divOfContent)      
                // search for country details
            searchIcon.addEventListener("click",()=>{
                divOfMain.style.cssText="display: none;"    
                countryDetails.style.cssText="display:flex"
                filterSearch.style.cssText= "display: none;"
                if(searchInp.value==countryName.innerHTML){
                    countryImage.setAttribute("src",`${resp[i].flags.png}`)
                    native.innerHTML=`${resp[i].nativeName}`
                    countryPopulation.innerHTML=`${resp[i].population}`
                    countryRegion.innerHTML=`${resp[i].region}`
                    countrySubRegion.innerHTML=`${resp[i].subregion}`
                    countryCapital.innerHTML=`${resp[i].capital}`
                    countryTopLevel.innerHTML=`${resp[i].topLevelDomain}`
                    countryCurrencies.innerHTML=`${resp[i].currencies[0].name}`
                    
                    for(let j=0;j<(resp[i].languages).length;j++){
                        
                        langs+=`${resp[i].languages[j].name},`
                    }
                    if(langs!=null||langs!=""){
                        countryLanguages.innerHTML=langs.slice(0,langs.length-1);
                        langs=""
                    }
                    countryBorder.replaceChildren();
                    for(let j=0 ;j<resp[i].borders.length;j++){
                        
                        infosBtnS=document.createElement("button")
                        infosBtnS.innerHTML=`${resp[i].borders[j]}`
                        countryBorder.appendChild(infosBtnS)
                    }
                }
                            
            })
            // showing the details and hide the main page
            btn.addEventListener("click",()=>{
                
                function myFunction(x) {
                    if (x.matches) { // If media query matches
                        divOfMain.style.cssText="display: flex;"    
                        filterSearch.style.cssText= "display: initial;"
                        countryDetails.style.cssText="display:none"
                        
                    } else {
                        divOfMain.style.cssText="display: grid;"    
                        filterSearch.style.cssText= "display: grid;"
                        countryDetails.style.cssText="display:none"
                            }
                    }
                    
                var x = window.matchMedia("(max-width: 475px)")
                myFunction(x) // Call listener function at run time
                x.addListener(myFunction)
            })
            select.addEventListener("change",()=>{
                
                divOfContent.style.cssText="display:none;"
                // let divOfContent
                if(resp[i].region==select.value){
                    
                    // divOfMain.removeChildren()
                    divOfContent=document.createElement("div")
                    // styling the elements
                    divOfText.style.cssText="padding: 25px;box-shadow: initial;"
                
                    // appending elements
                    divOfContent.appendChild(image)            
                    divOfContent.appendChild(divOfText)
                    divOfText.appendChild(countryName)            
                    divOfText.appendChild(population)            
                    divOfText.appendChild(region)            
                    divOfText.appendChild(capital)
                    divOfMain.appendChild(divOfContent)     
                        
                    }
                    
                })
                
            }
            
            // Dark mode         
            darkMode.addEventListener("click",()=>{
                headerContent.style.cssText="background-color:hsl(209, 23%, 22%);color:white;"
                searchInp.style.cssText="background-color:hsl(209, 23%, 22%);color:white;"
                searchIcon.style.cssText="background-color:hsl(209, 23%, 22%);color:white;"
                select.style.cssText="background-color:hsl(209, 23%, 22%);color:white;"
                searchInpPlace.classList.add("dark")
                main.style.cssText="background-color:hsl(207, 26%, 17%);"
                btn.style.cssText="background-color:hsl(209, 23%, 22%);color:white;"
                infosDiv.style.cssText="color:white"
                let countryBorderBtns=document.querySelectorAll(".country .border-countries .buttons-container button ")
                countryBorderBtns.forEach(btn=>{
                    btn.classList.add("darkMode")
                })
                
            })
        }
    }
})
