const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let selects = document.querySelectorAll(".dropdown select");
let cnvrtBtn = document.querySelector("form button");
let amount = document.querySelector(".amount input");
let alert = document.querySelector(".alert");

for (let select of selects) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;
        select.append(newOption);

        if (select.name === "from" && newOption.value === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && newOption.value === "INR") {
            newOption.selected = "selected";
        }

    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

let convertCurrency = async () => {
    let fromCode = document.querySelector(".from select").value;
    let toCode = document.querySelector(".to select").value;
    let msg = document.querySelector("#msg");

    let amuntVal = amount.value;
    if (amuntVal === "" || Number(amuntVal) < 1) {
        if(amuntVal === ""){
            alert.innerHTML = "<span class='alertText'>Do note leave input field empty.</span>";
        }else{
            alert.innerHTML = "<span class='alertText'>Enter amount greater than 0.</span>";
        }
        amuntVal = 1;
        amount.value = "1";
        alert.classList.remove("disp");
    }

    let url = `${BASE_URL}/${fromCode.toLowerCase()}/${toCode.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeRate = data[toCode.toLowerCase()];

    let finalAmount = amuntVal * exchangeRate;
    msg.innerText = `${amuntVal} ${fromCode} = ${finalAmount} ${toCode}`;
}

cnvrtBtn.addEventListener("click", (event) => {
    event.preventDefault();
    convertCurrency();
});

amount.addEventListener("focus", () => {
    alert.classList.add("disp");
})

window.addEventListener("load", () => {
    convertCurrency();
});