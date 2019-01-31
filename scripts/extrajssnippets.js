//create Elements
let addCityBoxDiv = document.createElement("div");
let addCityDiv= document.createElement("div");
let addBtnDiv = document.createElement("div");
let addHeader = document.createElement('h1');
let addBtn = document.createElement('button');

//Add Classes
addCityBoxDiv.className = "flex-container saved-city-box";
addCityDiv.className = "ripple";
addBtn.className = "ripple remove-saved-city";

//Get Elements
let savedCitiesDiv = document.querySelector("#saved-cities-wrapper");

//Append Nodes

addHeader.appendChild(document.createTextNode(locationInput.value));
addBtn.appendChild(document.createTextNode('-'));
addBtnDiv.appendChild(addBtn);
addCityDiv.appendChild(addHeader);
console.log(addCityDiv);
addCityBoxDiv.appendChild(addCityDiv);
console.log(addCityBoxDiv);
addCityBoxDiv.appendChild(addBtnDiv);
console.log(addCityBoxDiv);
console.log(addCityBoxDiv.parent);
savedCitiesDiv.appendChild(addCityBoxDiv);
addCityBtn.setAttribute('disabled', 'true');
addCityBtn.classList.add('disabled');
locationInput.value = "";
locationInput.focus();
