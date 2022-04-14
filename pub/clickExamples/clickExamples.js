"use strict";

const learn = LearnJS()

//add list container to hold learning objectives
learn.addList()

//Add Examples
//Add learning goals/objectives to the list
learn.addObjective("easy")
learn.addObjective("intermediate")
learn.addObjective("hard")

//Delete example
learn.deleteObjective(3)

//Editing examples
learn.editTitle(1, "Learn how to add objectives")
learn.editTitle(2, "Learn how to delete objectives")

learn.editDescription(1,"Users can click the plus button to add an objective.")
learn.editDescription(2,"Users can click the delete button to remove an objective.")

learn.editCategory(1,"Add")
learn.editCategory(2,"Delete")

learn.editDifficulty(1, "hard")

//learn.form(1,1)

//learn.form(1,0) to close the form. Must turn off a form before opening another form.

learn.addHideButton()
learn.addMoveButton()

//Show the description of an objective
//learn.showDescription(1,1)

learn.addSearchBar()

//learn.search("Add")
learn.filter("Add")

//Makes the learning objective yellow
learn.changeColor(1, "yellow")

