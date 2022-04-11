let easyObj = document.getElementById("easy")
let intermediateObj = document.getElementById("intermediate")
let hardObj = document.getElementById("hard")

easyObj.addEventListener("click", helperClickObjective)
intermediateObj.addEventListener("click", helperClickObjective)
hardObj.addEventListener("click", helperClickObjective)


let examplesPage = document.getElementById("examplesPage")
examplesPage.addEventListener("click", )


function helperClickObjective(e) {


    let elem = document.getElementById(e.target.id)

    if (elem.style.backgroundColor == "rgb(255, 105, 97)") {
        elem.style.backgroundColor = "yellow"
    }
    else if (elem.style.backgroundColor == "yellow") {
        elem.style.backgroundColor= "lime"
    }
    else
        elem.style.backgroundColor="rgb(255, 105, 97)"
}

