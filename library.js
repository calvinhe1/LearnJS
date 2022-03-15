"use strict"

const log = console.log

let numberOfObjectives=0
let currentPopupID = 0
let descriptions = [];
let titles = [];

//Helper functions
function helperAddObjective() {
    const list = document.getElementById("list")
    const objective = document.createElement('div')
    objective.style = 'overflow: auto; word-wrap: break-word; width: 50px; height: 50px; border-radius: 50%; background-color: aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 14px; text-align: center;';
    numberOfObjectives++
    objective.id = numberOfObjectives
    list.appendChild(objective)
    let ev = document.getElementById(objective.id)
    ev.addEventListener('click', addEventClick)
    //Add an X button.

    const  closeButton = document.createElement('div')
    closeButton.id = numberOfObjectives.toString() + "closeButton"
    closeButton.style = "position: relative; bottom: 8px;"

    const textNode  = document.createElement('p')
    textNode.innerText = "Delete"
    textNode.style = "text-align: center; font-size: 10px; text-decoration: underline; color: blue;"
    closeButton.appendChild(textNode)

    list.append(closeButton)

    let e = document.getElementById(closeButton.id)
    e.addEventListener('click', addEventDelete)


    //add a right click mouse event to show the form.

    ev.addEventListener('contextmenu', )




    //add a mouseover event for the description.

    
    log(numberOfObjectives)
}

function helperDeleteObjective(deleteObjective, deleteButton) {
    let list = document.getElementById("list")

    let id = deleteObjective.id

    list.removeChild(deleteObjective)
    list.removeChild(deleteButton)
    
    //Change all previous IDs -1.
    for (let i=id+1; i<numberOfObjectives+1; i++) {
        let objective = document.getElementById(i)
        objective.id = i-1
    }
    numberOfObjectives--;
    return numberOfObjectives;

}

function helperClickObjective(e) {


    let element = document.getElementById(e)
    if (element.style.backgroundColor == "aqua")
        element.style.background = "lime"
    else
        element.style.background="aqua"



}

function helperHoverObjective(e) {
}

function helperShowForm(e) {

    
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
        document.body.appendChild(parentContainer)
        let e = document.getElementById("addButton") 
        e.addEventListener('click', addEventAdd)
    }

    /*Plan: Store all these objectives into a list to access easily*/

    /*Return an ID which signifies which objective*/
    obj.clickObjective = function(objectiveNumber){
        //if blue, turn to red  

        helperClickObjective()
        //if red, turn to blue.

    }

    obj.addObjective = function() {
        helperAddObjective()
        return numberOfObjectives
    }

    obj.showPopup = function(objectiveNumber, on) {
        //delete previous popup from DOM.
        if (currentPopupID != 0) {
            let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
            elem.parentNode.removeChild(elem)
        }

        if (on == 0) {
            currentPopupID = 0
            return 0
        }
        //create popup.
      
        let descriptorParent = document.createElement("div")
        descriptorParent.id = objectiveNumber.toString() +"descriptorParent"
        
        let descriptor = document.createElement('span')
        descriptor.innerText = descriptions[objectiveNumber-1]
        descriptor.id = objectiveNumber.toString() + "descriptor"

        descriptorParent.appendChild(descriptor)
        document.body.appendChild(descriptorParent)
    
        let popup = document.getElementById(objectiveNumber.toString() + "descriptorParent")
        let popupText  = document.getElementById(objectiveNumber.toString() + "descriptor")

        let marginTop = (objectiveNumber-1) * 100
        
        popup.style="border: 2px solid black; word-wrap:break-word; padding: 2px; min-height: 75px; min-width: 150px; float: right; margin-right: 20px; background-color: Bisque; "
        popup.style.marginTop = marginTop.toString() + "px"
        popupText.style = "text-align: center;"


        currentPopupID = objectiveNumber
        return currentPopupID

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

        //edit html inside the objective.

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
        text.style = "font-size: 10px; padding: 2px; text-align: center;"
        text.id = objectiveNumber.toString() + "title"
        objectiveEdit.appendChild(text) //why does it not follow the same color scheme?

    }

    obj.addDescription = function(objectiveNumber, description) {

        //store the text relating to this objective number.

        //check if already exists.
        if (descriptions[objectiveNumber-1] != 'undefined') {
            descriptions[objectiveNumber-1] = description
            return
        }

        descriptions.push(description)

    }

    obj.addForm = function(objectiveNumber) {
        
        if (currentPopupID != 0) {
            let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
            elem.parentNode.removeChild(elem)
        }


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

        if (titles[objectiveNumber-1] != 'undefined')
            input.setAttribute("value", titles[objectiveNumber-1]) //get value field.
        
        labelTitle.appendChild(titleText)
        labelDescription.appendChild(descriptionText)
        form.appendChild(labelTitle)
        form.appendChild(input)
        
        labelDescription.style = "font-size: 12px; position: relative; bottom: 25px; "
        textarea.style = "height: 20px; position: relative; bottom: 30px; width: 141px; height: 100px; font-size: 10px; "
        textarea.id = "textarea"

        if (descriptions[objectiveNumber-1] != 'undefined')
            textarea.innerText = descriptions[objectiveNumber-1] //get innerHTML/.
    
        form.appendChild(labelDescription)
        form.appendChild(textarea)

        form.appendChild(labelSubmit)

        descriptorParent.appendChild(form)
        document.body.appendChild(descriptorParent)
        //Add event listener, where if you click submit, takes those submissions registers into the circles, then deletes form from DOM.

        let e = document.getElementById(objectiveNumber.toString() + 'submit')
        e.addEventListener("click", clickedSubmit)
        

        //retrieve the data.

        
        let popup = document.getElementById(objectiveNumber.toString() + "descriptorParent")
        let popupText  = document.getElementById(objectiveNumber.toString() + "descriptor")

        let marginTop = (objectiveNumber-1) * 100
        
        popup.style="border: 2px solid black; word-wrap:break-word; padding: 2px; min-height: 75px; max-width: 150px; float: right; margin-right: 20px; background-color: Bisque; max-height: 195px; "
        popup.style.marginTop = marginTop.toString() + "px"
        //popupText.style = "text-align: center;"

        currentPopupID = objectiveNumber
        return currentPopupID


    }

    return obj

}


function addEventClick(e) {
    helperClickObjective(e.currentTarget.id)
}

function addEventDelete(e) {

    let deleteButton= document.getElementById(e.currentTarget.id)
    let objectiveDeleteID = deleteButton.id[0]
    let objDelete = document.getElementById(objectiveDeleteID)

    helperDeleteObjective(objDelete, deleteButton)
    

}

function addEventAdd(e) {

    helperAddObjective()

}

function addEventPopup(e) {

    helperHoverObjective()

}

function clickedSubmit(e) {
    log('hello')

    log(e.currentTarget.id)
 
    //get data.
    let objectiveNumber = e.currentTarget.id[0]
    log(objectiveNumber)

    let input = document.getElementById('input')
    log(input.value)

    let textbox = document.getElementById('textarea')
    log(textbox.value)

    //change the title and the description itself.


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


    //close DOM box.
    if (currentPopupID != 0) {
        let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
        elem.parentNode.removeChild(elem)
    }


}
