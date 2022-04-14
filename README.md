# Frontend Mentor Challenge - Tip Calculator

## About

A simple web app that will split customer tip based on three given factors:
* Customer Bill
* Tip Percentage
* Number of People that will share on customer's tip  

This app will compute two things:
* Tip amount per person
  * Formula: (bill * tip percentage) / Number of persons sharing
* Accumulated or total tip per person
  * Formula: Accumulate + Tip amount per person

## Technologies Used

* HTML
* CSS
* SCSS
* JAVASCRIPT
* GULP 
  
## Issues

I wan't to prevent input fields to accecpt zero as first character. 

### Things I've Tried

I used addEventListener with keydown event to detect type of character, then store the key (e.key) in an array container and access that character using array index number. If the character is zero, then it will return a returnValue of false (e.returnValue = false) to prevent zero from being typed in the input field. This works but if user made a mistake and deletes characters using backspace, then the input field will now be able to accept zero as first character again.  

## Links To The Project

* [Github Repo](https://github.com/Pomz010/tip_calculator) 
* [Tip Calculator Webapp Link](https://pomz010.github.io/tip_calculator/)  
* [Frontend Mentor Challenge Link](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX)