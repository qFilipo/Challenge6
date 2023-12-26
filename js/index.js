const errorMsg = document.querySelectorAll(".worrning")
const errorMsg2 = document.querySelector(".worrning2")
const inputBox = document.querySelectorAll(".input-box")
const btnConfirm = document.getElementById("confirm")
const liItem = document.querySelectorAll(".li-item")
const hisMenu = document.getElementById("history-menu")
const afterClick = document.getElementById("after-click")

let historyInput = []

btnConfirm.addEventListener("click", function(event){
    event.preventDefault()
    checkError(0)
    checkError(1)
    checkError(3)
    checkError(4)
    historyImport()
})

function historyImport(){
    if (checkBox0(0) === undefined &&
    checkBox1(1) === undefined &&
    checkBox2(2) === undefined &&
    checkBox3(3) === undefined &&
    checkBox4(4) === undefined){
        hisMenu.style.visibility = "visible";
        afterClick.style.visibility = "visible";
        let newObject ={
            number: document.querySelector(".card-number").textContent,
            name: document.querySelector(".card-name").textContent,
            date: document.querySelector(".exp-date").textContent,
            cvc: document.querySelector(".cvc").textContent
        }

        if (historyInput.length < 3){
            historyInput.unshift(newObject)
            liItem[historyInput.length-1].textContent = historyInput[0].name
            for (let i=0; i<historyInput.length; i++){
                liItem[i].style.visibility = "visible"
            }
        }
        else{
            historyInput.unshift(newObject)
            historyInput.pop()
            liItem[0].textContent = historyInput[0].name
            liItem[1].textContent = historyInput[1].name
            liItem[2].textContent = historyInput[2].name
        }
    }
}

let errorMsgObject = {
    blank: "Can't be blank",
    onlyLetter:"Wrong format, letters only!",
    onlyInteger: "Wrong format, integers only!",
    wrongNumber: "Number: 16 digits!",
    wrongMonth: "Month: 01 - 12!",
    wrongYear: "Year: " + new Date().getFullYear() + " - 2099!",
    wrongCvc: "Cvc: 3 digits!",
    cardValidation: "Card not valid!"
}

function checkError(index){
    if (index === 0){
        errorMsg[0].textContent = checkBox0(0)
    }
    else if (index === 1){
        errorMsg[1].textContent = checkBox1(1)
    }
    else if (index === 3){
        if (checkBox2(2) === errorMsgObject.blank && checkBox3(3) === errorMsgObject.blank){
            errorMsg[2].textContent = checkBox2(2)
            errorMsg2.textContent = ""
        }
        else{
            if(checkBox2(2) === undefined){
                errorMsg[2].textContent = checkBox3(3)
                errorMsg2.textContent = checkBox2(2)
            }
            else{
                errorMsg[2].textContent = checkBox2(2)
                errorMsg2.textContent = checkBox3(3)
            }
        }
    }
    else{
        errorMsg[3].textContent = checkBox4(4)
    }
}

function checkBox0(index){
    if (inputBox[index].value === ''){
        return errorMsgObject.blank
    }
    else if (!/^[A-Za-z]+$/.test(inputBox[index].value.replace(/\s+/g,""))){
        return errorMsgObject.onlyLetter
    }
    else{
        changeCardholderName(inputBox[index].value)
    }
}

function checkBox1(index){
    const cardNumberValue = inputBox[index].value.replace(/\s+/g,"")
    if (cardNumberValue === ''){
        return errorMsgObject.blank
    }
    else if (!/^\d+$/.test(cardNumberValue)){
        return errorMsgObject.onlyInteger
    }
    else if (cardNumberValue.length != 16){
        return errorMsgObject.wrongNumber
    }
    else{
        changeCardNumber(cardNumberValue.slice(0,4)+" "+
        cardNumberValue.slice(4,8)+" "+
        cardNumberValue.slice(8,12)+" "+
        cardNumberValue.slice(12,16)+" "
        )
    }
}

function checkBox2(index){
    if (inputBox[index].value === ''){
        return errorMsgObject.blank
    }
    else if (!/^\d+$/.test(inputBox[index].value)){
        return errorMsgObject.onlyInteger
    }
    else if (inputBox[index].value <1 || inputBox[index].value>12 || inputBox[index].value.length >2){
        return errorMsgObject.wrongMonth
    }
    else{
        if (inputBox[index].value.length == 1){
            inputBox[index].value = '0' + inputBox[index].value
        }
        changeValidDateM(inputBox[index].value+"/")
    }
}

function checkBox3(index){
    if (inputBox[index].value === ''){
        return errorMsgObject.blank
    }
    else if (!/^\d+$/.test(inputBox[index].value)){
        return errorMsgObject.onlyInteger
    }
    else if (inputBox[index].value < new Date().getFullYear()){
        return errorMsgObject.cardValidation
    }
    else if (inputBox[index].value >= 2100){
        return errorMsgObject.wrongYear
    }
    else if (Number(inputBox[index].value) === new Date().getFullYear()){
        if (inputBox[index-1].value < new Date().getMonth()+1){
            return errorMsgObject.cardValidation
        }
        else{
            changeValidDateY(inputBox[index].value.slice(2,4))
        }
    }
    else{
        changeValidDateY(inputBox[index].value.slice(2,4))
    }
}

function checkBox4(index){
    if (inputBox[index].value === ''){
        return errorMsgObject.blank
    }
    else if (!/^\d+$/.test(inputBox[index].value)){
        return errorMsgObject.onlyInteger
    }
    else if (inputBox[index].value.length !=3){
        return errorMsgObject.wrongCvc
    }
    else{
        changeCvc(inputBox[index].value)
    }
}

function changeCardNumber(text){
    const cardNumber=document.querySelector(".card-number")
    cardNumber.textContent = text
}

function changeCardholderName(text){
    const cardName=document.querySelector(".card-name")
    cardName.textContent = text
}

function changeValidDate(text){
    const cardDate=document.querySelector(".exp-date")
    cardDate.textContent = text
}

function changeValidDateM(text){
    const cardDateM=document.querySelector(".date-m")
    cardDateM.textContent = text
}

function changeValidDateY(text){
    const cardDateY=document.querySelector(".date-y")
    cardDateY.textContent = text
}

function changeCvc(text){
    const cardCvc=document.querySelector(".cvc")
    cardCvc.textContent = text
}

const btnMenu = document.getElementById("unscroll-btn")
const histList = document.getElementById("history-list")

function ulDriveIn(){
    liItem.forEach(function(index){
        setTimeout(function(){
            liItem[0].style.transform = "translateX(0%)"
        },100)
        setTimeout(function(){
            liItem[1].style.transform = "translateX(0%)"
        },300)
        setTimeout(function(){
            liItem[2].style.transform = "translateX(0%)"
        },500)
    })
}

function ulDriveOut(){
    liItem.forEach(function(index){
        setTimeout(function(){
            liItem[0].style.transform = ""
        },500)
        setTimeout(function(){
            liItem[1].style.transform = ""
        },300)
        setTimeout(function(){
            liItem[2].style.transform = ""
        },100)
    })
}

btnMenu.addEventListener("click", function(){
    ulDriveIn()
})

document.addEventListener("click", function(event){
    if (!btnMenu.contains(event.target) && !liItem[0].contains(event.target) && !liItem[1].contains(event.target) && !liItem[2].contains(event.target)){
        ulDriveOut()
    }
})

liItem.forEach(function(el, index){
    el.addEventListener('click', function(){
        if (index === 2){
            index=0
        } 
        else if (index === 0){
            index=2
        }
        changeCardNumber(historyInput[index].number)
        changeCardholderName(historyInput[index].name)
        changeValidDateM(historyInput[index].date.slice(0,2)+'/')
        changeValidDateY(historyInput[index].date.slice(3,5))
        changeCvc(historyInput[index].cvc)
    })
})

const btnContinue = document.getElementById("confirm2")

btnContinue.addEventListener("click",function(event){
    event.preventDefault()
    afterClick.style.visibility = "hidden";
})