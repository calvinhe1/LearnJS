"use strict";

const learn = LearnJS()

//add list container to hold learning objectives
learn.addList()

//Add learning goals/objectives to the list
learn.addObjective("easy")
learn.addObjective("intermediate")
learn.addObjective("hard")

learn.deleteObjective(3)
