//Listern Form Submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
  
  // Hide Result
  document.querySelector('.results').style.display = 'none';

  //Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calLoan, 3000);

  e.preventDefault();
});

function calLoan(){
  //Creating UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPay = parseFloat(years.value)*12;

  //Computed Monthly payment
  const x = Math.pow(1 + calculateInterest, calculatedPay);
  const monthly = (principal * x * calculateInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPay).toFixed(2);
    totalInterest.value = ((monthly * calculatedPay) - principal).toFixed(2);
    
    // Show Result
    document.querySelector('.results').style.display = 'block';

    //Hide Loader
    document.getElementById('loading').style.display = 'none';
  }else{

    showError('Please Check Your Number');
  }

}

function showError(err){
  const errDiv = document.createElement('div');
  errDiv.className = 'alert alert-danger';
  errDiv.appendChild(document.createTextNode(err));
  
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errDiv, heading);
  // Hide Result
  document.querySelector('.results').style.display = 'none';

  //Hide Loader
  document.getElementById('loading').style.display = 'none';
  setTimeout(clear, 3000);
}

function clear(){
  document.querySelector('.alert').remove();
}