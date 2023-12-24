const errorMsg = document.querySelectorAll(".worrning")
const inputBox = document.querySelectorAll(".input-box")

inputBox.forEach(function(element, index){
    element.addEventListener('blur', function(){
        checkInputData(index)
    })
})

function checkInputData(index){
    if (inputBox[index].value === ''){
        checkError(index, "Can't be blank")
    }
    else if (index === 0){
        checkError(index, checkBox0(index))
    }
    else if (index === 1){
        checkError(index, checkBox1(index))
    }
    else if (index === 2){
        checkError(index, checkBox2(index))
    }
    else if (index === 3){
        checkError(index, checkBox3(index))
    }
    else{
        checkError(index, checkBox4(index))
    }
}

function checkError(index,errorText){
    index >=3 ? index=index-1 : null
    errorMsg[index].style.visibility = "visible"
    errorMsg[index].textContent = errorText
}

function checkBox0(index){
    return "0"
}

function checkBox1(index){
    return "1"
}

function checkBox2(index){
    if (!/^\d+$/.test(inputBox[index].value)){
        return "Wrong format, integer only!"
    }
    else if (inputBox[index].value <1 || inputBox[index].value>12){
        return "Wrong month number!"
    }
    else if (inputBox[index].value.length >2){
        return "Wrong month format!"
    }
    else if (inputBox[index].value.length == 1){
        inputBox[index].value = '0' + inputBox[index].value
    }
}

function checkBox3(index){
    if (!/^\d+$/.test(inputBox[index].value)){
        return "Wrong format, integer only"
    }
    else if (inputBox[index].value < new Date().getFullYear()){
        return "Card not valid!"
    }
    else if (Number(inputBox[index].value) === new Date().getFullYear()){
        if (inputBox[index-1].value < new Date().getMonth()+1){
            return "Card not valid!"
        }
    }
}

function checkBox4(index){
    return "04"
}