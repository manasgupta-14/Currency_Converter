const swapBtn = document.getElementById('swapIcon');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');
const resultBox = document.getElementById('resultBox');
const amountInput = document.getElementById('amountInput');

const apiKey = '25c93079357076a56bedceaf';

async function loadCurrencies() {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
        );

        const data = await response.json();

        if (data.result === "success") {
            
            fromCurrency.innerHTML = "";
            toCurrency.innerHTML = "";

            
            data.supported_codes.forEach(currency => {

                const code = currency[0];
                const name = currency[1];

                const option1 = document.createElement("option");
                option1.value = code;
                option1.textContent = `${code} - ${name}`;

                const option2 = document.createElement("option");
                option2.value = code;
                option2.textContent = `${code} - ${name}`;

                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });

            fromCurrency.value = "USD";
            toCurrency.value = "INR";
        }

    } catch (error) {
        console.error("Currency Load Error:", error);
    }
}
loadCurrencies();

swapBtn.addEventListener('click', () => {

    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    resultBox.style.transform = 'scale(1.03)';

    setTimeout(() => {
        resultBox.style.transform = 'scale(1)';
    }, 200);
});

// convertBtn.addEventListener('click', async () => {

//     let amount = amountInput.value;

//     if (amount === "" || amount <= 0) {
//         amount = 1;
//         amountInput.value = 1;
//     }

//     const originalText = convertBtn.innerHTML;

//     convertBtn.innerHTML =
//         '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

//     convertBtn.style.pointerEvents = 'none';

//     const from = fromCurrency.value;
//     const to = toCurrency.value;

//     try {

//         const response = await fetch(
//             `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
//         );

//         const data = await response.json();

//         if (data.result === "success") {

//             const exchangeRate = data.conversion_rates[to];

//             const totalAmount =
//                 (amount * exchangeRate).toFixed(2);

//             const formattedAmount =
//                 Number(totalAmount).toLocaleString('en-IN', {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2
//                 });

//             const selectedOption =
//                 toCurrency.options[toCurrency.selectedIndex];

//             const currencyName =
//                 selectedOption.textContent.replace(`${to} - `, '');

//             resultText.innerHTML = `
//                 ${formattedAmount} ${to}
//                 <br>
//                 <span style="font-size:16px;color:#aaa;">
//                     (${currencyName})
//                 </span>
//             `;

//         } else {
//             resultText.innerHTML = "Error Fetching Rate!";
//         }

//     } catch (error) {

//         resultText.innerHTML = "Network Error!";
//         console.error(error);

//     } finally {

//         convertBtn.innerHTML = originalText;
//         convertBtn.style.pointerEvents = 'auto';

//         resultBox.style.borderColor =
//             'rgba(0,210,255,0.4)';

//         setTimeout(() => {

//             resultBox.style.borderColor =
//                 'rgba(255,255,255,0.05)';

//         }, 600);
//     }
// });
// amountInput.addEventListener('keypress', function (e) {

//     if (e.key === 'Enter') {
//         convertBtn.click();
//     }

// });