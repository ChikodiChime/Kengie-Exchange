const fromCurrencyOptions = document.querySelector('.from-currency select')
const toCurrencyOptions = document.querySelector('.to-currency select')
const fromAmount = document.querySelector('.from-amount input');
const fromResult = document.getElementById('from-result');
const toResult = document.getElementById('to-result'); 
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
let rateCurrency = document.querySelector('.currency');
const rateAmount = document.querySelector('.amount');
const rateChange = document.querySelector('.change');
let rowp = document.querySelector('.rates')
let div = document.createElement('div');
div.classList = 'row';
async function loadCountrySymbols(){
    const API_URL = 'https://api.exchangerate.host/symbols'
    const result = await fetch(API_URL);
    const data = await result.json();
    // console.log(data.rates)
    let symbolList = data.symbols;
    showData(symbolList);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCountrySymbols();
})
function showData(symbols){
    let symbolsOnly = Object.keys(symbols);
    // console.log(symbolsOnly)
    let html = '';
    symbolsOnly.forEach(symbol => {
        html += `<option data-id ='${symbol}'>${symbol}</option>`
    })

    const optionList = document.querySelectorAll('select')
    for(let i = 0; i<optionList.length; i++){
        optionList[i].addEventListener('change',(e) =>{
            loadFlag(e.target)
        })
    }

    fromCurrencyOptions.innerHTML = html;
    fromCurrencyOptions.querySelectorAll('option').forEach(option => {
        if(option.dataset.id == 'USD') option.selected = 'selected'
    });
    toCurrencyOptions.innerHTML = html;
    toCurrencyOptions.querySelectorAll('option').forEach(option => {
        if(option.dataset.id == 'EUR') option.selected = 'selected'
    })
}
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            const imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://flagcdn.com/${country_list[code].toLowerCase()}.svg`
        }
    }
}

// validate the amount to be converted
fromAmount.addEventListener('keyup', function(){
    let amount = Number(this.value);
    if(!amount) fromAmount.style.borderColor = '#de3f44' 
    else fromAmount.style.borderColor = 'rgb(156, 140, 109)'
})

convertBtn.addEventListener('click', () => {
    let fromCurrency = fromCurrencyOptions.value
    let toCurrency = toCurrencyOptions.value;
    // console.log(fromCurrency, toCurrency);
    let fromAmt = Number(fromAmount.value)
    if(fromAmt) getConvertedData(fromCurrency, toCurrency, fromAmt);
});

//get converted data from API
async function getConvertedData(from, to, amount){
const API_URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
const result = await fetch(API_URL);
const data = await result.json()
// console.log(data.result)

displayConvertedData(from, to, amount, data.result);
}

//display the converted result
function displayConvertedData(fromCurrency, toCurrency, fromAmt, toAmt){
    console.log(fromCurrency, toCurrency, fromAmt, toAmt)
    fromResult.innerHTML = `${fromAmt.toFixed(2)} ${fromCurrency}`;
    toResult.innerHTML = `${toAmt.toFixed(2)} ${toCurrency}`;
}

//swap or reverse the currency
swapBtn.addEventListener('click', () => {
    let fromIndex = fromCurrencyOptions.selectedIndex;
    let toIndex = toCurrencyOptions.selectedIndex;
    fromCurrencyOptions.querySelectorAll('option')[toIndex].selected = 'selected';
    toCurrencyOptions.querySelectorAll('option')[fromIndex].selected = 'selected';
    loadFlag(fromCurrencyOptions)
    loadFlag(toCurrencyOptions)
})






