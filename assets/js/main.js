//CARDHOLDER NAME
let nameCard = document.querySelector(".card__details-name")
let nameInput = document.getElementById("cardholder")
let nameErrorDiv = document.querySelector(".form__cardholder--error")

//CARD NUMBER
let numberCard = document.querySelector(".card__number")
let numberInput = document.getElementById("cardnumber")
let numberErrorDiv = document.querySelector(".form__input-number--error")

//MM
let monthCard = document.querySelector(".card__month")
let monthInput = document.querySelector("#cardMonth")
let monthErrorDiv = document.querySelector(".form__input-mm--error")
//YY
let yearCard = document.querySelector(".card__year")
let yearInput = document.querySelector("#cardYear")
let yearErrorDiv = document.querySelector(".form__input-yy--error")

//CVC
let cvcCard = document.querySelector(".card-back__cvc")
let cvcInput = document.querySelector("#cardCvc")
let cvcErrorDiv = document.querySelector(".form__input-cvc--error")

//Ingreso dinámico del nombre
nameInput.addEventListener('input', () => {
  if(nameInput.value == ""){
    nameCard.innerText = "Jane Applesed"
  }else{
    nameCard.innerText = nameInput.value
  }
})

//Ingreso dinámico del número
numberInput.addEventListener('input', (event) => {
  let inputValue = event.target.value
  
  //Actualizando tarjeta
  numberCard.innerText = numberInput.value

  //Validando que solo se ingresen números
  let regExp = /[A-z]/g
  if(regExp.test(numberInput.value)){
    showError(numberInput, numberErrorDiv, "Wrong format, numbers only")
    //*******numberErrorDiv.innerText = "Wrong format, numbers only"
  }else{
    //agregando espacios cada 4, impiendiedno espacios del usuario
    numberInput.value = inputValue.replace(/\s/g, "").replace(/([0-9]{4})/g, "$1 ").trim()

    hideError(numberInput, numberErrorDiv)
    //*******numberErrorDiv.innerText = ""
  }

  //Regresar a valor default
  if(numberInput.value == ""){
    numberCard.innerText = "0000 0000 0000 000"
  }
})

//Ingreso dinámico del mes
monthInput.addEventListener('input', () => {
  monthCard.innerText = monthInput.value

  validateLetters(monthInput, monthErrorDiv)

  if(monthInput.value == ""){
    monthCard.innerText = "00"
  }
})

//Ingreso dinámico del año
yearInput.addEventListener('input', () => {
  yearCard.innerText = yearInput.value
  
  validateLetters(yearInput, yearErrorDiv)
  
  if(yearInput.value == ""){
    yearCard.innerText = "00"
  }
  
})

//Ingreso dinámico del cvc
cvcInput.addEventListener('input', () => {
  cvcCard.innerText = cvcInput.value

  validateLetters(cvcInput, cvcErrorDiv)

  if(cvcInput.value == ""){
    cvcCard.innerText = "000"
  }
})






//Boton Confirm
let confirmBtn = document.querySelector(".form__submit")

let nameValidation = false
let numberValidation = false
let monthValidation = false
let yearValidation = false
let cvcValidation = false

//Secciones Formulario y Thanks
let formSection = document.querySelector(".form")
let thanksSection = document.querySelector(".thanks-section")

confirmBtn.addEventListener('click', (event) => {
  event.preventDefault()

  //Validar name
  if(verifiyIsFilled(nameInput, nameErrorDiv)){
    nameValidation = true
  }else{
    nameValidation = false
  }

  //Validar número
  if(verifiyIsFilled(numberInput, numberErrorDiv)){
    if(numberInput.value.length == 19){
      hideError(numberInput, numberErrorDiv)
      numberValidation = true
    }else{
      showError(numberInput, numberErrorDiv, "Card number must be 16 digits")
      numberValidation = false
    }
  }


  //Validar mes
  if(verifiyIsFilled(monthInput, monthErrorDiv)){
    if(parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12){
      hideError(monthInput, monthErrorDiv)
      monthValidation = true
    }else{
      showError(monthInput, monthErrorDiv, "Month Incorrect", true)
      monthValidation = false
    }  
  }
  

  //Validar año
  if(verifiyIsFilled(yearInput, yearErrorDiv)){
    if(parseInt(yearInput.value)>22 && parseInt(yearInput.value)<=27){
      hideError(yearInput, yearErrorDiv)
      yearValidation = true
    }else{
      showError(yearInput, yearErrorDiv, "Wrong Year")
      yearValidation = false
    }
  }

  //Validar cvc
  if(verifiyIsFilled(cvcInput, cvcErrorDiv)){
    if(cvcInput.value.length == 3){
      hideError(cvcInput, cvcErrorDiv)
      cvcValidation = true
    }else{
      showError(cvcInput, cvcErrorDiv, "Wrong CVC")
      cvcValidation = false
    }
  }

  if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
    formSection.style.display = 'none'
    thanksSection.style.display = 'block'
  }
})


//Funciones
function showError(divInput, divError, msgError){
  divError.innerText = msgError
  divInput.style.borderColor = '#ff0000'
}

function hideError(divInput, divError){
  divError.innerText = ""
  divInput.style.borderColor = 'hsl(270, 3%, 87%)'
}

function verifiyIsFilled(divInput, divError){
  if(divInput.value.length>0){
    hideError(divInput, divError)
    return true
  }else{
    showError(divInput, divError, "Can´t be blank")
    return false
  }
}

function validateLetters(input, divError){
  //Validando que solo se ingresen números
  let regExp = /[A-z]/g
  if(regExp.test(input.value)){
    showError(input, divError, "Wrong format, numbers only")
  }else{
    hideError(input, divError)
  }
}
