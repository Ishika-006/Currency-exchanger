const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let currMode = "light";
let rateCache = {};
btn.addEventListener("click",()=>{
    if (currMode =="light"){
        currMode="dark";
        document.querySelector(".container").style.backgroundColor="beige";
    }
    else{
        currMode="light";
        document.querySelector(".container").style.backgroundColor="rgb(227, 245, 220);";
    }
});

// for(code in countryList ){
//     console.log(code,countryList[code]);
// }
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



btn.addEventListener("click",async (evt)  => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }
    let base = fromCurr.value.toLowerCase();
    let target = toCurr.value.toLowerCase();

    try {
        let rates;

        if (rateCache[base]) {
            // cache hit
            rates = rateCache[base];
        } else {
            // cache miss → API call
            const URL = `${BASE_URL}/${base}.json`;
            let response = await fetch(URL);
            let data = await response.json();
            rates = data[base];
            rateCache[base] = rates; // save to cache
        }

        let rate = rates[target];
    if (!rate) {
        msg.innerText = `Conversion rate for ${fromCurr.value} to ${toCurr.value} not available.`;
        return;
    }

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
} catch (error) {
    console.error("Error fetching exchange rates:", error);
    msg.innerText = "Failed to fetch exchange rates. Please try again.";
}

    // let finalAmt = amtVal * rate;
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

});
