# LearnJS

LearnJS is a JavaScript library that allows developers to help strengthen the learning process for users of their websites. This library provides an interactive note-taking interface that developers can apply to their websites to remind users of important learning objectives on their websites. Users themselves can make their own notes, and edit, search, and delete ideas with this library, allowing for an interactive learning mechanism.

# How it works

A learning objective for this library consists of a title, description, and category. Users are able to see the titles of the learning objectives when they visit the page. If they’d like to see the content of the learning objective (the description), they can hover their cursor over it on the webpage. 

Additionally, each learning objective has a category, in which users can use the searching mechanism to filter learning objectives by categories to view data in groups.

Users can hide the learning objectives and unhide them wherever their cursor is on the web page to allow for quick and easy access to the learning objectives.

There are different colours and shapes to customize the learning objectives, to represent the user’s progress and the difficulty of the objective. The idea is for users to click on the learning objectives to track their progress while navigating the website.

### Colours
* Red = No progress currently on the learning objective
* Yellow = Some progress currently on the learning objective
* Green = Completed the learning objective 

### Shapes
* Circle = Easy learning objective
* Squircle = Medium learning objective
* Square = Hard learning objective


Below is the landing page for this library. Examples and documentation are provided as well to give a clear picture of how to use this.


# Link to main landing page
https://murmuring-atoll-13136.herokuapp.com/landingpage.html

Note: can view examples and documentation by clicking on the respectively labelled buttons, and also can go back to the main landing page by clicking the LearnJS logo.


# Getting started

Download the LearnJS.js and LearnJS.css files into your working directory, then link the LearnJS.js and LearnJS.css files to your webpage.


Example of integration of library into a basic webpage
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Your title</title>
    <link rel="stylesheet" href="LearnJS.css">
    <link rel="stylesheet" href="yourcssfile.css">
    <script defer type="text/javascript" src="LearnJS.js"></script>
    <script defer type="text/javascript" src="yourjsfile.js"></script>
  </head>
  <body>
  </body>
</html>
```



To get started with using the library, create a LearnJS object in your JS file.

Then, add a list container to hold the learning objectives that will be added to it.


Recommended: Include a hide list button, move list button, and search bar as well to improve the usability of the library (see example pages to see usefulness).
```javascript
//Get LearnJS Object
const learn = LearnJS()

//Add a list container
learn.addList()

//Add search bar for future searching of learning objectives by category
learn.addSearchBar()

//Add a hide button to hide/unhide the list of learning objectives
learn.addHideButton()

//Add a move button to move the list of learning objectives, so users can view it anywhere
learn.addMoveButton()
```

# Docmentation
https://murmuring-atoll-13136.herokuapp.com/documentation/documentation.html
