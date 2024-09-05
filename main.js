const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_G9iAkvUipsM4Csbztr18AdQWXVGOuLiHLQlxheV6&currencies=";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (const select of dropdowns) {
    for (const currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerHTML = currCode;
        newOption.value = currCode;


        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = true;
        }

        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if (amountValue == '' || amountValue < 1) {
        amountValue = 1;
        amount.value = 1;
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}${fromCurr.value}%2C${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    // Access the exchange rates for both currencies
    let fromCurrencyData = data.data[fromCurr.value].value;
    let toCurrencyData = data.data[toCurr.value].value;

    let totalAmount = amountValue * toCurrencyData;

    msg.innerHTML = `${amountValue} ${fromCurr.value} = ${totalAmount.toFixed(2)} ${toCurr.value}`


})