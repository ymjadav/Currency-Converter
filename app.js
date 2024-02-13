const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
  let amountInputEle = document.querySelector(".amount input");
  let amountVal = amountInputEle.value;
  if (amountVal === "" || amountVal < 1) {
    amountInputEle.value = 1;
    amountVal = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amountVal * rate;
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

for (let select of dropdowns) {
  for (currncyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currncyCode;
    newOption.value = currncyCode;
    if (select.name === "from" && currncyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currncyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let currncyCode = element.value;
  let countrycode = countryList[currncyCode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
