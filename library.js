"use strict"

const log = console.log

//Event listeners



function LearnJS() {



    const obj = {}
    let numberOfObjectives=0
    let currentPopupID = 0

    let descriptions = [];

    //Create list
    
    obj.addList = function() {

        const parentContainer = document.createElement('div')

        const container = document.createElement('div');
        container.id = "list";
        //containerr.appendChild(document.createTextNode('Body Div'));
        parentContainer.style = 'width: 80px; height:100%; background-color: #F0F8FF; float: right; margin-right: 25px; border-style: solid; right:25px;';

        //for landing page, use "elementBefore"

        //need an add button right below the list itself.

        const addButton = document.createElement('div');
        addButton.id = "addButton";

        addButton.style = 'margin-bottom: 15px; text-align: center; background-color: red; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;position: relative; left: 36%; color: white; text-align: center; font-weight: bold; font-size: 17px; '

        let textElem = document.createTextNode("+")

      
        addButton.appendChild(textElem)



    

        parentContainer.appendChild(container)
        parentContainer.appendChild(addButton)

        document.body.appendChild(parentContainer)
        
    }

    /*Plan: Store all these objectives into a list to access easily*/

    /*Return an ID which signifies which objective*/
    

    obj.clickObjective = function(objectiveNumber){
        //if blue, turn to red  

        const element = document.getElementById(objectiveNumber)
        log("COLOR")
    
        if (element.style.backgroundColor == "aqua")
            element.style.background = "lime"
        else
            element.style.background="aqua"
        //if red, turn to blue.

    }

    obj.addObjective = function() {
        const list = document.getElementById("list")
        log(list)
        const objective = document.createElement('div')
        
        objective.style = 'overflow: auto; word-wrap: break-word; width: 50px; height: 50px; border-radius: 50%; background-color: aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 14px; text-align: center;';
        numberOfObjectives++
        objective.id = numberOfObjectives

        



        

 
        
        

        list.appendChild(objective)
    
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
        let objectiveEdit = document.getElementById(objectiveNumber)
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

        if (objectiveDelete == null){
            return -1
        }

        let removedElement = list.removeChild(objectiveDelete)

        //Change all previous IDs -1.

        for (let i=objectiveNumber+1; i<numberOfObjectives+1; i++) {
            let objective = document.getElementById(i)
            objective.id = i-1
        }
        numberOfObjectives--;

        return numberOfObjectives;

    }

    obj.editTitle= function(objectiveNumber, title) {

        //edit html inside the objective.
        
        let objectiveEdit = document.getElementById(objectiveNumber)

        if (title == null)
            return null
        //see if title child exists.    
        

        if (document.getElementById(objectiveNumber.toString() + "title") !== null) {
            objectiveEdit.firstElementChild.innerText = title
            return title
        }

        let text = document.createElement("p")
        text.innerText = title
        text.style = "font-size: 10px; padding: 2px; text-align: center;"
        text.id = objectiveNumber.toString() + "title"
        objectiveEdit.appendChild(text)

    }

    obj.addDescription = function(objectiveNumber, description) {

        //store the text relating to this objective number.
        descriptions.push(description)

    }

  

    return obj







}