const billEl = document.querySelector('.bill__inp');
const numPeopleEl = document.querySelector('.numpeople__inp');
const totalEl = document.querySelector('.total');
const tipAmountEl = document.querySelector('.tip__amount');
const errorMessageEl = document.querySelector('.error__message');

const tipsButtons = document.querySelectorAll('.tip__inp');
const resetButton = document.querySelector('.btn__reset');

const showError = (msg) => {
  errorMessageEl.style.display = 'block';
  errorMessageEl.classList.add('error');
  errorMessageEl.textContent = msg;
};

const calcTip = () => {
  tipsButtons.forEach(button => {   
    button.addEventListener('click', e => {
      e.preventDefault();

      const tipPercentageStr = button.classList.contains('active') ? button.textContent : button.id === 'customInp' ? e.target.value : e.target.innerText;
      const billValueStr = billEl.value;
      const numPeopleStr = numPeopleEl.value;

      const regex = /^(\d+)/;
      
      if (!regex.exec(billValueStr) || !regex.exec(numPeopleStr) || !regex.exec(tipPercentageStr)) {
        showError('Invalid input.');
        return;
      };

      if (!numPeopleStr || numPeopleStr === '0') {
        showError('Can\'t be zero.');
        return;
      } else {
        errorMessageEl.classList.remove('error'); 
        errorMessageEl.style.display = 'none';
      };

      const tipPercentageNum = Number(tipPercentageStr.replace('%', '') / 100);
      const billNum = Number(billValueStr);
      const peopleNum = Number(numPeopleStr);

      const tipPerson = (tipPercentageNum * billNum) / peopleNum;
      const totalPerson = billNum / peopleNum + tipPerson;

      tipAmountEl.textContent = `$${tipPerson.toFixed(2)}`;
      totalEl.textContent = `$${totalPerson.toFixed(2)}`;

    });  
  });
};

const reset = () => {
  resetButton.addEventListener('click', e => {
    document.querySelector('.custom').setAttribute('placeholder', 'Custom');
    billEl.setAttribute('placeholder', '0');
    numPeopleEl.setAttribute('placeholder', '0');

    billEl.value = numPeopleEl.value = document.querySelector('.custom').value = '';
    tipAmountEl.textContent = totalEl.textContent = '$0.00';

    errorMessageEl.classList.remove('error');
    errorMessageEl.style.display = 'none';
  });
};

const init = () => {
  calcTip();
  reset();
};
init();