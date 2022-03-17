"use strict"

const log = console.log
let numberOfObjectives=0
let currentPopupID = -1
let descriptions = [];
let titles = [];
let popupOpen = false

//Helper functions
function helperAddObjective() {
    if (popupOpen)
        return
    
    const list = document.getElementById("list")
    const objective = document.createElement('div')
    log("objective object ", objective)

    objective.style = 'word-wrap: break-word; font-weight: bold; width: 50px; height: 50px; border: 1px; border-radius: 50%; background-color: aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 14px; text-align: center;';
    numberOfObjectives++
    objective.id = numberOfObjectives
    list.appendChild(objective)
    let ev = document.getElementById(objective.id)
    ev.addEventListener('click', addEventClick)

    const  closeButton = document.createElement('div')
    closeButton.id = numberOfObjectives.toString() + "closeButton"
    closeButton.style = "position: relative; bottom: 8px;"

    const textNode  = document.createElement('p')
    textNode.innerText = "Delete"
    textNode.style = "text-align: center; font-size: 10px; text-decoration: underline; color: blue;"
    closeButton.appendChild(textNode)

    list.append(closeButton)

    let e = document.getElementById(closeButton.id)

    //add event listeners
    e.addEventListener('click', addEventDelete)
    ev.addEventListener('contextmenu', addEventForm)
    ev.addEventListener('mouseover', addEventPopup)
    ev.addEventListener('mouseout', addEventRemovePopup)

   
}

function helperDeleteObjective(deleteObjective, deleteButton) {

    if (popupOpen)
        return

    let list = document.getElementById("list")
    let id = deleteObjective.id

    list.removeChild(deleteObjective)
    list.removeChild(deleteButton)

    //also delete from arrays.

    descriptions.splice(parseInt(id)-1, 1)
    titles.splice(parseInt(id)-1, 1)
    
    //Change all previous IDs -1.

    for (let i=parseInt(id)+1; i<numberOfObjectives+1; i++) {
     
        let objective = document.getElementById(i)
        objective.id = i-1

        let closeObjective = document.getElementById(i.toString() + "closeButton")
        closeObjective.id = (i-1).toString() + "closeButton"

    }

  
    numberOfObjectives--;

    

    if (currentPopupID == id && popupOpen == true) {
        let elem = document.getElementById(id.toString() + "descriptorParent")
        elem.parentNode.removeChild(elem)
        popupOpen = false
        currentPopupID = -1


    }
    return numberOfObjectives;

}

function helperClickObjective(e) {
    if (popupOpen)
        return
    
    let element = document.getElementById(e)
    if (element.style.backgroundColor == "aqua")
        element.style.background = "lime"
    else
        element.style.background="aqua"
}

function helperHoverObjective(e) {

    let descriptorParent = document.createElement("div")
    descriptorParent.id = e.toString() +"descriptorParent"
    
    let descriptor = document.createElement('span')

    if (descriptions[e-1] != undefined)
        descriptor.innerText = descriptions[e-1]

    descriptor.id = e.toString() + "descriptor"

    descriptorParent.appendChild(descriptor)
    document.body.appendChild(descriptorParent)

    let popup = document.getElementById(e.toString() + "descriptorParent")
    let popupText  = document.getElementById(e.toString() + "descriptor")

    let marginTop = (e-1) * 108
    
    popup.style="position: absolute; top: 50px; right: 150px; border: 2px solid black; word-wrap:break-word; padding: 2px; min-height: 75px; min-width: 150px; float: right; margin-right: 20px; background-color: Bisque; max-width: 250px;  "
    popup.style.marginTop = marginTop.toString() + "px"
    popupText.style = "text-align: center;"


    currentPopupID = e
    return currentPopupID

}


//pass in the objective number.
function helperShowForm(objectiveNumber) {

    //create popup.
    let descriptorParent = document.createElement("div")
    descriptorParent.id = objectiveNumber.toString() +"descriptorParent"

    let form = document.createElement('form')
    let labelTitle = document.createElement('label')
    let input = document.createElement('input')
    let labelDescription = document.createElement('label')
    let textarea = document.createElement('textarea')
    let titleText = document.createElement('p')
    let descriptionText = document.createElement('p')
    let labelSubmit = document.createElement('button')

    labelSubmit.innerHTML = "Submit"
    labelSubmit.style = "position: relative; bottom: 30px; height: 15px; font-size: 10px; text-align: center; "
    labelSubmit.id = objectiveNumber.toString() + "submit"

    //set attribute
    labelSubmit.setAttribute("type", 'button')

    titleText.innerHTML = "Title: "
    descriptionText.innerHTML = "Description: "

    labelTitle.style ="font-size: 12px; position: relative; bottom: 10px; "
    input.style = "height: 12px; position: relative; bottom: 20px; font-size: 10px; width: 140px;"
    input.id = 'input'


    if (titles[objectiveNumber-1] != undefined) {
        input.setAttribute("value", titles[objectiveNumber-1]) //get value field.
    }
  
    labelTitle.appendChild(titleText)
    labelDescription.appendChild(descriptionText)
    form.appendChild(labelTitle)
    form.appendChild(input)
    
    labelDescription.style = "font-size: 12px; position: relative; bottom: 25px; "
    textarea.style = "height: 20px; position: relative; bottom: 30px; width: 141px; height: 100px; font-size: 10px; "
    textarea.id = "textarea"

    if (descriptions[objectiveNumber-1] != undefined)
        textarea.innerText = descriptions[objectiveNumber-1] 


    form.appendChild(labelDescription)
    form.appendChild(textarea)
    form.appendChild(labelSubmit)

    descriptorParent.appendChild(form)
    document.body.appendChild(descriptorParent)

 
    let eve = document.getElementById(objectiveNumber.toString() + 'submit')
    eve.addEventListener("click", clickedSubmit)

    //retrieve the data.
    let popup = document.getElementById(objectiveNumber.toString() + "descriptorParent")
    let popupText  = document.getElementById(objectiveNumber.toString() + "descriptor")

    let marginTop = (objectiveNumber-1) * 100
    
    popup.style="position: absolute; top: 50px; right: 150px; border: 2px solid black; word-wrap:break-word; padding: 2px; min-height: 75px; max-width: 150px; float: right; margin-right: 20px; background-color: Bisque; max-height: 195px; "
    popup.style.marginTop = marginTop.toString() + "px"


    currentPopupID = objectiveNumber
    return currentPopupID
}

function LearnJS() {
    const obj = {}
   
 
    //Create list
    obj.addList = function() {

        const parentContainer = document.createElement('div')
        const container = document.createElement('div');
        container.id = "list";
        parentContainer.style = 'width: 80px; height:100%; background-color: #F0F8FF; float: right; margin-right: 25px; border-style: solid; right:25px;';
        const addButton = document.createElement('div');
        addButton.id = "addButton";
        addButton.style = 'text-align: center; background-color: red; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;position: relative; left: 36%; color: white; text-align: center; font-weight: bold; font-size: 17px; '
        let textElem = document.createTextNode("+")
        addButton.appendChild(textElem)

        parentContainer.appendChild(container)
        parentContainer.appendChild(addButton)

        //Make the sidebar FIXED.
        const test = document.createElement('div')
        test.style = "position: absolute; top: 50px; right: 50px; "
        test.appendChild(parentContainer)
  

        document.body.appendChild(test)


        let e = document.getElementById("addButton") 
        e.addEventListener('click', addEventAdd)
    }

    /*Return an ID which signifies which objective*/
    obj.clickObjective = function(objectiveNumber){
        helperClickObjective(objectiveNumber)
    }

    obj.addObjective = function() {
        helperAddObjective()
        return numberOfObjectives
    }

    obj.showPopup = function(objectiveNumber, on) {

        //only control if no other hovers or popups
        if (currentPopupID != objectiveNumber && currentPopupID != -1)
            return


        if (on == 0) {
            let elem = document.getElementById(objectiveNumber.toString() + "descriptorParent")
            elem.parentNode.removeChild(elem)
            popupOpen = false
            currentPopupID = -1
            
        }
        else {
            popupOpen = true
            currentPopupID = objectiveNumber
            return helperHoverObjective(objectiveNumber)
           
        }
    }


    obj.deleteObjective = function(objectiveNumber) {
        let list = document.getElementById("list")
        let objectiveDelete = document.getElementById(objectiveNumber)
        //need to also get the delete button.
        //pass into helper: the id and the id+closeButton
        let deleteButton = document.getElementById(objectiveNumber.toString() + "closeButton")
        return helperDeleteObjective(objectiveDelete, deleteButton)

    }

    obj.addTitle= function(objectiveNumber, title) {
        let objectiveEdit = document.getElementById(objectiveNumber)
        //see if title child exists.    
        if (document.getElementById(objectiveNumber.toString() + "title") !== null) {
            objectiveEdit.firstElementChild.innerText = title
            titles[objectiveNumber-1] = title
            return title
        }
        titles.push(title)
        let text = document.createElement("p")
        text.innerText = title
        text.style = "font-size: 12px; padding: 2px; text-align: center;"
        text.id = objectiveNumber.toString() + "title"
        objectiveEdit.appendChild(text) //why does it not follow the same color scheme?

    }

    obj.addDescription = function(objectiveNumber, description) {
        if (descriptions[objectiveNumber-1] != 'undefined') {
            descriptions[objectiveNumber-1] = description
            return
        }
        descriptions.push(description)
    }

    obj.addForm = function(objectiveNumber, on) {

        //only display if no other hovers or popups.
        //check if this popup matches your id.
    
        if (currentPopupID != objectiveNumber && currentPopupID != -1)
            return

        if (on) {
         
            popupOpen = true
            currentPopupID = objectiveNumber
            helperShowForm(objectiveNumber)
            
        }
        
        else {
            log("off")
            popupOpen = false
            currentPopupID = -1

            let elem = document.getElementById(objectiveNumber.toString() + "descriptorParent")
            elem.parentNode.removeChild(elem)
            
        }
        
    }
    return obj
}


function addEventClick(e) {
    helperClickObjective(e.currentTarget.id)
}

function addEventDelete(e) {

    let deleteButton= document.getElementById(e.currentTarget.id)

    log(e.currentTarget.id)

    let objectiveDeleteID = deleteButton.id[0]
    let objDelete = document.getElementById(objectiveDeleteID)

    helperDeleteObjective(objDelete, deleteButton)

}

function addEventAdd(e) {
    helperAddObjective()
}

function addEventPopup(e) {
    //Check if already shown.
    if (!popupOpen)
        helperHoverObjective(e.currentTarget.id)

}

function addEventRemovePopup(e) { 
    //should be turned off if popup is open.
    if (!popupOpen)  {
        let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
        elem.parentNode.removeChild(elem)
    }
}

function addEventForm(e) {
    e.preventDefault()

    log("TESTING", e.currentTarget.id)

    if (popupOpen == true)
        return
    //disable hover.
    let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
    elem.parentNode.removeChild(elem)

    if (popupOpen == false) {
        helperShowForm(e.currentTarget.id)
        popupOpen = true
    }

}

function clickedSubmit(e) {
    
    let input = document.getElementById('input')
    let textbox = document.getElementById('textarea')
    let objectiveNumber = e.currentTarget.id[0]
    let objectiveEdit = document.getElementById(objectiveNumber)

    //edit title
    if (document.getElementById(objectiveNumber.toString() + "title") !== null) {
        objectiveEdit.firstElementChild.innerText = input.value
        titles[objectiveNumber-1] = input.value
      
    }
    else {
        titles.push(input.value)
        let text = document.createElement("p")
        text.innerText = input.value
        text.style = "font-size: 10px; padding: 2px; text-align: center;"
        text.id = objectiveNumber.toString() + "title"
        objectiveEdit.appendChild(text) //why does it not follow the same color scheme?
    }

    //edit description
    if (descriptions[objectiveNumber-1] != 'undefined') {
        descriptions[objectiveNumber-1] = textbox.value
        
    }
    else   
        descriptions.push(textbox.value)

    //close form popup.
    let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
    elem.parentNode.removeChild(elem)
    
    popupOpen = false

}
