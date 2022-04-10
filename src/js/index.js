const accumulatedTip = (function(tip) {
    let totalTip = 0;
    return function(t) {
        totalTip += t;
        console.log(totalTip)
        document.querySelector('#total-amt').textContent = `$${totalTip.toFixed(2)}`;
        return totalTip;
    }
    
})();

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

document.querySelector('#tip-form').addEventListener('keypress', submitBill);
function submitBill(e) {
    // console.log(e.keyCode);
    const percentSelection = document.querySelectorAll('.tip-percentage--btn');
    for(let i = 0; i != 5; i++) {
        if(e.keyCode === 32 && percentSelection[i] === e.target) {
            percentSelection[i].classList.add('active');
        }
    }

    if(e.keyCode === 13) {
        const customerBill = document.querySelector('#bill-input').value,
              tipPercentage = document.querySelector('button.active').value,
              numOfPeople = document.querySelector('#num-of-people').value,
              bill = new Tip(customerBill, tipPercentage, numOfPeople);

        // console.log(bill.computeTip());
        accumulatedTip(bill.computeTip());
        document.querySelector('#tip-amt').textContent = `$${bill.computeTip().toFixed(2)}`
    }
}

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