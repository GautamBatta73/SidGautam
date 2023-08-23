# Documentation

## First Things First, You Will Need To Import The Script: Add This to The Bottom of Your Body Element, Before Any Other Scripts: 
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript(ProtoType)/SidGaut_[Version].js"></script>_
### OR
_<script src="ht<span>tps://raw.githack.</span>com/GautamBatta73/SidGautam/main/Versions/JavaScript(ProtoType)/Minfied/SidGaut_[Version].min.js"></script>_

<br>

## 1. Label class and labelInst.createLabel(Function)
Instantiate a Label object to create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript(ProtoType)#3-gotolabelinstance) for use). Then create a label with 'labelInst'.createLabel(Function).

**SidGautam: let 'labelInst' = new Label()<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**'labelInst'.createLabel(click())**

**JavaScript: _N/A_**

## 2. Label class and labelInst.createLabel(Function) **_Combined_**
Instantiate a Label object and create a label (See [goto(LabelInstance)](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/JavaScript(ProtoType)#3-gotolabelinstance) for use) in one line, using the Label class' constructor.

**SidGautam: let 'labelInst' = new Label(click())**

**JavaScript: _N/A_**

## 3. goto(LabelInstance)
It calls the block of code that was created using createLabel(Function), with an instance of Label as the parameter.

**SidGautam: 'labelInst'.createLabel(click())<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**goto('labelInst')**

**JavaScript: _N/A_**

## 4. though(bool, Function)
It executes the code in 'Function', while 'bool' is false. It is a whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautam: though(false, () => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**})**

**JavaScript: while(x) {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}**

## 5. doThough(Function, bool)
It executes the code in 'Function' once, then continues while 'bool' is false. It is a do{...}whileNot. **It must return a boolean, else it will crash your web page.**

**SidGautam: doThough(() => {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**return true**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**}, false)**

**JavaScript: do {<br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**x = false**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(x)**

## 6. until(start, end, increment, Function)
It executes the code in 'Fuction', until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is basically a for.

**SidGautam: until(0, 5, 1, click())**

**JavaScript: for(let i = 0; i < 5; i += 1) {click()}**

## 7. doUntil(start, end, increment)
It executes the code in 'Function' once, then continues until 'start' becomes 'end', by incrementing 'start' by 'increment'. It is basically a do{...}while, but a do{...}for.

**SidGautam: until(click(), 0, 5, 1)**

**JavaScript: let i = 0 <br>**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**do {**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**click()**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**i += 1**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**} while(i < 5)**

## 8. repeat(number, Function)
It executes the code in 'Function' a certain amount of times (determined by 'number'). It is like a for.

**SidGautam: repeat(10, click())**

**JavaScript: for(let i = 0; i < 10; i += 1) {click()}**

## 9. showln(x)
It prints the value of 'x', regardless of what it is, to the web-page in an existing \<p>. Then it creates a new \<p> to write to. If no parameter is put (showln()), it will add a line-break (\<br>). It works like System.out.println(x) in Java.

**SidGautam: showln("Hello World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**
  
## 10. show(x)
It appends the value of 'x', regardless of what it is, to the web-page in an existing \<p>. It works like System.out.print(x) in Java.

**SidGautam: show("Hello ")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**show("World!")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**showln()**

**JavaScript: _N/A_**

## 11. showErr(x)
Same as [showln(x)](https://github.com/GautamBatta73/SidGautam/edit/main/Versions/JavaScript(ProtoType)#9-showlnx), except the printed \<p> is red. **You must have a value in 'x'!**

**SidGautam: showErr("Error!")**

**JavaScript: _N/A_**

## 12. print(x)
Prints value of 'x' in the console. It is console.log(x).

**SidGautam: print("Hello World!")**

**JavaScript: console.log("Hello World!")**

## 13. printErr(x)
Prints value of 'x' in the console, as an error. It is console.error(x).

**SidGautam: printErr("Error!")**

**JavaScript: console.error(Error!")**

## 14. getEl(element, index)
This function allows for the selection of an HTML element. 'element' is a string containing the name of an HTML element; 'index' (starts from 0) is an optional parameter if there are multiple of the same element, and a specific one is to be selected. If there are multiple of the same element, and no index is put, it will select all the same elements. It is like document.querySelector(element) and document.querySelectorAll(element).

**SidGautam: getEl("p") (All \<p> elements)**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p", 0) (The first \<p> element)**

**JavaScript: document.querySelectorAll("p") (All \<p> elements)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p") (The first \<p> element)**

## 15. element.css(property, value)
'element' is a selected element. This function allows for the manipulation of the styles of 'element'. 'property' is the name of the CSS property; 'value' is the value of the CSS property.

**SidGautam: getEl("p", 0).css("color", "black")

**JavaScript: document.querySelector("p").style.color = "black"

## 16. element.setVal(value)
'element' is a selected input element (\<input>). This function allows the value of an input element to be changed to 'value'. It is like document.querySelector("input").value = "\[stuff]".

**SidGautam: getEl("input", 0).setVal("Hello")**

**JavaScript: document.querySelector(input).value = "Hello"**

## 17. getVal(element)
'element' is a selected input element (\<input>). This function returns the value of an input element. It is like document.querySelector("input").value.

**SidGautam: getVal( getEl("input", 0) )**

**JavaScript: document.querySelector(input).value**

## 18. addEl(element, parent)
This function allows for the creation and appending of an HTML element. 'element' is a string containing the name of an HTML element; 'parent' is an optional parameter for the parent of where you want the element to be appended to, and it is also a string name of an HTML element. If 'parent' is not specified it will simply return the element without appending it to the DOM. It always returns the created element. It is like document.createElement(element) and document.createElement(parent).appendChild( document.createElement(element) ).

**SidGautam: addEL("p") (Returns new \<p> element)**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**addEL("p", "main") (Appends new \<p> to \<main> and returns new \<p> element)**

**JavaScript: document.createElement("p") (Returns new \<p> element)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.createElement("main").appendChild( document.createElement("p") ) (Appends new \<p> to \<main>)**

## 19. element.setText(text, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function allows the text within an HTML element to be changed to 'text'. 'html' is an optional boolean parameter, which is false by default, that asks if 'text' is plain text or includes HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").textContent = "\[stuff]" or document.querySelector("p").innerHTML = "\[stuff]".

**SidGautam: getEl("p", 0).setText("Hi, My Name is Gautam") (Sets body of \<p> element to "Hi, My Name is Gautam")**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p").setText("Hi, \<br> My Name is \<span>Gautam\</span>", true) ( Sets body of \<p> element to<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Hi," \<br> "My Name is " \<span>Gautam\</span> )**

**JavaScript: document.querySelector("p").innerText = "Hi, My Name is Gautam" (Sets body of \<p> element to "Hi, My Name is Gautam")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML = "Hi, \<br> My Name is \<span>Gautam\</span>" ( Sets body of \<p> element to<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Hi," \<br> "My Name is " \<span>Gautam\</span> )**

## 20. element.appendText(text, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function allows the text within an HTML element to have 'text' appeded to it. 'html' is an optional boolean parameter, which is false by default, that asks if 'text' is plain text or includes HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").textContent += "\[stuff]" or document.querySelector("p").innerHTML += "\[stuff]".

**SidGautam: getEl("p", 0).appendText("My Name is Gautam") (Adds "My Name is Gautam" to the body of \<p> element)**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getEl("p").appendText("\<br> My Name is \<span>Gautam\</span>", true) (Adds<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br> "My Name is " \<span>Gautam\</span> to the body of \<p> element)**

**JavaScript: document.querySelector("p").innerText += "My Name is Gautam" (Adds "My Name is Gautam" to the body of \<p> element)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML += "\<br> My Name is \<span>Gautam\</span>" (Adds<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br> "My Name is " \<span>Gautam\</span> to the body of \<p> element)**

## 21. element(s).delEl()
'element(s)' is a selected element (or multiple). This function allows for the removal of 'element(s)'. It is like document.querySelector("p").remove() or document.querySelectorAll("p").forEach((el) => el.remove()).

**SidGautam: getEl("p", 0).delEl() _OR_ getEl("p").delEl()**

**JavaScript: document.querySelector("p").remove()  _OR_ document.querySelectorAll("p").forEach((el) => el.remove())**

## 22. getText(element, html)
'element' is a selected HTML element that can have a body of text (\<p>, \<span>, \<div>, etc.). This function returns the text within an HTML element. 'html' is an optional boolean parameter, which is false by default, that asks if the plain text should be returned, or if the text should be returned as HTML: ( "Hi, \<br> My Name is \<span>Gautam\</span>" ). It is like document.querySelector("p").textContent or document.querySelector("p").innerHTML.

**SidGautam: getText( getEl("p", 0) ) (Returns the body of \<p> element: "Hi, My Name is Gautam")**<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**getText( getEl("p", 0), true ) (Returns the body of \<p> element as HTML: "Hi," \<br> "My Name is " \<span>Gautam\</span>)**<br>

**JavaScript: document.querySelector("p").innerText (Returns the body of \<p> element: "Hi, My Name is Gautam")**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**document.querySelector("p").innerHTML (Returns the body of \<p> element as HTML: "Hi," \<br> "My Name is "<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<span>Gautam\</span>)**<be>

## 23. element(s).setClass(class)
'element(s)' is a selected element (or multiple). This function adds 'class' as a class on 'element(s)'. It is like document.querySelector("p").className = 'class' or document.querySelectorAll("p").forEach((el) => className = 'class1').

**SidGautam: getEl("p", 0).setClass("class1") _OR_ getEl("p")..setClass("class1")**

**JavaScript: document.querySelector("p").className = 'class1' _OR_ document.querySelectorAll("p").forEach((el) => className = 'class1')**

## 24. getClass( element(s) )
'element(s)' is a selected element (or multiple). This function returns the class assigned to 'element(s)'. If one element is selected it returns the class as a string; If there are multiple elements selected, it returns the classes as an array of strings. It is like document.querySelector("p").className.

**SidGautam: getClass( getEl("p", 0) ) Returns "class1"<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getClass( getEl("p") ) Returns \["class1", "class2", "class3", ...]**

**JavaScript: document.querySelector("p").className**
