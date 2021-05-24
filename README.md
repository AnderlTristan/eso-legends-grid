## ESO Legends Card Grid

Front end web application used to display an infinitely scrolling grid of cards from the Elder Scrolls Online Legends API using React. 

## TODO
- More components
    - create new component modules for the following:
        - Text Input
        - Select
        - Header
        - Card Grid
- Create more custom hooks
    - Separate logic and rendering by creating hooks for infinite scrolling and text input fields
- More testing
- New UI features
    - Pull icons from ESO website to display more information on cards 
    - Modal to show more information about a card on click 
- CSS3 Variables
    - Using BEM architecture for classes. Would eventually like to add theme modifiers to easily change component styles


## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`  

## Reflection
- I have never implemented an infinitely scrolling web application before, I've only ever used standard breadcrumb pagination. This was a challenging but valuable experience as it gave me more insight in how much utility React hooks have (especially using useRef and useCallback to locate elements when scrolling)
- This is also my first time using styled componenets. Most of my past work has been done using SASS modules, but I figured styled components would be a good way to add CSS to this project as it if fairly small in scope. I will definitely be researching more and figuring out how to best structure those styles for easier readability and reuse.