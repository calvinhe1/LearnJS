"use strict";

const learn = LearnJS()

//add list container to hold learning objectives
learn.addList()

//Add learning goals/objectives to the list
learn.addObjective("easy")
learn.addObjective("intermediate")
learn.addObjective("hard")


learn.editTitle(1, "Learn how to add objectives")
learn.editTitle(2, "Learn how to search objectives")

learn.editDifficulty(1, "hard")

//Delete examples
learn.deleteObjective(3)

//Form examples
//learn.form(1,1)

//Hover examples
learn.editDescription(1,"Users can click the plus button to add an objective.")

//Show the description of an objective
learn.showDescription(1,1)
learn.showDescription(1,0)

learn.addSearchBar()

learn.editCategory(1,"Add")
learn.editCategory(2,"Delete")

learn.search("Add")

learn.search("")



learn.filter("Add")

//Makes the learning objective yellow
learn.changeColor(1)

//Makes the learning objective green if clicked again. If clicked again, will go back to red.
learn.changeColor(1)


/*
//Add a title and description/summary of that objective.
objecter.addTitle(1, "Learn the truth of society!!!ddddd")
objecter.addDescription(1, "Discussed some important HTML facts, and some relevant HTML elements including <!doctype html>, <html>, <head>, <title>, <body>, and <p>")
objecter.addCategory(1, "Cb")

objecter.addObjective("hard")

objecter.addTitle(2, "Learn CSS")
objecter.addDescription(2, "Discussed some important CSS facts, and reviewed some CSS examples as well as learned the general CSS snytax: \"element {css declarations; }\" ")
objecter.addCategory(2, "Cac")



//click to signify understanding of the objective, making the objective "green"

objecter.clickObjective(1)

objecter.addObjective()
objecter.addTitle(3, "Learn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thddddd")
objecter.addDescription(2, "Discussed some important CSS facts, and revieLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddLearn the truth of society!!!dddewqewqewqewqewqewqewqewqewqewqewqewqeqwewqewqewqeqweqwewqewqewqeqwewqeddLearn thdddddwed some CSS examples as well as learned the general CSS snytax: \"element {css declarations; }\" ")
objecter.addCategory(3, "Cabbb")



objecter.addSearchBar()

objecter.addDifficulty(1, "intermediate")


console.log(LearnJS())

//empty category case. fails.




//fill in the form to populate the learning objective, and click "submit" to populate objective.
//objecter.addForm(3,1)

// Need to turn off form before opening something else.
//objecter.addForm(3,0)


//Show pop up of description information of objective.
//objecter.showPopup(2,1)

//turn off popup.
//objecter.showPopup(2,0)








*/
















