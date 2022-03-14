"use strict"

const log = console.log

function LearnJS() {



    const obj = {}
    let numberOfObjectives=0

    //Create list
    
    obj.addList = function() {
        const container = document.createElement('div');
        container.id = "list";
        //containerr.appendChild(document.createTextNode('Body Div'));
        container.style = 'width: 90px; height:100%; background-color: #F0F8FF; float: right; margin-right: 25px; border-style: solid;';
        document.body.appendChild(container)
    }

    /*Plan: Store all these objectives into a list to access easily*/

    /*Return an ID which signifies which objective*/
    obj.addObjective = function() {
        const list = document.getElementById("list")
        log(list)
        const objective = document.createElement('div')
        
        objective.style = 'overflow: auto; word-wrap: break-word; width: 50px; height: 50px; border-radius: 50%; background-color: aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 15px; text-align: center; margin-right:15px;';
        numberOfObjectives++
        objective.id = numberOfObjectives
        list.appendChild(objective)
        return numberOfObjectives
    }

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

    obj.showPopup = function(objectiveNumber) {
        

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

    obj.editDescription = function(objectiveNumber, description) {


    }

  

    return obj







}