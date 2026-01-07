# SidGautamScript Documentation

## DataTypes
A datatype is the kind of data that a variable stores. It also tells the program how to interpret a value, so that it knows the operations allowed, such as arithmetic on numbers versus concatenation on text.
<br>
Understanding datatypes is important in any programming language. 

[How To Get a Variable's Datatype](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#datatypearg)

<br>

### StringLiterals
The String datatype is used to represent textual data. It can act as a list of characters. Each element in the String occupies a position in the String. The first element is at index 0, the next at index 1, and so on. The length of a String is the number of elements in it. You can create strings using string literals or template literals.

[Extra Importable String Utilities](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/strutils.md)

[Built-in Function to Convert to String](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#strobj)

<br>
All strings are enclosed by double quotes ( " ), and you can add escape characters: \n \"

```python
var string = "Hello\nWorld";

print(string); # Prints the string variable
```
```javascript
"Hello
World"
```

<br>
It does not need to be stored in a variable for any of its uses:

```python
print("Hello\nWorld"); # Prints the string literal to the console
```
```javascript
"Hello
World"
```

<br>
You can concatenate strings with other datatypes:

```python
var string = "Hello World ";

print(string + 1); # Prints the string variable concatenated with a number 
```
```javascript
"Hello World 1"
```

<br>

```python
var string = "Hello World ";

print(string + "in Canada!"); # Prints the string variable concatenated with a string literal
```
```javascript
var string = "Hello World ";

print(string + "in Canada!"); # Prints the string variable concatenated with a string literal
```
<br>

#### Template literals
String literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them.

<br>
Template literals are enclosed by single quotes ( ' ) instead of double quotes, and can contain placeholders. These are indicated by the curly braces ({expression}):

```python
var string = 'Hello
World';

print(string); # Prints the string variable
```
```javascript
"Hello
World"
```

<br>
It does not need to be stored in a variable for any of its uses:

```python
print('Hello
World'); # Prints the string variable
```
```javascript
"Hello
World"
```

<br>
You can embed other datatypes into the string:

```python
var string = 'Hello World {1}';

print(string); # Prints the template literal, with the number embedded 
```
```javascript
"Hello World 1"
```

<br>

```python
var string = 'Hello World {"from Canada!"}';

print(string); # Prints the template literal, with the string literal embedded 
```
```javascript
"Hello World from Canada!"
```

<br>
You can even do expressions:

```python
var string = 'Hello World {1 + 1}';

print(string); # Prints the template literal, with the number embedded 
```
```javascript
"Hello World 2"
```

<br>

```python
var string = 'Hello World, {!true}';

print(string); # Prints the template literal, with the boolean embedded 
```
```javascript
"Hello World, false"
```

<br>

### NumberLiterals
The Number datatype is used to represent numeric data. There can be double (floating point) and integer numbers

[Extra Importable Math Properties](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/math.md)

<br>

```python
var num = 12;

print(num); # Prints the num variable
```
```javascript
12
```

<br>
It does not need to be stored in a variable for any of its uses:

```python
print(12); # Prints the number literal to the console
```
```javascript
12
```

<br>
You can also do doubles (floating point numbers):

```python
print(15.24096); # Prints the number literal to the console
```
```javascript
15.24096
```

<br>
The great thing about numbers, is that you can do arithmetic with them:

```python
var num = 2 + 2;

print(num); # Prints the num to the console
```
```javascript
4
```

<br>

```python
var num = (40 * 2) - (5.5 * 2);

print(num); # Prints the num to the console
```
```javascript
69
```

### ListLiterals
Lists, like arrays in other programming languages, enable the storage of a collection of multiple items under a single variable name.
<br>
Any datatype can be a value in the list. Including functions.

Lists are zero-indexed: the first element of an array is at index 0, the second is at index 1, and so on. The last element is at the value of the array's length  minus 1.
<br>
List elements cannot be accessed using arbitrary strings as indices, but must be accessed using non-negative integers as indices.

[Extra Importable List Utilities](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/listutils.md)

<br>
List Example:

```python
var list = {1, 2, 3, "4"};

print(list); # Prints the list to the console
```
```javascript
[
  1,
  2,
  3,
  "4"
]
```

<br>
You can get any specific element in a list by calling its index:

```python
var list = {1, 2, 3, "4"};

print(list[1]); # Prints the second element to the console (Remember, counting starts at 0)
```
```javascript
2
```

<br>
You can also get null!

```python
var list = {1, 2, 3, "4"};

print(list[10]); # Prints the non-existent eleventh element to the console (Remember, counting starts at 0)
```
```javascript
null
```

<br>
You can also edit/add specific elements at specific indices:

```python
var fruits = {"Apple", "Banana"}; # Declare and instantiate a list with two elements

print(fruits); # Prints the list to the console

fruits[0] = "Tomato"; # Changes the first element from "Apple" to "Tomato"
fruits[2] = "Apple"; # Adds a third element with the value of "Apple"

print(fruits); # Prints the list to the console
```
```javascript
[
  "Apple",
  "Banana"
]
[
  "Tomato",
  "Banana",
  "Apple"
]
```

<br>
To get the last element:

```python
var fruits = {"Apple", "Banana", "Tomato"}; # Declare and instantiate a list with two elements

var lastIndex = len(fruits) - 1; # Gets the length of the list minus 1, which is the last index

print(fruits[lastIndex]); # Prints the last element to the console
```
```javascript
"Tomato"
```

<br>

### ObjectLiterals
Objects are used to store various keyed collections and more complex entities. It is like lists but has key-value pairs.
<br>
Any datatype can be a value in the object. Including functions.

[Extra Importable Object Utilities](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/objutils.md)

<br>
Example:

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  followers: 420
};

print(developer); # Prints the object and its properties
```
```javascript
{
  "firstName": "Gautam",
  "lastName": "Batta",
  "location": "Canada",
  "online": true,
  "followers": 420
}
```

<br>
Like lists, you can index each property of an object. Except you use the key's name as a string or dot notation:

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  followers: 420
};

print(developer["location"]); # Prints the location property
```
```javascript
"Canada"
```

<br>

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  followers: 420
};

print(developer.followers); # Prints the followers property
```
```javascript
420
```

<br>
Remember, you can store any datatype as a value:

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  projects: {
    "SidGautamAI",
    "SidGautamNotes",
    "SidGautamOS",
    "SidGautamScript"
  }
};

print(developer["projects"]); # Prints the projects list property
```
```javascript
[
  "SidGautamAI",
  "SidGautamNotes",
  "SidGautamOS",
  "SidGautamScript"
]
```

<br>

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  favouriteFunction: print
};

developer.favouriteFunction("Hmmm"); # Calls my favourite function
```
```javascript
"Hmmm"
```

<br>

### Booleans

### FunctionObjects

### NULL

<br>

## Statements
### import \<module\>
Imports the functions and variables of compiled files into the current script.

<br>
The following snippet imports the Math library, packaged with the files.

```python
import "Math";
```
  
<br>
The following snippet imports a compiled sidgc file from the same directory as the current script.

```python
import "./functions";
```

<br>

[More Info on Built-in Libraries](https://github.com/GautamBatta73/SidGautam/tree/main/Versions/Prog_Language/Documentation/Libraries)

<br>

### until (\<initialization\>, \<condition\>, \<afterthought\>)
An until loop repeats until a specified condition evaluates to false. It is similar to the JavaScript for loop.

<br>
Example 1:

```python
until (var i = 0, i < 5, i = i + 1) { # Declares i as 0, declares ending condition as when i < 5, then increments i by 1 every pass
  print(i); # Prints i after each iteration.
}
```
```javascript
0
1
2
3
4
```
  
<br>
Example 2:

```python
var list  = {1, 2, 3, 4, 5}; # Declare and instantiate list
var x = NULL; # Declare x

until (x = 0, x < len(list), x = x + 1) { # Instantiates x and sets it to 0, declares ending condition as when x < length of list, then increments x by 1 every pass
  print(list[x]); # Prints the element of list at index x after each iteration.
}

print("Final:", x); # Prints the final value of x
}
```
```javascript
1
2
3
4
5
"Final:" 5
```

<br>

### though (\<condition\>)
A though statement executes its statements as long as a specified condition evaluates to false.

<br>
Example 1:

```python
var n = 0; # Declare and instantiate n to 0
var x = 0; # Declare and instantiate x to 0

though (n >= 3) { # Sets the ending condition to be if n IS more than or equal to 3
  n = n + 1; # Increments n by 1
  x = x + n; # Increments x by n
}

print(n); # Prints final value of n
print(x); # Prints final value of x
```
```javascript
3
6
```
  
<br>
Example 2:

```python
though (false) { # Sets the ending condition to false. i.e. It will never end
  print("INFINITE POWER!"); # Prints "INFINITE POWER!" until your terminal times out
}
```
```javascript
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
"INFINITE POWER!"
...
```

<br>

### unless (\<condition\>) orElse
The unless...orElse statement executes a statement if a specified condition is false. If the condition is false, another statement in the optional orElse clause will be executed.

<br>
Example 1:

```python
var b = true; # Declare and instantiate b to true

unless (b == false) { # Sets the starting condition to 'unless b is false, don't the following.'
  print("This is true"); # Since b is the literal opposite of false, this should print
}
```
```javascript
"This is true"
```
  
<br>
Example 2:

```python
var x = 10; # Declare and instantiate x to 10

unless (x > 11) { # Sets the starting condition to 'unless x is more than 11, don't the following.'
  print("x is less than 11"); # Since x is not more than 11, this should print
} orElse {
  print("x is more than or equal to 11"); # If x was more than or equal to 11, this would print
}
```
```javascript
"x is less than 11"
```

<br>

### var \<name\> = \<expression>
The var declaration declares re-assignable, block-scoped local variables, initializing each to a value of a datatype.
<br>
ALL VAR DECLARATIONS END WITH A SEMI-COLON ( ; ), EVEN MULTI-LINE ONES!

<br>
Example 1:

```python
var x = NULL; # Declare and instantiate x to NULL

print(x); # Prints the value of x
```
```javascript
null
```
  
<br>
Example 2:

```python
var string = "hello " + "world"; # Declare and instantiate string to "hello world"

print(string); # Prints the value of string
```
```javascript
"hello world"
```

<br>

### final \<name\> = \<expression>
The final declaration declares block-scoped constant local variables. The value of a constant can't be reassigned, and even if a constant is an object or list, its properties/elements can't be added, updated, or removed. If you try, an error will be thrown on compile and/or execution.
<br>
ALL FINAL DECLARATIONS END WITH A SEMI-COLON ( ; ), EVEN MULTI-LINE ONES!

<br>
Example 1:

```python
final x = NULL; # Declare and instantiate x to NULL

print(x); # Prints the value of x
```
```javascript
null
```
  
<br>
Example 2:

```python
final string = "hello " + "world"; # Declare and instantiate string to "hello world"

string = "Hello World"; # Try to change it, but an error is thrown during compilation

print(string); # Tries to print the value of string
```
```javascript
Error: string is a constant.
Do not reassign, at line: 2 and column: 2
```

<br>

### func \<name\>(\<parameters\>)
Functions are a fundamental building block in any programming language. A function is essentially a set of statements that performs a task or calculates a value, and it should take some input and return an output.
<br>
To use a function, you must define it somewhere in the scope from which you wish to call it. Either with the full syntax or as a lambda expression.

<br>
Example 1 (Full Syntax):

```python
func printNum(number) { # Defines a function that takes in one parameter
  print(number); # Prints said parameter
}

printNum(69); # Calls the function with a passed parameter
```
```javascript
69
```
  
<br>
Example 2 (Lambda Syntax):

```python
var printNum = (number) -> print(number); # Defines a function that takes in one parameter, which prints said parameter

printNum(69); # Calls the function with a passed parameter
```
```javascript
69
```

<br>
Example 3 (Full Syntax):

```python
var x = 8; # Declare and instantiate x to 8

func incrementX() { # Defines a function called incrementX
  x = x + 1; # increments the x variable
}

incrementX(); # Executes the code in the function
incrementX(); # Executes the code in the function, again

print(x); # Prints the value of x
```
```javascript
10
```
  
<br>
Example 4 (Lambda Syntax):

```python
var x = 8; # Declare and instantiate x to 8

final incrementX = () -> { # Defines a lambda function called incrementX
  x = x + 1; # increments the x variable
};

incrementX(); # Executes the code in the function
incrementX(); # Executes the code in the function, again

print(x); # Prints the value of x
```
```javascript
10
```

<br>

### pass \<expression\>
The pass statement ends function execution and specifies a value to be returned to the function caller.

<br>
Example 1:

```python
func getRectArea(width, height) { # Defines a function that takes 2 parameters, which are assumed to be numbers
  unless (!(width > 0 && height > 0)) { # Checks if the parameters are more than 0
    pass width * height; # Passes the product of the parameter back to the caller, then ends the call
  }
  pass 0; # Passes 0 back to the caller, given the function call has not ended by now
}

print(getRectArea(3, 4)); # Calls the function with parameters more than 0
print(getRectArea(-3, 4)); # Calls the function with parameters less than 0
```
```javascript
12
0
```
  
<br>
Example 2 (Returning a function):

```python
func magic() { # Defines a function that takes no parameters
  pass ((x) -> x * 2); # Passes a lambda function, which takes a parameter assumed to be a number, back to the caller
}

var answer = magic(); # Calls the function that returns a function, and gets passed the inner function, which is stored in a variable

print(answer(15)); # Calls the variable function with a parameter
```
```javascript
30
```

<br>

## Native Variables and Functions
### dataType(\<arg\>)
Returns a string indicating the type of the arg's value. 
<br>
This is the best way to check for NULL.

[More Info on Datatypes](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#datatypes)

<br>
Example 1:

```python
var add = (x, y) -> { # Defines a function that takes 2 parameters, which are assumed to be numbers
  unless (dataType(x) == "null" || dataType(y) == "null") { # Checks if both parameters are not NULL
    pass x + y; # Adds the non-NULL parameters
  } orElse {
    pass 0; # Passes 0 to the caller, if any or all of the parameters are NULL
  }
};

print(add()); # Calls function without parameters, which means they get a NULL value
print(add(7)); # Calls function with one NULL parameter
```
```javascript
0
0
```

Since the compiler and executor are in JS, both say that x and/or y are *undefined*, but such a thing does not exist in SidGautamScript.
Checking for NULL, checks for any falsy values that are not numbers, strings, objects, booleans, or lists.
  
<br>
Example 2:

```python
func someFunction() { # Defines a function that takes no parameters, and passes -1
  pass -1;
}

print(dataType(someFunction)); # Prints the function's dataType without calling it
```
```javascript
"Function"
```

You can use functions as normal variables, without calling them, if you omit the brackets.

<br>

### str(\<obj\>)
The str() function is a built-in function that takes an object as input and returns its value converted to a string. It can be used to convert all datatypes into strings, which can then be used for printing, concatenation, and formatting.

<br>
Example 1:

```python
func someFunction() { # Defines a function that takes no parameters, and passes -1
  pass -1;
}

print(str(someFunction)); # Prints the function's string version without calling it
```
```javascript
"FunctionObject()"
```

<br>

```python
var add = (x, y) -> { # Defines a function that takes 2 parameters, which are assumed to be numbers
  unless (dataType(x) == "null" || dataType(y) == "null") { # Checks if both parameters are not NULL
    pass x + y; # Adds the non-NULL parameters
  } orElse {
    pass 0; # Passes 0 to the caller, if any or all of the parameters are NULL
  }
};

print(str(add)); # Prints the function's string version without calling it
```
```javascript
"FunctionObject(x, y)"
```

<br>
Example 2:

```python
var string = "Hello World";

print(str(string)); # Prints the variable's string version
```
```javascript
"Hello World"
```

<br>
Example 3:

```python
var obj = {
    name: "Gautam",
    age: 20
};

print(str(obj)); # Prints the variable's string version
```
```javascript
"{
  name: Gautam,
  age: 20
}"
```

<br>

```python
var list = {1, 2, 3, 4, 5};

print(str(list)); # Prints the variable's string version
```
```javascript
"[
  1,
  2,
  3,
  4,
  5
]"
```
