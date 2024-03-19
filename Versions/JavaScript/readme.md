# Documentation

## First Things First, You Will Need To Import The Script: Add This to The Bottom of Your Body Element, Before Any Other Scripts: 
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript/SidGaut_[Version].js"></script>_
### OR
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript/Minfied/SidGaut_[Version].min.js"></script>_

<br>

## 1. Label class and labelInst.createLabel(Function)
Instantiate a Label object to create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#3-gotolabelinstance) for use). Then create a label with 'labelInst'.createLabel(Function).

**SidGautamJS: let 'labelInst' = new Label()<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**'labelInst'.createLabel(click())**

**JavaScript: _N/A_**

## 2. Label class and labelInst.createLabel(Function) **_Combined_**
Instantiate a Label object and create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#3-gotolabelinstance) for use) in one line, using the Label class' constructor.

**SidGautamJS: let 'labelInst' = new Label(click())**

**JavaScript: _N/A_**

## 3. goto(LabelInstance)
It calls the block of code that was created using createLabel(Function), with an instance of Label as the parameter.

**SidGautamJS: 'labelInst'.createLabel(click())<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**goto('labelInst')**<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_OR_**<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**let num = 0**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**'labelInst'.createLabel(() => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**print("stuff")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**num++**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**if (num < 5)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**goto(label)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_//Prints "stuff" 5 times_**

**JavaScript: _N/A_**

## 4. though(bool, Function)
It executes the code in 'Function', while 'bool' is false. It is a whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautamJS: though(false, () => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})**

**JavaScript: while(x) {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}**

## 5. doThough(Function, bool)
It executes the code in 'Function' once, then continues while 'bool' is false. It is a do{...}whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautamJS: doThough(() => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}, false)**

**JavaScript: do {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(x)**

## 6. until(start, end, increment, Function)
It executes the code in 'Fuction', until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is basically a for.

**SidGautamJS: until(0, 5, 1, click())**

**JavaScript: for(let i = 0; i < 5; i += 1) {click()}**

## 7. doUntil(start, end, increment)
It executes the code in 'Function' once, then continues until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is basically a do{...}while, but a do{...}for.

**SidGautamJS: doUntil(click(), 0, 5, 1)**

**JavaScript: let i = 0 <br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**do {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**i += 1**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(i < 5)**

## 8. repeat(number, Function)
It executes the code in 'Function' a certain amount of times (determined by 'number'). It is like a for.

**SidGautamJS: repeat(10, click())**

**JavaScript: for(let i = 0; i < 10; i += 1) {click()}**

## 9. showln(x)
It prints the value of 'x', regardless of what it is, to the web-page in an existing \<p>. Then it creates a new \<p> to write to. If no parameter is put (showln()), it will add a line-break (\<br>). It works like System.out.println(x) in Java.

**SidGautamJS: showln("Hello World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**
  
## 10. show(x)
It appends the value of 'x', regardless of what it is, to the web-page in an existing \<p>. It works like System.out.print(x) in Java.

**SidGautamJS: show("Hello ")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**show("World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**

## 11. showErr(x)
Same as [showln(x)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#9-showlnx), except the printed \<p> is red. **You must have a value in 'x'!**

**SidGautamJS: showErr("Error!")**

**JavaScript: _N/A_**

## 12. print(x)
Prints value of 'x' in the console. It is console.log(x).

**SidGautamJS: print("Hello World!")**

**JavaScript: console.log("Hello World!")**

## 13. printErr(x)
Prints value of 'x' in the console, as an error. It is console.error(x).

**SidGautamJS: printErr("Error!")**

**JavaScript: console.error(Error!")**

## 14. getEl(element, index)
This function allows for the selection of an HTML element. 'element' is a string containing the name of an HTML element; 'index' (starts from 0) is an optional parameter if there are multiple of the same element, and a specific one is to be selected. If there are multiple of the same element, and no index is put, it will select all the same elements. It is like document.querySelector(element) and document.querySelectorAll(element).

**SidGautamJS: getEl("p")&nbsp;&nbsp;&nbsp;_//Returns All \<p> elements_**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p", 0)&nbsp;&nbsp;&nbsp;_//Returns only the first \<p> element_**

**JavaScript: document.querySelectorAll("p")&nbsp;&nbsp;&nbsp;_//Returns All \<p> elements_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p")&nbsp;&nbsp;&nbsp;_//Returns the first \<p> element_**

## 15. element(s).css(property, value)
'element(s)' is a selected element (or multiple). This function allows for the manipulation of the styles of 'element(s)'. 'property' is the name of the CSS property; 'value' is the value of the CSS property. You can also use the CSS-Property names (background-color, font-size, color-scheme, etc).

**SidGautamJS: getEl("p", 0).css("color", "black") _OR_ getEl("p").css("color", "black")**

**JavaScript: document.querySelector("p").style.color = "black" _OR_ document.querySelectorAll("p").forEach((el) => el.style.color = "black")**

## 16. element.setVal(value)
'element' is a selected input element (\<input>). This function allows the value of an input element to be changed to 'value'. It is like document.querySelector("input").value = "\[stuff]".

**SidGautamJS: getEl("input", 0).setVal("Hello")**

**JavaScript: document.querySelector("input").value = "Hello"**

## 17. getVal(element)
'element' is a selected input element (\<input>). This function returns the value of an input element. It is like document.querySelector("input").value.

**SidGautamJS: getVal( getEl("input", 0) )**

**JavaScript: document.querySelector("input").value**

## 18. addEl(element, parent)
This function allows for the creation and appending of an HTML element. 'element' is a string containing the name of an HTML element; 'parent' is an optional parameter for the parent of where you want the element to be appended to, and it is also a string name of an HTML element. If 'parent' is not specified it will simply return the element without appending it to the DOM. It always returns the created element. It is like document.createElement(element) and document.createElement(parent).appendChild( document.createElement(element) ).

**SidGautamJS: addEL("p")&nbsp;&nbsp;&nbsp;_//Returns new \<p> element_**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**addEL("p", "main")&nbsp;&nbsp;&nbsp;_//Appends new \<p> to \<main> and returns new \<p> element_**

**JavaScript: document.createElement("p")&nbsp;&nbsp;&nbsp;_//Returns new \<p> element_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.createElement("main").appendChild( document.createElement("p") )&nbsp;&nbsp;&nbsp;_//Appends new \<p> to \<main>_**

## 22. element(s).delEl()
'element(s)' is a selected element (or multiple). This function allows for the removal of 'element(s)'. It is like document.querySelector("p").remove() or document.querySelectorAll("p").forEach((el) => el.remove()).

**SidGautamJS: getEl("p", 0).delEl() _OR_ getEl("p").delEl()**

**JavaScript: document.querySelector("p").remove()  _OR_ document.querySelectorAll("p").forEach((el) => el.remove())**

## 19. element.setText(text, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function allows the text within an HTML element to be changed to 'text'. 'html' is an optional boolean parameter, which is false by default, that asks if 'text' is plain text or includes HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").innerText = "\[stuff]" or document.querySelector("p").innerHTML = "\[stuff]". It also supports escape characters ("\n" will be converted to <br> if 'html' is false).

**SidGautamJS: getEl("p", 0).setText("Hi,\n My Name is Gautam")&nbsp;&nbsp;&nbsp;_//Sets body of \<p> element to "Hi,\<br> My Name is Gautam"_**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p").setText("Hi, \<br> My Name is \<span>Gautam\</span>", true)&nbsp;&nbsp;&nbsp;_//Sets body of \<p> element<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to "Hi," \<br> "My Name is " \<span>Gautam\</span>_**

**JavaScript: document.querySelector("p").innerText = "Hi,\n My Name is Gautam"&nbsp;&nbsp;&nbsp;_//Sets body of \<p> element to "Hi,\<br> My Name is Gautam"_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML = "Hi, \<br> My Name is \<span>Gautam\</span>"&nbsp;&nbsp;&nbsp;_//Sets body of \<p> element<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to "Hi," \<br> "My Name is " \<span>Gautam\</span>_**

## 20. element.appendText(text, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function allows the text within an HTML element to have 'text' appeded to it. 'html' is an optional boolean parameter, which is false by default, that asks if 'text' is plain text or includes HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").innerText += "\[stuff]" or document.querySelector("p").innerHTML += "\[stuff]". It also supports escape characters ("\n" will be converted to <br> if 'html' is false).

**SidGautamJS: getEl("p", 0).appendText("\nMy Name is Gautam")&nbsp;&nbsp;&nbsp;_//Adds "\<br>My Name is Gautam" to the body of \<p> element_**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p").appendText("\<br> My Name is \<span>Gautam\</span>", true)&nbsp;&nbsp;&nbsp;_//Adds<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br> "My Name is " \<span>Gautam\</span> to the body of \<p> element_**

**JavaScript: document.querySelector("p").innerText += "\nMy Name is Gautam"&nbsp;&nbsp;&nbsp;_//Adds "\<br>My Name is Gautam" to the body of \<p> element_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML += "\<br> My Name is \<span>Gautam\</span>"&nbsp;&nbsp;&nbsp;_//Adds<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br> "My Name is " \<span>Gautam\</span> to the body of \<p> element_**

## 21. getText(element, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function returns the text within an HTML element. 'html' is an optional boolean parameter, which is false by default, that asks if the plain text should be returned, or if the text should be returned as HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").innerText or document.querySelector("p").innerHTML. It also supports escape characters ("\n" will be converted to <br> if 'html' is false).

**SidGautamJS: getText( getEl("p", 0) )&nbsp;&nbsp;&nbsp;_//Returns the body of \<p> element: "Hi,\n My Name is Gautam"_**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getText( getEl("p", 0), true )&nbsp;&nbsp;&nbsp;_//Returns the body of \<p> element as HTML: "Hi," \<br> "My Name is " \<span>Gautam\</span>_**

**JavaScript: document.querySelector("p").innerText&nbsp;&nbsp;&nbsp;_//Returns the body of \<p> element: "Hi,\n My Name is Gautam"_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML&nbsp;&nbsp;&nbsp;_//Returns the body of \<p> element as HTML: "Hi," \<br> "My Name is "<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<span>Gautam\</span>_**<be>

## 23. element(s).setClass(class)
'element(s)' is a selected element (or multiple). This function adds 'class' as a class on 'element(s)'. It is like document.querySelector("p").className = class or document.querySelectorAll("p").forEach((el) => el.className = class1).

**SidGautamJS: getEl("p", 0).setClass("class1") _OR_ getEl("p").setClass("class1")**

**JavaScript: document.querySelector("p").className = "class1" _OR_ document.querySelectorAll("p").forEach((el) => el.className = "class1")**

## 24. getClass( element(s) )
'element(s)' is a selected element (or multiple). This function returns the class assigned to 'element(s)'. If one element is selected it returns the class as a string; If there are multiple elements selected, it returns the classes as an array of strings. It is like document.querySelector("p").className.

**SidGautamJS: getClass( getEl("p", 0) )&nbsp;&nbsp;&nbsp;_//Returns "class1"_<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getClass( getEl("p") )&nbsp;&nbsp;&nbsp;_//Returns \["class1", "class2", "class3", ...]_**

**JavaScript: document.querySelector("p").className&nbsp;&nbsp;&nbsp;_//Returns "class1"_**

## 25. element.setID(idName)
'element' is a selected element. This function adds 'idName' as an id on 'element'. It is like document.querySelector("p").id = idName.

**SidGautamJS: getEl("p", 0).setID("main")**

**JavaScript: document.querySelector("p").id = "main"**

## 26. getID(element)
'element' is a selected element. This function returns the id assigned to 'element'. It is like document.querySelector("p").id.

**SidGautamJS: getID( getEl("p", 0) )&nbsp;&nbsp;&nbsp;_//Returns "main"_**

**JavaScript: document.querySelector("p").id&nbsp;&nbsp;&nbsp;_//Returns "main"_**

## 27. element(s).whenOn(listener, function, capture)
'element(s)' is a selected element (or multiple). This adds an event handler to 'element(s)'. 'listener' is a string which is the name for an event listener (click, focus, blur, etc.), and when the event occurs, the code in 'function' is executed. 'capture' is an optional boolean value that is false by default, and it asks if the handler should use capture or not. It is like document.querySelector("p").addEventListener(listener, function, capture).

**SidGautamJS: getEl("p", 0).whenOn( "click", (e) => e.currentTarget.delEl() )<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getEl("p").whenOn( "mouseover", (e) => e.currentTarget.css("color", "red"), true )**

**JavaScript: document.querySelector("p").addEventListener( "click", (e) => e.currentTarget.remove(), false ) _OR_ _N/A_**

## 28. element(s).notOn(listener, function, capture)
'element(s)' is a selected element (or multiple). This removes an event handler from 'element(s)'. 'listener' is a string which is the name for the originally added event listener (click, focus, blur, etc.). 'function' is the original callback function used as the event handler (It must be a named function, in both the element(s).whenOn() and here. See [Anonymous functions do not work with remove event listener](https://www.semicolonandsons.com/code_diary/javascript/anonymous-functions-do-not-work-with-remove-event-listener)). 'capture' must be the same boolean value that was originally set. It is like document.querySelector("p").removeEventListener(listener, function, capture).

**SidGautamJS: getEl("p", 0).notOn("click", deleteEl)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getEl("p").notOn("mouseover", deleteEl, true)**

**JavaScript: document.querySelector("p").removeEventListener("click", deleteEl, false) _OR_ _N/A_**

## 29. element(s).addAttr(attr)
'element(s)' is a selected element (or multiple). This function adds 'attr' as attributes (and the value) on 'element(s)'. It accepts as many valid attributes as you can apply. It is like document.querySelector("p").setAttribute(attribute, value) or <br>
document.querySelectorAll("p").forEach((el) => el.setAttribute(attribute, value)).

**SidGautamJS: getEl("a", 0).addAttr("href=index.html") _OR_ getEl("a").addAttr("href=index.html")** <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("a", 0).addAttr("href=index.html", "target=_blank") _OR_ getEl("a").addAttr("href=index.html", "target=_blank")**

**JavaScript: document.querySelector("p").setAttribute("href", "index.html") <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_OR_ document.querySelectorAll("p").forEach((el) => el.setAttribute("href", "index.html")**

## 30. unless(bool, body, elseBody)
'bool' is a boolean statement, 'body' is a function, and 'elseBody' is an optional function. It executes the code in 'body', if 'bool' is false; Then, If 'bool' is true and 'elseBody' is defined, it executes the code in 'elseBody'. It is an ifNot.

**SidGautamJS: unless(false, () => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**print("executed")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}, () => {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**print("not executed")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})**<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**unless(false, () => {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**print("executed again")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})**

**JavaScript: if(true) {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**console.log("executed")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} else**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**console.log("not executed")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}**<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**if(true) {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**console.log("executed again")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}**

## 31. dont()
_DON'T EXECUTE THIS FUNCTION!_

**SidGautamJS: dont()**

**JavaScript: _N/A_**

## 32. doNot()
doNot() is a function, which stands for "Do Nothing". It does nothing.

**SidGautamJS: doNot()**

**JavaScript: _N/A_**

## 33. table()
table() is a function, which summons a magical table. The table has an input field where one may ask the table questions; The table will respond.

**SidGautamJS: table()**

**JavaScript: _N/A_**

## 34. delay(secs, function)
'secs' is a number. It executes the code in 'function', after 'secs' seconds. It returns a "delayID", which can be used to remove the delayed function from the queue (See [removeDelay(delayID)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#35-removedelaydelayid)). It is like setTimeout(function, secs).

**SidGautamJS: delay(2, click())**

**JavaScript: setTimeout(click(), 2000)&nbsp;&nbsp;&nbsp;_//setTimeout uses milliseconds instead of seconds_**

## 35. removeDelay(delayID)
'delayID' is a number returned by the delay() function (See [delay(secs, function)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#34-delaysecs-function)). This function removes the delayed method from the queue and stops it from executing. It is like clearTimeout(delayID).

**SidGautamJS: let myVal = delay(2, click())**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeDelay(myVal)

**JavaScript: let myVal = setTimeout(click(), 2000)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clearTimeout(myVal)

## 36. delayRepeat(secs, function)
'secs' is a number. It executes the code in 'function', every 'secs' seconds. It returns a "delayRepID", which can be used to remove the delayed loop from the queue (See [removeDelayRepeat(delayRepID)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#37-removedelayrepeatdelayrepid)). It is like setInterval(function, secs).

**SidGautamJS: delayRepeat(2, click())**

**JavaScript: setInterval(click(), 2000)&nbsp;&nbsp;&nbsp;_//setInterval uses milliseconds instead of seconds_**

## 37. removeDelayRepeat(delayRepID)
'delayRepID' is a number returned by the delayRepeat() function (See [delayRepeat(secs, function)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript#36-delayrepeatsecs-function)). This function removes the delayed method from the queue and stops it from executing. It is like clearInterval(delayRepID).

**SidGautamJS: let myVal = delayRepeat(2, click())**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;removeDelayRepeat(myVal)

**JavaScript: let myVal = setInterval(click(), 2000)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clearInterval(myVal)

## 38. getLoremIpsum(sentenceNum, paragraphNum)
'sentenceNum' is the optional number of sentences per paragraph (defaults to 1) and 'paragraphNum' is the optional number of paragraphs (defaults to 1). If no parameters are passed, then it randomizes both parameters (up to 7). The maximum parameter value is 50. The function returns HTML formatted lorem ipsum text (placeholder gibberish text). **It must be put into an element as html.**

**SidGautamJS: getEl("div").setText(getLoremIpsum())&nbsp;&nbsp;&nbsp;_//Puts a randomized amount of Lorem Ipsum text into div_**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("div").setText(getLoremIpsum(6, 2))&nbsp;&nbsp;&nbsp;_//Puts 2 paragraphs, each with 6 sentences, of Lorem Ipsum text into div_**

**JavaScript: _N/A_**

## 39. darkenTheme(colour)
'color' is an optional colour string (hex-code or name) (defaults to "white" or "#FFFFFF"). The function changes a page to dark theme, and uses 'color' as highlighting.

**SidGautamJS: darkenTheme()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**darkenTheme('blue')&nbsp;&nbsp;&nbsp;_//Changes page to dark theme with blue highlights_**

**JavaScript: _N/A_**
