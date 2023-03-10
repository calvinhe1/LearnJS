"use strict";

(function(global, document) {
  
    let numberOfObjectives=0
    let currentPopupID = -1
    let descriptions = [];
    let titles = [];
    let categories = [];
    let difficulties = [];
    let popupOpen = false
    let justAddedObjective = false
    let objectivesStore = []; //Used to re-add, hide objectives rather than completely removing it; simply remove it from DOM if it doesn't match the search.
    let currentCategory = "all";
    let filteredPosition  = 1;
    let hide = 0
    let positionScroll = 0
    let storedList;
    let storedSearchBar;
    let currentSearching = true
    let currentDifficulty="easy"


    function moveList(e) {
        positionScroll = window.scrollY

        let listContainer = document.getElementById("positionContainer")

        if (!listContainer)
            return

        listContainer.style.top = (window.scrollY+50).toString() + "px"

        let searchContainer = document.getElementById('searchContainer')
        if (searchContainer)
            searchContainer.style.top = (window.scrollY+5).toString() + "px"

    
        let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")

        if (elem)
            elem.parentNode.removeChild(elem)

        popupOpen = false;
    }


    function hideList(e) {
        let listContainer = document.getElementById("positionContainer")
        let searchContainer = document.getElementById('searchContainer')
        let hideButton = document.getElementById('hideButton')

        if (hide) {
            hide = 0
        } 
        else
            hide =1

        if (hide) {
            document.body.removeChild(listContainer)

            if (searchContainer) {
                document.body.removeChild(searchContainer)
            }
        
            storedList = listContainer
            storedSearchBar = searchContainer

            let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
            if (elem) {
                elem.parentNode.removeChild(elem)
            }
            
            hideButton.innerHTML = "Unhide list"
            popupOpen = false;
        }
        else {
        
            document.body.appendChild(storedList)
            hideButton.innerHTML = "Hide list"
            if(storedSearchBar) 
                document.body.appendChild(storedSearchBar)
        }
    }

    function checkValidObjective(objectiveNumber) {

        if (objectiveNumber > numberOfObjectives) {
            return false
        }
        return true;
    }

    function searchDropdown(search) {

        let searchList = document.getElementById("searchList")
        let searchContainer = document.getElementById('searchContainer')


        if (searchList)
        searchContainer.removeChild(searchList)
    
        //take searchInput.value and run the filter with this. 
        if (search == "")
            return

        let matchingCategories = categories.filter(category => {
            if (category.toLowerCase().indexOf(search.toLowerCase()) >= 0 ) {
                return true;
            }
            return false;
        })
    
        let categoriesFinal = [...new Set(matchingCategories)]
        categoriesFinal.sort()

        searchList = document.createElement('ul')
        searchList.id = "searchList"
        searchList.className = "searchList"
    
        for (let i =0; i < categoriesFinal.length; i++) {
            let li = document.createElement('li')
            li.className = "searchElement"
            li.innerHTML = categoriesFinal[i]
            li.setAttribute("value", categoriesFinal[i])
            searchList.appendChild(li)
            li.addEventListener("click", enter)
        }
        searchContainer.appendChild(searchList)
    }

    function filterObjectives(search) {

        let searchList = document.getElementById("searchList")
        let searchContainer = document.getElementById('searchContainer')


        //Remove all of the learning objectives from the previous filter.
        for (let i=0; i<objectivesStore.length; i++) {
            if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
                list.removeChild(objectivesStore[i].objective)
                list.removeChild(objectivesStore[i].deleteButton)
            }
        }

        filteredPosition = 1
        currentCategory = search //replace with new search.

        if (currentCategory == "")
            currentCategory = "all"

        for (let i=0; i<objectivesStore.length; i++) {
            
            //Add all learning objectives that match search.
            if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
                filteredPosition++
                list.appendChild(objectivesStore[i].objective)
                list.appendChild(objectivesStore[i].deleteButton)
            
                objectivesStore[i].position = filteredPosition-1;
            }
        }

        if (searchList)
        searchContainer.removeChild(searchList)

    }

    //Helper functions
    function helperAddObjective(difficultyLevel="easy") {
        if (popupOpen)
            return

        const list = document.getElementById("list")
        const objective = document.createElement('div')
        const closeButton = document.createElement('div')
        const textNode  = document.createElement('p')
        objective.style.backgroundColor = 'rgb(255, 105, 97)'   

        numberOfObjectives++

        objective.id = numberOfObjectives
        objective.className = "objective"
    
        list.appendChild(objective)
        let ev = document.getElementById(objective.id)
        ev.addEventListener('click', addEventClick)

        closeButton.id = numberOfObjectives.toString() + "closeButton"
        closeButton.className = "closeButton"

        textNode.innerText = "Delete"
        textNode.className = "closeButtonText"

        closeButton.appendChild(textNode)
        list.append(closeButton)

        let e = document.getElementById(closeButton.id)
        //add event listeners
        e.addEventListener('click', userEventDelete)
        ev.addEventListener('contextmenu', userEventForm)
        ev.addEventListener('mouseover', userEventHover)
        ev.addEventListener('mouseout', userEventRemovePopup)

        let position = filteredPosition
        filteredPosition++

        const objectivePair = {objective: objective, deleteButton: closeButton, position: position}

        objectivesStore.push(objectivePair)
        justAddedObjective = true

        
        difficulties.push(difficultyLevel)
     
        categories.push("")
        descriptions.push("")
        titles.push("")
        



        return objective.id
    }

    function helperDeleteObjective(deleteObjective, deleteButton) {

        if (popupOpen)
            return

        let list = document.getElementById("list")
        let id = deleteObjective.id

        objectivesStore.splice(id-1,1) 

        list.removeChild(deleteObjective)
        list.removeChild(deleteButton)

        //also delete from arrays.
        descriptions.splice(parseInt(id)-1, 1)
        titles.splice(parseInt(id)-1, 1)
        categories.splice(parseInt(id)-1, 1)
        difficulties.splice(parseInt(id-1),1)



        //Change the ids of the objectives that come AFTER it to ensure correct ID.

        //Issue is the DOM elements might not be present. In that case, manipulate the objectives array.
        for (let i=parseInt(id)+1; i<numberOfObjectives+1; i++) {
            let objective = document.getElementById(i)
        
            //NULL because currently not in the DOM, but should still update position.
            if (objective == null) {
                objectivesStore[i-2].objective.setAttribute('id', i-1) //change objective id.
                objectivesStore[i-2].deleteButton.setAttribute('id', (i-1).toString() + "closeButton")
                continue;
            }

            objective.id = i-1

            let closeObjective = document.getElementById(i.toString() + "closeButton")
            closeObjective.id = (i-1).toString() + "closeButton"
            objectivesStore[i-2].position = objectivesStore[i-2].position-1;
        
        }

        numberOfObjectives--;
        filteredPosition--;

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

        if (element.style.backgroundColor == 'rgb(255, 105, 97)')
            element.style.background = "yellow"
        else if (element.style.backgroundColor == "yellow") {
            element.style.background = "lime"
        }
        else
            element.style.background="rgb(255, 105, 97)"
    }


    function helperHoverObjective(e) {
        
        
        let descriptorParent = document.createElement("div")
        descriptorParent.id = e.toString() +"descriptorParent"
        
        let descriptor = document.createElement('span')

        if (descriptions[e-1] == "")
            return
        else if (descriptions[e-1] != undefined) {

            descriptor.innerText = descriptions[e-1]

        }
        else {
            justAddedObjective = false
            return
        }


        descriptor.id = e.toString() + "descriptor"

        descriptorParent.appendChild(descriptor)
        document.body.appendChild(descriptorParent)

        let popup = document.getElementById(e.toString() + "descriptorParent")
        let popupText  = document.getElementById(e.toString() + "descriptor")
        popup.className = "popuphover"

        let marginTop = (objectivesStore[e-1].position-1)  * 128 + positionScroll

        popup.style.marginTop = marginTop.toString() + "px"
        popupText.style = "text-align: center;"
        currentPopupID = e
        
        //Submitted form.
        justAddedObjective = false;

        return currentPopupID

    }


    //pass in the objective number.
    function helperShowForm(objectiveNumber) {

        currentDifficulty = difficulties[objectiveNumber-1]
    

        let descriptorParent = document.createElement("div")
        let form = document.createElement('form')
        let labelTitle = document.createElement('label')
        let input = document.createElement('input')
        let labelDescription = document.createElement('label')
        let textarea = document.createElement('textarea')
        let titleText = document.createElement('p')
        let descriptionText = document.createElement('p')
        let labelSubmit = document.createElement('button')
        let closeForm = document.createElement("div")

        let difficultyForm = document.createElement('form')
        let selectDifficulty = document.createElement('select')
        let easyDifficulty = document.createElement('option')
        let mediumDifficulty = document.createElement('option')
        let hardDifficulty = document.createElement('option')
        let pickDifficulty = document.createElement('option')

        easyDifficulty.setAttribute("value", "easy")
        mediumDifficulty.setAttribute("value", "intermediate")
        hardDifficulty.setAttribute("value", "hard")

        let labelDifficulty = document.createElement('label')
        let difficultyText = document.createElement('p')

        labelDifficulty.className = "labelTitle"
        difficultyText.innerHTML = "Difficulty"
        
        labelDifficulty.appendChild(difficultyText)
        
        pickDifficulty.innerHTML = "Current: " + difficulties[objectiveNumber-1]
        
        easyDifficulty.innerHTML = "Easy"
        mediumDifficulty.innerHTML = "Intermediate" //Need the difficulty thing to be selecting the last picked value.
        hardDifficulty.innerHTML = "Hard"

        pickDifficulty.id ="pickDifficulty"

        selectDifficulty.appendChild(pickDifficulty)
        selectDifficulty.appendChild(easyDifficulty)
        selectDifficulty.appendChild(mediumDifficulty)
        selectDifficulty.appendChild(hardDifficulty)
        
        difficultyForm.appendChild(selectDifficulty)
    
        selectDifficulty.id = "selectDifficulty"
        
        let labelCategory = document.createElement('label')
        let categoryText = document.createElement('p')

        categoryText.innerHTML = "Category"
        labelCategory.appendChild(categoryText)
        labelCategory.className = "labelTitle"

        closeForm.innerHTML = "X"
        closeForm.className = "closePopup"
        closeForm.id = objectiveNumber.toString() + "closeForm"

        descriptorParent.id = objectiveNumber.toString() +"descriptorParent"
        labelSubmit.innerHTML = "Submit"
        labelSubmit.className ="labelSubmit"
        labelSubmit.id = objectiveNumber.toString() + "submit"
        labelSubmit.setAttribute("type", 'button')


        titleText.innerHTML = "Title: "
        descriptionText.innerHTML = "Description: "
        labelTitle.className = "labelTitle"
        input.className = "formInput"
        input.id = "input"



        if (titles[objectiveNumber-1] != undefined) {
            input.setAttribute("value", titles[objectiveNumber-1]) //get value field.
        }
    
        labelTitle.appendChild(titleText)
        labelDescription.appendChild(descriptionText)
        labelDescription.className = "labelDescription"
        textarea.className = "textarea"
        textarea.id = "textarea"

        if (descriptions[objectiveNumber-1] != undefined)
            textarea.innerText = descriptions[objectiveNumber-1] 
        
        form.className = "form"
        form.appendChild(closeForm)
        form.appendChild(labelTitle)
        form.appendChild(input)
        form.appendChild(labelDifficulty)
        form.appendChild(difficultyForm)

        selectDifficulty.className = "selectDifficulty"
        //dropdown
        let category = document.createElement('span')
        let inputcategory = document.createElement('input')
        let ul = document.createElement('ul')

        ul.className = "categoryList"
        ul.id = "categoryList"
        inputcategory.className = "categoryBox"
        inputcategory.id = "searchCategory"
        category.className = "categoryContainer"
        category.id = "categoryContainer"

        inputcategory.setAttribute("autocomplete", "off")

        category.appendChild(inputcategory)
        category.appendChild(ul)


        if (categories[objectiveNumber-1] != undefined)  {
            inputcategory.setAttribute("value", categories[objectiveNumber-1])
        }

        //add category.
        form.appendChild(labelCategory)
        form.appendChild(category)

        //search category.
        inputcategory.addEventListener('keyup', searchCategory)

        let breakLine = document.createElement("br");

        form.appendChild(breakLine)
        form.appendChild(labelDescription)
        form.appendChild(textarea)


        form.appendChild(labelSubmit)
        descriptorParent.appendChild(form)
        document.body.appendChild(descriptorParent)

        let close = document.getElementById(objectiveNumber.toString() + 'closeForm')
        close.addEventListener("click", clickedCloseForm)
        
        let eve = document.getElementById(objectiveNumber.toString() + 'submit')
        eve.addEventListener("click", clickedSubmit)

        //add event listeners for difficulty levels.
        let select = document.getElementById("selectDifficulty")
        select.addEventListener("change", setDifficulty)
    
        //retrieve the data.
        let popup = document.getElementById(objectiveNumber.toString() + "descriptorParent") 
        let marginTop = (objectivesStore[objectiveNumber-1].position-1) * 127 + positionScroll
        popup.className ="popupform"
        popup.style.marginTop = marginTop.toString() + "px"

        currentPopupID = objectiveNumber
        return currentPopupID

    }

    function LearnJS() {
        const obj = {}

        //Create list
        obj.addList = function() {
            const positionContainer = document.createElement('div')
            const parentContainer = document.createElement('div')
            const container = document.createElement('div');
            const addButton = document.createElement('div');
            const textElem = document.createTextNode("+")
            
            container.id = "list";
            addButton.id = "addButton";

            parentContainer.className="listContainer"
            addButton.className = "addButton";
            
            addButton.appendChild(textElem)
            parentContainer.appendChild(container)
            parentContainer.appendChild(addButton)

            //Fix sidebar.
            positionContainer.className = "positionContainer"
            positionContainer.appendChild(parentContainer)

            parentContainer.id = "parentContainer"
            positionContainer.id = "positionContainer"
            document.body.appendChild(positionContainer)

            let add = document.getElementById("addButton") 
            add.addEventListener('click', userEventAdd)

           
        }

    
        obj.changeColor = function(objectiveNumber, color){

            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            let element = document.getElementById(objectiveNumber)

            if (!element)
                return
        

            if (color == "yellow") {
                element.style.backgroundColor = color
            }
            else if (color == "green") 
                element.style.backgroundColor = "lime"
            if (color == "red")
                element.style.backgroundColor = 'rgb(255, 105, 97)'

        }

        
        obj.addObjective = function(difficultyLevel="easy") {


            helperAddObjective(difficultyLevel)

            justAddedObjective = false
            if (difficultyLevel == "intermediate") {
                document.getElementById(numberOfObjectives).className = "intermediateObjective"
            }
            else if (difficultyLevel == "hard") {
                document.getElementById(numberOfObjectives).className = "hardObjective"
                
            }

            let searchInput = document.getElementById('searchInput')

            if (!searchInput)
                return numberOfObjectives
            //set the category value to the category that is currently filtered.
            categories[numberOfObjectives-1] = searchInput.value
             


            
            return numberOfObjectives
        }

        obj.deleteObjective = function(objectiveNumber) {

            if (!checkValidObjective(objectiveNumber)) {
                return;
            
            }

            

            let objectiveDelete = document.getElementById(objectiveNumber)

            
            //If it's not currently shown in the DOM, don't change.
            if (!objectiveDelete)
                return
        
            //need to also get the delete button.
            //pass into helper: the id and the id+closeButton
            let deleteButton = document.getElementById(objectiveNumber.toString() + "closeButton")
            helperDeleteObjective(objectiveDelete, deleteButton)

        }

        obj.editTitle= function(objectiveNumber, title) {

            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            let objectiveEdit = document.getElementById(objectiveNumber)

            if (!objectiveEdit)
                return

            //???
            titles[objectiveNumber-1] = title
            if (objectiveEdit.firstElementChild) {
                objectiveEdit.removeChild(objectiveEdit.firstElementChild)
            }
            
                let text = document.createElement("p")
                text.innerText = title
                text.className = "objectiveTitle"
                objectiveEdit.appendChild(text) //why does it not follow the same color scheme?


        }

        obj.editDescription = function(objectiveNumber, description) {

            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            if (descriptions[objectiveNumber-1] != undefined) {
                descriptions[objectiveNumber-1] = description
                return
            }
       
        }

        obj.editCategory = function(objectiveNumber, category="") {

            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            let elem = document.getElementById(objectiveNumber)

            //If it's not currently shown in the DOM, don't run.
            if (!elem)
                return

            if (categories[objectiveNumber-1] != undefined) {
                categories[objectiveNumber-1] = category
                
            }
            else
                return

            if (categories[objectiveNumber-1].toLowerCase()  != currentCategory.toLowerCase()  && currentCategory != "all") {
                    list.removeChild(objectivesStore[objectiveNumber-1].objective)
                    list.removeChild(objectivesStore[objectiveNumber-1].deleteButton)

                filteredPosition = 1
                    
                for (let i=0; i<objectivesStore.length; i++) {
                    //if user entered a blank or matches category then add back.
                    if (categories[i].toLowerCase()  == currentCategory.toLowerCase()  || currentCategory == "all") {
                        filteredPosition++
                        list.appendChild(objectivesStore[i].objective)
                        list.appendChild(objectivesStore[i].deleteButton)
                        objectivesStore[i].position = filteredPosition-1;
                    }
                }

            }
        }


        //change difficulty level of objective
        obj.editDifficulty = function(objectiveNumber, difficultyLevel) {

            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            let elem = document.getElementById(objectiveNumber)

            //If it's not currently shown in the DOM, don't change.
            if (!elem)
                return


            if (difficultyLevel =="easy") {
                document.getElementById(objectiveNumber).className = "objective"

            }

            else if (difficultyLevel == "intermediate") {
                document.getElementById(objectiveNumber).className = "intermediateObjective"
            }
            else if (difficultyLevel == "hard") {
                document.getElementById(objectiveNumber).className = "hardObjective"
                
            }

            if (difficulties[objectiveNumber-1] != undefined) {
                difficulties[objectiveNumber-1] = difficultyLevel
                return
            }
        }


        obj.addSearchBar = function () { 

            let searchContainer = document.createElement('span')
            let ul = document.createElement('ul')
            let input = document.createElement('input')
            searchContainer.className = "searchContainer"
            searchContainer.id = "searchContainer"
            input.className = "searchBox"
            ul.className = "searchList"
            input.id = "searchInput"
            ul.id = "searchList"

            input.setAttribute("placeholder", "Search category")
            input.setAttribute("autocomplete", "off")

            searchContainer.appendChild(input)
            searchContainer.appendChild(ul)
            document.body.appendChild(searchContainer)
            let searchChange = document.getElementById('searchInput')
            searchChange.addEventListener('keyup', searchObjectives)
        }


        obj.search = function(category) {

            //Check if there's an actual search container, if not can't do it.
            let searchContainer = document.getElementById("searchContainer")

            if (!searchContainer)
                return


            let searchInput = document.getElementById('searchInput')
            searchInput.setAttribute("value", category)

            if (category != "")
                searchDropdown(category)

        
            else {
                let searchList = document.getElementById("searchList")
                let searchContainer = document.getElementById('searchContainer')

                if (searchList)
                searchContainer.removeChild(searchList)
            
            }

        }

        obj.filter = function(category) {

            let searchContainer = document.getElementById("searchContainer")

            if (!searchContainer)
                return
            
            let searchInput = document.getElementById('searchInput')
            searchInput.setAttribute("value", category)
            filterObjectives(category)


        }


        obj.form = function(objectiveNumber, on) {


            if (!checkValidObjective(objectiveNumber)) {
                return;
            }

            let elem = document.getElementById(objectiveNumber)

            //If it's not currently shown in the DOM, don't run.
            if (!elem)
                return


            //only display if no other hovers or popups.

            if (currentPopupID != objectiveNumber && currentPopupID != -1)
                return

            justAddedObjective = false;
            if (on) {
                popupOpen = true
                currentPopupID = objectiveNumber
                helperShowForm(objectiveNumber)
                
            }
            
            else {
                popupOpen = false
                currentPopupID = -1

                let elem = document.getElementById(objectiveNumber.toString() + "descriptorParent")
                elem.parentNode.removeChild(elem)
            }
        }

        obj.addHideButton = function() {

            let hideButton = document.createElement('button')
            hideButton.innerHTML = "Hide list"
            document.body.appendChild(hideButton)
            hideButton.style.position="fixed"
            hideButton.style.top="20px"
            hideButton.className = "specialButtons"
            hideButton.id = "hideButton"
            hideButton.addEventListener("click", hideList)
        }


        obj.addMoveButton =function() {
            let moveButton = document.createElement('button')
            moveButton.innerHTML = "Move list"
            moveButton.className = "specialButtons"
            document.body.appendChild(moveButton)
            moveButton.style.position = "fixed"
            moveButton.style.top = "0px"
            moveButton.addEventListener("click", moveList)
        }


        obj.getCategories = function() {
            return categories
        }

        obj.getDescriptions = function() {
            return descriptions
        }

        obj.getDifficulties = function() {
            return difficulties 
        }

        obj.getTitles = function() {
            return titles 
        }

        
        return obj
    }


    function addEventClick(e) {

        helperClickObjective(e.currentTarget.id)
    }

    function userEventDelete(e) {

        if (popupOpen)
            return

        let deleteButton= document.getElementById(e.currentTarget.id)
        let objectiveDeleteID = deleteButton.id[0]
        let objDelete = document.getElementById(objectiveDeleteID)

    
        helperDeleteObjective(objDelete, deleteButton)

    }

    function userEventAdd(e) {


        if (popupOpen)
            return



        let newObjectiveId = helperAddObjective("easy")
        //update arrays
    


        helperShowForm(newObjectiveId)
        popupOpen = true

    }


    function userEventHover(e) {
        //Check if already shown.
        if (!popupOpen)
            helperHoverObjective(e.currentTarget.id)

    }

    function userEventRemovePopup(e) { 
        //should be turned off if popup is open.

        if (!popupOpen)  {
            let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")

            if (!elem)  
                return;

            elem.parentNode.removeChild(elem)
        }
    }

    function userEventForm(e) {
        e.preventDefault()

        if (popupOpen == true)
            return
        //disable hover.
        let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")

        if (elem != null)
            elem.parentNode.removeChild(elem)

        if (popupOpen == false) {

            helperShowForm(e.currentTarget.id)
            popupOpen = true
        }

    }

    function clickedCloseForm(e) {

        let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
        elem.parentNode.removeChild(elem)

        popupOpen = false;

        difficulties[currentPopupID-1] = currentDifficulty
        
        if (justAddedObjective) {
            
            let objectiveDelete = document.getElementById(currentPopupID)
            let deleteButton = document.getElementById((currentPopupID).toString() + "closeButton")
            helperDeleteObjective(objectiveDelete, deleteButton)

            

        }

    }

    function clickedSubmit(e) {

        let input = document.getElementById('input')
        let textbox = document.getElementById('textarea')

        let searchCategory = document.getElementById("searchCategory")
        let objectiveNumber = e.currentTarget.id[0]
        let objectiveEdit = document.getElementById(objectiveNumber)


        titles[objectiveNumber-1] = input.value

        if (objectiveEdit.firstElementChild) {
            objectiveEdit.removeChild(objectiveEdit.firstElementChild)
        }

        let text = document.createElement("p")
        text.innerText = titles[objectiveNumber-1]
        text.className = "objectiveTitle"
        objectiveEdit.appendChild(text) //why does it not follow the same color scheme?


        categories[objectiveNumber-1] = searchCategory.value

        let changeObjectiveDifficulty = document.getElementById(currentPopupID)
        

        if (difficulties[objectiveNumber-1] == "easy") {
            changeObjectiveDifficulty.className = "objective"
        }
        else if(difficulties[objectiveNumber-1] == "intermediate"){
            changeObjectiveDifficulty.className = "intermediateObjective"
        }
        else {

            changeObjectiveDifficulty.className = "hardObjective"
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
        const list = document.getElementById("list")

        //IF the category matches the current category KEEP, else remove it from the DOM.
        if (categories[objectiveNumber-1].toLowerCase()  != currentCategory.toLowerCase()  && currentCategory != "all") {
                list.removeChild(objectivesStore[objectiveNumber-1].objective)
                list.removeChild(objectivesStore[objectiveNumber-1].deleteButton)

            filteredPosition = 1
                
            for (let i=0; i<objectivesStore.length; i++) {
                //if user entered a blank or matches category then add back.
                if (categories[i].toLowerCase()  == currentCategory.toLowerCase()  || currentCategory == "all") {
                    filteredPosition++
                    list.appendChild(objectivesStore[i].objective)
                    list.appendChild(objectivesStore[i].deleteButton)
                    objectivesStore[i].position = filteredPosition-1;
                }
            }

        }

        justAddedObjective=false

    }


    //OnClick.
    function searchCategory (e) {

        //show suggested. e.g. type something and it shows matches. (dropdown of categories.)
        e.preventDefault()

        //Extract 
        let searchList = document.getElementById("categoryList")
        let searchContainer = document.getElementById('categoryContainer')
        let searchCategory = document.getElementById('searchCategory')

        if (searchList)
        searchContainer.removeChild(searchList)
    
        
        let matchingCategories = categories.filter(categoryy => {
            if (categoryy.toLowerCase().indexOf(searchCategory.value.toLowerCase()) >= 0 && searchCategory.value != "") {
                return true;
            }
            return false;
        })
    
        let categoriesFinal = [...new Set(matchingCategories)]
        categoriesFinal.sort()
    
        searchList = document.createElement('ul')
        searchList.id = "categoryList"
        searchList.className = "categoryList"
    
        for (let i =0; i < categoriesFinal.length; i++) {
            let li = document.createElement('li')
            li.className = "categoryElement"
            li.innerHTML = categoriesFinal[i]
            li.setAttribute("value", categoriesFinal[i])
            searchList.appendChild(li)
            li.addEventListener("click", clickCategory)
        }

        searchContainer.appendChild(searchList)

        if (Number.isInteger(e.keyCode) && e.keyCode != 13) {
            return    
        }
        
        if (searchList)
            searchContainer.removeChild(searchList)
    
    }

    function searchObjectives (e) {

    //show suggested. e.g. type something and it shows matches. (dropdown of categories.)
    e.preventDefault()

        currentSearching = true
        let searchInput = document.getElementById("searchInput")
        
        searchDropdown(searchInput.value)

        if (Number.isInteger(e.keyCode) && e.keyCode != 13) {
            return    
        }

        if (popupOpen == true)
            return

        filterObjectives(searchInput.value)
        currentSearching = false
        //currentSearching = false

    }

    function clickCategory(e) {
        e.preventDefault()
        let searchList = document.getElementById("categoryList")
        let searchContainer = document.getElementById('categoryContainer')
        let searchInput = document.getElementById('searchCategory')
        searchInput.value = e.currentTarget.innerHTML
        
        if (searchList)
            searchContainer.removeChild(searchList)
    }

    function enter(e) {
        //on enter key or when clicking a list item, REMOVE.

        if (popupOpen == true)
        return

        currentSearching = false
        e.preventDefault()
    
        let searchList = document.getElementById("searchList")
        let searchContainer = document.getElementById('searchContainer')
        let searchInput = document.getElementById('searchInput')
        searchInput.value = e.currentTarget.innerHTML

        for (let i=0; i<objectivesStore.length; i++) {
            if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
                

                list.removeChild(objectivesStore[i].objective)
                list.removeChild(objectivesStore[i].deleteButton)
            }
        }

        filteredPosition = 1

        //add everything in current filter.
        currentCategory = e.currentTarget.innerHTML

        if (currentCategory == "")
            currentCategory = "all"

        for (let i=0; i<objectivesStore.length; i++) {
            //if user entered a blank or matches category then add back.
            if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
                filteredPosition++
                list.appendChild(objectivesStore[i].objective)
                list.appendChild(objectivesStore[i].deleteButton)
            .LearnJS
                objectivesStore[i].position = filteredPosition-1;
            
            }
        }
        if (searchList)
        searchContainer.removeChild(searchList)

    }

    function setDifficulty(e) {

        if (this.value[0] != 'C')
            difficulties[currentPopupID-1] = this.value
        else
            difficulties[currentPopupID-1] = this.value.slice(9)
        
    }

    //Add LearnJS to the window object.
    global.LearnJS = global.LearnJS || LearnJS

})(window, window.document);