"use strict"

const log = console.log
let numberOfObjectives=0
let currentPopupID = -1
let descriptions = [];
let titles = [];
let categories = [];
let popupOpen = false
let justAddedObjective = false
let objectivesStore = []; //Used to re-add, hide objectives rather than completely removing it; simply remove it from DOM if it doesn't match the search.
let currentCategory = "all";
let objectivesFilter = [];
let filteredPosition  = 1;


function searchDropdown(search) {

    let searchList = document.getElementById("searchList")
    let searchContainer = document.getElementById('searchContainer')
  
    if (searchList)
      searchContainer.removeChild(searchList)
  
    //take searchInput.value and run the filter with this. 

  
     let matchingCategories = categories.filter(category => {
          if (category.toLowerCase().indexOf(search.toLowerCase()) >= 0 && search.value != "") {
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

    //Remove all the objectives that were in previous filter.
    for (let i=0; i<objectivesStore.length; i++) {
        
        if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
            list.removeChild(objectivesStore[i].objective)
            list.removeChild(objectivesStore[i].deleteButton)
        }
    }

    filteredPosition = 1
    currentCategory = search //replace with search

    if (currentCategory == "")
        currentCategory = "all"

    for (let i=0; i<objectivesStore.length; i++) {
        
        //if user entered a blank or matches category then add back.
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
function helperAddObjective() {
    if (popupOpen)
        return

    const list = document.getElementById("list")
    const objective = document.createElement('div')
    //objective.style = 'word-wrap: break-word; font-weight: bold; width: 50px; height: 50px; border: 1px; border-radius: 50%; background-color: aqua; border-style: solid; margin-top: 20px; margin-bottom: 20px; margin-left: 14px; text-align: center;';
    
    objective.style.backgroundColor = 'rgb(255, 105, 97)'   

    numberOfObjectives++
    objective.id = numberOfObjectives
    objective.className = "objective"
 
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

    let position = filteredPosition
    filteredPosition++


    const objectivePair = {objective: objective, deleteButton: closeButton, position: position, new: true}
    

    objectivesStore.push(objectivePair)
    
    justAddedObjective = true



    return objective.id

   
}

function helperDeleteJustAddedObjective(deleteObjective) {

    let list = document.getElementById("list")
    list.removeChild(document.getElementById(deleteObjective))
    list.removeChild(document.getElementById(deleteObjective.toString() + "closeButton"))
      
    numberOfObjectives--;

    return numberOfObjectives;
}

function helperDeleteObjective(deleteObjective, deleteButton) {

    if (popupOpen)
        return

    let list = document.getElementById("list")
    let id = deleteObjective.id


    //remove from master list of objectives.

    objectivesStore.splice(id-1,1) 

    list.removeChild(deleteObjective)
    list.removeChild(deleteButton)

    //also delete from arrays.
    descriptions.splice(parseInt(id)-1, 1)
    titles.splice(parseInt(id)-1, 1)
    //Change all previous IDs -1.
    categories.splice(parseInt(id)-1)

  

    //Change the ids of the objectives that come AFTER it to ensure correct ID.

    //Issue is the DOM elements might not be present. In that case, rather manipulate the objectives array.
    for (let i=parseInt(id)+1; i<numberOfObjectives+1; i++) {
        let objective = document.getElementById(i)
      

        //NULL because currently not in the DOM, but should still update position.
        if (objective == null) {
            objectivesStore[i-2].objective.setAttribute('id', i-1)
         
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

    if (descriptions[e-1] != undefined)
        descriptor.innerText = descriptions[e-1]

    descriptor.id = e.toString() + "descriptor"

    descriptorParent.appendChild(descriptor)
    document.body.appendChild(descriptorParent)

    let popup = document.getElementById(e.toString() + "descriptorParent")
    let popupText  = document.getElementById(e.toString() + "descriptor")


    
    popup.className = "popuphover"

    //popup.style="position: absolute; top: 50px; right: 150px; border: 2px solid black; word-wrap:break-word; padding: 2px; min-height: 75px; min-width: 150px; float: right; margin-right: 20px; background-color: Bisque; max-width: 250px;  "
    
   
    let marginTopw = (e-1) * 108
    
    //popup.style.marginTop = marginTop.toString() + "px"
    
   
    let marginTop = (objectivesStore[e-1].position-1)  * 108
    
    popup.style.marginTop = marginTop.toString() + "px"

    popupText.style = "text-align: center;"

    currentPopupID = e

    objectivesStore[e-1].new = false

    //Submitted form.
    justAddedObjective = false;

    return currentPopupID

}


//pass in the objective number.
function helperShowForm(objectiveNumber) {

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

    pickDifficulty.innerHTML = "---"
    easyDifficulty.innerHTML = "Easy"
    mediumDifficulty.innerHTML = "Intermediate" //Need the difficulty thing to be selecting the last picked value.
    hardDifficulty.innerHTML = "Hard"

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

    //let category = document.createElement('input')
    //category.className = "formInput"

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

    inputcategory.setAttribute("placeholder", "category")
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
    let marginTop = (objectivesStore[objectiveNumber-1].position-1) * 100
    popup.className ="popupform"
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

        //parentContainer.style = 'width: 80px; height:100%; background-color: #F0F8FF; float: right; margin-right: 25px; border-style: solid; right:25px;';
        parentContainer.className="listContainer"
        const addButton = document.createElement('div');
        addButton.id = "addButton";

        addButton.className = "addButton";

        //addButton.style = 'text-align: center; background-color: red; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;position: relative; left: 36%; color: white; text-align: center; font-weight: bold; font-size: 17px; '
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

    //Difficulty level.
    obj.addObjective = function(difficultyLevel="easy") {
        helperAddObjective()

        if (difficultyLevel == "intermediate") {
            document.getElementById(numberOfObjectives).className = "intermediateObjective"
        }
        else if (difficultyLevel == "hard") {
            document.getElementById(numberOfObjectives).className = "hardObjective"
            
        }
        


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

    obj.addCategory = function(objectiveNumber, category="") {
        if (categories[objectiveNumber-1] != 'undefined') {
            categories[objectiveNumber-1] = category
            return
        }
        categories.push(category)
    }


    //change difficulty level of objective
    obj.addDifficulty = function(objectiveNumber, difficultyLevel) {


        if (difficultyLevel =="easy") {
            document.getElementById(objectiveNumber).className = "objective"

        }

        else if (difficultyLevel == "intermediate") {
            document.getElementById(objectiveNumber).className = "intermediateObjective"
        }
        else if (difficultyLevel == "hard") {
            document.getElementById(objectiveNumber).className = "hardObjective"
            
        }
        


    }

    //Apply a search (also should show on the input!)
   

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

        input.setAttribute("placeholder", "category")
        input.setAttribute("autocomplete", "off")

        searchContainer.appendChild(input)
        searchContainer.appendChild(ul)
        document.body.appendChild(searchContainer)
        let searchChange = document.getElementById('searchInput')
        searchChange.addEventListener('keyup', searchSubmit)
    }

    //Need a function for filtered state, and one for list.
    
    obj.search = function(search, on=1) {

        //

        if (on)
            searchDropdown(search)
        else {
            let searchList = document.getElementById("searchList")
            let searchContainer = document.getElementById('searchContainer')

            if (searchList)
              searchContainer.removeChild(searchList)
        
        }

    }

    obj.filter = function(search) {
        
        filterObjectives(search)

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
    let objectiveDeleteID = deleteButton.id[0]
    let objDelete = document.getElementById(objectiveDeleteID)

    helperDeleteObjective(objDelete, deleteButton)

}

function addEventAdd(e) {
    let newObjectiveId = helperAddObjective()
    //addEventForm(newObjectiveId)
    //addEventForm() //with the new.
    //show new form.

    helperShowForm(newObjectiveId)
    popupOpen = true
    //set a variable here.
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

function clickedCloseForm(e) {

    //if users want to make an empty objective, that's their choice.

    let elem = document.getElementById(currentPopupID.toString() + "descriptorParent")
    elem.parentNode.removeChild(elem)

    popupOpen = false;


    if (justAddedObjective) {
        let objectiveDelete = document.getElementById(currentPopupID)
        let deleteButton = document.getElementById((currentPopupID).toString() + "closeButton")
        helperDeleteObjective(objectiveDelete, deleteButton)
    }

    /*
    
    if (objectivesStore[currentPopupID-1].new == true) {
        //delete.
        let objectiveDelete = document.getElementById(currentPopupID)
        //need to also get the delete button.
        //pass into helper: the id and the id+closeButton
        let deleteButton = document.getElementById((currentPopupID).toString() + "closeButton")
        helperDeleteObjective(objectiveDelete, deleteButton)

        //remove from the 
      
    }*/
}

function clickedSubmit(e) {

    let input = document.getElementById('input')
    let textbox = document.getElementById('textarea')

    let searchCategory = document.getElementById("searchCategory")

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

    //Update category value.
  
    categories[objectiveNumber-1] = searchCategory.value


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
    if (categories[objectiveNumber-1] != currentCategory && currentCategory != "all") {
            list.removeChild(objectivesStore[objectiveNumber-1].objective)
            list.removeChild(objectivesStore[objectiveNumber-1].deleteButton)

        filteredPosition = 1
            
        for (let i=0; i<objectivesStore.length; i++) {
            //if user entered a blank or matches category then add back.
            if (categories[i] == currentCategory || currentCategory == "all") {
                filteredPosition++
                list.appendChild(objectivesStore[i].objective)
                list.appendChild(objectivesStore[i].deleteButton)
                objectivesStore[i].position = filteredPosition-1;
            }
        }

    }


    //change all positions to the right position after doing an EDIT.
    objectivesStore[objectiveNumber-1].new = false

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

function searchSubmit (e) {

  //show suggested. e.g. type something and it shows matches. (dropdown of categories.)
  e.preventDefault()
  /*
  let searchList = document.getElementById("searchList")
  let searchContainer = document.getElementById('searchContainer')
  

  if (searchList)
    searchContainer.removeChild(searchList)

  //take searchInput.value and run the filter with this. 
  const list = document.getElementById("list")

   let matchingCategories = categories.filter(category => {
        if (category.toLowerCase().indexOf(searchInput.value.toLowerCase()) >= 0 && searchInput.value != "") {
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
   searchContainer.appendChild(searchList)*/

   searchDropdown(searchInput.value)

   if (Number.isInteger(e.keyCode) && e.keyCode != 13) {
        return    
    }

    filterObjectives(searchInput.value)

    //Remove all the objectives that were in previous filter.

    /*
    for (let i=0; i<objectivesStore.length; i++) {
        
        if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
            list.removeChild(objectivesStore[i].objective)
            list.removeChild(objectivesStore[i].deleteButton)
        }
    }

    filteredPosition = 1
    currentCategory = searchInput.value

    if (currentCategory == "")
        currentCategory = "all"

    for (let i=0; i<objectivesStore.length; i++) {
        
        //if user entered a blank or matches category then add back.
        if (categories[i].toLowerCase() == currentCategory.toLowerCase() || currentCategory == "all") {
            filteredPosition++
            list.appendChild(objectivesStore[i].objective)
            list.appendChild(objectivesStore[i].deleteButton)
          
            objectivesStore[i].position = filteredPosition-1;
        }
    }

    if (searchList)
    searchContainer.removeChild(searchList)*/

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
          
            objectivesStore[i].position = filteredPosition-1;
        
        }
    }
    if (searchList)
    searchContainer.removeChild(searchList)
}


function setDifficulty(e) {

    let changeObjectiveDifficulty = document.getElementById(currentPopupID)
    if (this.value == "easy") {
        changeObjectiveDifficulty.className = "objective"
    }
    else if (this.value == "intermediate") {
        changeObjectiveDifficulty.className = "intermediateObjective"
    }
    else {
        changeObjectiveDifficulty.className ="hardObjective"
    }

    //let selectDifficulty = document.getElementById()
}
