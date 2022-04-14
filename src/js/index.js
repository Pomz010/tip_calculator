// Use local Storage to store tip entries
// use reload() to reset values for bill and number of person entries

class Tip {
    constructor(customerBill, tipPercentage, numOfPeople) {
        this.customerBill = customerBill;
        this.tipPercentage = tipPercentage;
        this.numOfPeople = numOfPeople;
    }

    computeTip() {
        const tipAmount = (this.customerBill * this.tipPercentage) / this.numOfPeople;
        return tipAmount;
    }
}

// Add event listener for pressing space when selecting tip percentage and enter when submitting tip entries
document.querySelector('#tip-form').addEventListener('keypress', submitBill);
function submitBill(e) {
    console.log(e.keyCode);
    const percentSelection = document.querySelectorAll('.tip-percentage--btn');

    // Selecting tip percentage by pressing space bar on keyboard
    for(let i = 0; i != 5; i++) {
        if(e.keyCode === 32 && percentSelection[i] === e.target) {
            percentSelection[i].classList.add('active');
        }
    }

    // Submitting tip entries by presssing enter on keyboard
    if(e.keyCode === 13) {
        const customerBill = document.querySelector('#bill-input'),
              tipPercentage = document.querySelector('button.active'),
              numOfPeople = document.querySelector('#num-of-people'),
              errorContainer = document.querySelector('#num-of-people__header-container'),
              numOfPpolError = document.createElement('span'),
              errorAlert = document.createTextNode(`Can't be zero`),
              errorParentElement = document.querySelector('#num-of-people');

        // Display alert error if "Number of People" field is empty or zero
        while((numOfPeople.value === '') && document.querySelector('#error-number') === null) {
            numOfPpolError.setAttribute('id', 'error-number');
            numOfPpolError.appendChild(errorAlert);
            numOfPpolError.style.color = 'rgb(250, 130, 75)';  
            errorContainer.appendChild(numOfPpolError);
            errorParentElement.classList.add('people-input');
            console.log(e);
        } 
        

        // Remove alert error if user finally enters value to "Number of People" field greater than zero
        if((numOfPeople.value !== '') && document.querySelector('#error-number') !== null) {
            bill = new Tip(customerBill.value, tipPercentage.value, numOfPeople.value);
            document.querySelector('#error-number').remove();
            errorParentElement.classList.remove('people-input');

            console.log(typeof numOfPeople.value[0]);
            accumulatedTip(bill.computeTip());
            document.querySelector('#tip-amt').textContent = `$${bill.computeTip().toFixed(2)}`;
            console.log(e);
       
        // If user submits tip entries providing all required values, then proceed to tip computation 
        } else if(numOfPeople.value !== ''){
            bill = new Tip(customerBill.value, tipPercentage.value, numOfPeople.value);
            console.log(typeof numOfPeople.value[0]);
            accumulatedTip(bill.computeTip());
            document.querySelector('#tip-amt').textContent = `$${bill.computeTip().toFixed(2)}`;
            console.log(e);
        }
    }
}

// Closure function for accumulated tip per person
const accumulatedTip = (function(tip) {
    let totalTip = 0;
    return function(t) {
        totalTip += t;
        document.querySelector('#total-amt').textContent = `$${totalTip.toFixed(2)}`;
        return totalTip;
    }
})();

// Alternative way in selecting tip percentage using mouse click instead of pressing space bar
document.querySelector('#percentage-selection').addEventListener('click', selectPercentage);
function selectPercentage(e) {
    const percentSelection = document.querySelectorAll('.tip-percentage--btn');
    for(let i = 0; i != 5; i++) {
        if(percentSelection[i] === e.target) {
            percentSelection[i].classList.add('active');
        } else {
            percentSelection[i].classList.remove('active');
        }
    }
}

// Prevent user to enter 0(string) as first character in "Bill" and "Number of People" field
document.querySelector('#bill-input').addEventListener('keydown', billEntry);
document.querySelector('#num-of-people').addEventListener('keydown', billEntry);

// document.querySelector('#bill-input').addEventListener('keydown', billEntry);

// Function that will pass the number typed by the user in "Bill" field
// -> in billEntry closure function to validate if first digit entered is
// -> zero or not.
function billEntry(e) {

    const realNumber = Number(e.key);

    if(isNaN(realNumber)) {
        // console.log(true);
        isZero(null);
        return;
    } else {
        // console.log(false);
        e.returnValue = isZero(realNumber);
    }
}

// Closure function that will contain number entered in bill
// -> then validates if first digit entered by the user is 0.
const isZero = (function(digit) {

    // Array container for number entered in bill 
    const billArray = [];

    // Function that will push number to billArray
    return function(digit) {

        // Check if first digit entered is zero.
        // If number is zero and first index of array is equal to zero
        // -> then it won't accept the number
        if(digit === 0 && billArray[0] === 0) {
            // console.log(billArray);
            return false;
        

        // if first index of billArray is greater than zero and digit value is not
        // -> equal to null then digit entered will be stored to array container.
        } else if(digit !== null && billArray[0] > 0) {
            billArray.push(digit);
            // console.log(billArray);
            return true;

        // if digit entered is greater than zero and array container is still empty
        // -> then digit will be stored to array container
        } else if(digit > 0) {
            billArray.push(digit);
            // console.log(billArray);
            return true;

        // Else if first digit is not zero, it will accept the number
        // -> and display the number in "Bill" field.
        } else if(digit === null){
            billArray.pop();
            // console.log(billArray);
            return true;
        }
    }
})();