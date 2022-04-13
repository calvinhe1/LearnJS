const learn = LearnJS()
learn.addList()

learn.addSearchBar()
learn.addHideButton()
learn.addMoveButton()


//Cases: Add objective

let id = learn.addObjective()

//Edit objectives
learn.editTitle(id, "hey")
learn.editDescription(id, "hey")
learn.editCategory(id, "hey")
learn.editDifficulty(id, "hard")

//Change color
learn.changeColor(id, "red")


learn.addObjective("hard")
learn.addObjective()
learn.addObjective()
learn.addObjective("intermediate")
learn.addObjective()

learn.editDifficulty(3, "intermediate")


learn.editTitle(2, "Learn how to dance and multiply")
learn.editTitle(4, "Hey")
learn.editTitle(5, "Hey")
learn.editTitle(3, "Hey")
learn.editTitle(6, "Hey")


learn.editCategory(2, "Hey")
learn.editCategory(4, "Hey")
learn.editCategory(4, "Hqeqeqeqy")
learn.editCategory(5, "Heeeey")
learn.editCategory(3, "Hey")
learn.editCategory(6, "Heeeey")

learn.editDescription(2, "Hey")
learn.editDescription(4, "Hey")
learn.editDescription(5, "Hey")
learn.editDescription(3, "Hey")
learn.editDescription(6, "Hey")

//Disable any functionality while this is open
learn.showDescription(1,1)
learn.showDescription(1,0)

learn.changeColor(id, "green")


//Form
learn.form(1,1)
learn.form(1,0)


//Works.
learn.filter("Hey")

//Works


log(learn.getTitles())
log(learn.getCategories())
log(learn.getDescriptions())
log(learn.getDifficulties())

learn.addObjective()

learn.filter("")


for (let i=0; i<8; i++) {
    learn.editDifficulty(i, "hard")
    learn.changeColor(i, "green")
}


learn.filter("Hey")

learn.addObjective()




