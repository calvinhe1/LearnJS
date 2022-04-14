# 1) Link to landing page
https://protected-woodland-24087.herokuapp.com/landingpage.html

# 2) Getting started

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



# 3) Direct link to documentation
https://protected-woodland-24087.herokuapp.com/documentation/documentation.html
