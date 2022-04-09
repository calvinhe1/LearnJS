"use strict"

//Open visual list of learning goals.
const objecter = LearnJS()
objecter.addList()



//Add learning goals/objectives to the list to keep track of what learning objectives are in this webpage.
objecter.addObjective()

//Add a title and description/summary of that objective.
objecter.addTitle(1, "Learn HTML")
objecter.addDescription(1, "Discussed some important HTML facts, and some relevant HTML elements including <!doctype html>, <html>, <head>, <title>, <body>, and <p>")
objecter.addCategory(1, "Cat")

objecter.addObjective()
objecter.addTitle(2, "Learn CSS")
objecter.addDescription(2, "Discussed some important CSS facts, and reviewed some CSS examples as well as learned the general CSS snytax: \"element {css declarations; }\" ")
objecter.addCategory(2, "Cat")

objecter.addObjective()

//click to signify understanding of the objective, making the objective "green"
console.log("ABOUT TO CLICK")
objecter.clickObjective(1)

//delete 4th objective.


objecter.addSearchBar()



//fill in the form to populate the learning objective, and click "submit" to populate objective.
//objecter.addForm(3,1)

// Need to turn off form before opening something else.
//objecter.addForm(3,0)


//Show pop up of description information of objective.
//objecter.showPopup(2,1)

//turn off popup.
//objecter.showPopup(2,0)

























