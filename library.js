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
        objective.style = 'width: 60px; height: 60px;border-radius: 50%; background-color: Aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 15px; margin-right:15px;';
        list.appendChild(objective)
        numberOfObjectives++
        return numberOfObjectives

    }

    obj.clickObjective = function(objective){


    }

    obj.showPopup = function(objective) {


    }


    obj.deleteObjective = function(objective) {


    }

    obj.editObjective = function(objective) {


    }



    return obj







}