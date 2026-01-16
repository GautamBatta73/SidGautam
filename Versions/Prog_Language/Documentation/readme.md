# SidGautamScript Documentation

## DataTypes
A datatype is the kind of data that a variable stores. It also tells the program how to interpret a value, so that it knows the operations allowed, such as arithmetic on numbers versus concatenation on text.
<br>
Understanding datatypes is important in any programming language. 

[How To Get a Variable's Datatype](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#datatypearg)

<br>

### Strings
The String datatype is used to represent textual data. It can act as a list of characters. Each element in the String occupies a position in the String. The first element is at index 0, the next at index 1, and so on. The length of a String is the number of elements in it. You can create strings using string literals or template literals.

[Extra Importable String Utilities](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/strutils.md)

[Built-in Function to Convert to String](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#strobj)

<br>
Fun Fact- All string comparison is case-insensitive:

```python
var string = "hello world";

print(string == "HELLO WORLD"); # Prints true if both are equal
```
```javascript
true
```

<br>

#### String Literals

<br>
All string literals are enclosed by double quotes ( " ), and you can add escape characters: \n \"

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

#### Template Literals
Template literals are like string literals, but allow embedded expressions. You can use multi-line strings and string interpolation features with them.

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

### Numbers
The Number datatype is used to represent numeric data. There can be double (floating point) and integer numbers

[Extra Importable Math Properties](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/Libraries/math.md)

[Built-in Function to Convert to Integer](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#intobj)

[Built-in Function to Convert to Double](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#doubleobj)

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

<br>

### Lists
Lists, like arrays in other programming languages, enable the storage of a collection of multiple items under a single variable name.
<br>
Any datatype can be a value in the list. Including functions.

Lists are zero-indexed: the first element of a list is at index 0, the second is at index 1, and so on. The last element is at the value of the list's length  minus 1.
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

### Objects
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
If you use the 'this' identifier, you can refer to the object itself to access internal properties/methods:

```python
var obj = { # Declare and instantiate an object with a 'this' reference
  getNum: () -> 5,
  getSum: () -> this.getNum() + 5 # Grabs the value of 'this' object's getNum() method, adds 5, then passes it to the caller
};

print(obj.getSum()); # Prints the value of the getSum() method
```
```javascript
10
```

<br>

### Booleans
Boolean values can be one of two values: true or false, representing the truth value of a logical statement.
<br>
Boolean values come from relational and equality operators, logical NOT ( ! ), and some functions like isEmpty(). They are mainly used in conditional testing, such as unless, until, and while statements.

<br>
Examples:

```python
var isObject = (obj) -> dataType(obj) == "Object"; # Defines a lambda function that takes in one parameter, and checks if its datatype is an object

var obj = {
    name: "Gautam",
    age: 20
};

print(isObject(obj)); # Prints true if obj is an Object
```
```javascript
true
```

<br>

```python
var isObject = (obj) -> dataType(obj) == "Object"; # Defines a lambda function that takes in one parameter, and checks if its datatype is an object

var obj = {}; # This is an empty list, not an object 

unless (isObject(obj)) { # Checks if obj isn't an Object
  print("Not an Object!");
} orElse { # Checks if obj is an Object
  print("Object!");
}
```
```javascript
"Not an Object!"
```

<br>

### Functions
Functions are like subprograms that can be called by other code, having their own body of statements. It can take parameters and return a value. In SidGautamScript, they can be passed around, returned, and assigned like other datatypes. To use a function, you must define it somewhere in the scope from which you wish to call it. Either with the full syntax or as a lambda expression.
<br>
They are technically a type of object, but are not treated as such.

[More About Functions](https://github.com/GautamBatta73/SidGautam/blob/main/Versions/Prog_Language/Documentation/readme.md#func-nameparameters)

<br>
Examples:

```python
func multiply(x, y) { # Defines a function that takes in two parameters
  pass x * y; # Passes the product back to the caller
}

print(multiply(5, 5)); # Prints (5 * 5)
```
```javascript
25
```

<br>
You can also have a function as a variable, and do a one-liner. This is called a lambda expression:

```python
var isObject = (obj) -> dataType(obj) == "Object"; # Defines a lambda function that takes in one parameter, and checks if its datatype is an object

var obj = isObject; # This is a function value

print(isObject(isObject)); # Prints false, because, while it technically is an object, I consider it a separate datatype
```
```javascript
false
```

<br>

### NULL
The NULL keyword represents the absence of any object value. It is the absence of instantiation.
<br>
When a variable has no value, it is NULL

<br>
Example:

```python
func test(t) { # Defines a function that takes in one parameter
  pass t; # Passes the parameter back to the caller
}

var x = test(); # Calls the function without parameters, and assigns the passed value to x

print(x); # Prints NULL because x is NULL, as the parameter had no value
```
```javascript
null
```

<br>

## Expressions and Operators
### Assignment Expression
This is how one instantiates/assigns a value to a variable.

<br>
Incrementing a value:
 
 ```python
var x = 0; # Declare and instantiate x to 0

print(x); # Prints the value of x

x = x + 1; # Increments the value of x by 1

print(x); # Prints the value of x
```
```javascript
0
1
```

<br>
Decrementing a value:
 
 ```python
var x = 1; # Declare and instantiate x to 0

print(x); # Prints the value of x

x = x - 1; # Decrements the value of x by 1

print(x); # Prints the value of x
```
```javascript
1
0
```

<br>

### Comparison Operators
This is how one compares a value to another.

<br>
Equality:
 
 ```python
var x = 50; # Declare and instantiate x to 50

var y = 50; # Declare and instantiate x to 50

print(x == y); # Prints true if x has the same value as y
```
```javascript
true
```

<br>

 ```python
var x = "TEST"; # Declare and instantiate x to a string

var y = "test"; # Declare and instantiate y to a string

print(x == y); # Prints true if x has the same value as y
```
```javascript
true
```

<br>
If you want to check for equality with objects, functions, and lists, you can try stringifying first:

```python
var test1 = { # Declare and instantiate test1 as an object
    name: "Gautam",
    age: 20
};

var test2 = { # Declare and instantiate test2 as an identical object
    name: "Gautam",
    age: 20
};

print(str(test1) == str(test2)); # Prints true if stringified test1 has the same value as stringified test2
```
```javascript
true
```

<br>

```python
var test1 = {1, 2, 3, 4, 5}; # Declare and instantiate test2 as a list

var test2 = {1, 2, 3, 4, 5}; # Declare and instantiate test2 as a different list

print(str(test1) == str(test2));  # Prints true if stringified test1 has the same value as stringified test2
```
```javascript
true
```

<br>
Inequality:
 
 ```python
var x = 50; # Declare and instantiate x to 50

var y = 60; # Declare and instantiate x to 60

print(x != y); # Prints true if x doen't have the same value as y
```
```javascript
true
```

<br>

 ```python
var x = "TEST"; # Declare and instantiate x to a string

var y = "test4"; # Declare and instantiate y to a string

print(x != y); # Prints true if x doen't have the same value as y
```
```javascript
true
```

<br>
If you want to check for inequality with objects, functions, and lists, you can try stringifying first:

```python
var test1 = { # Declare and instantiate test1 as an object
    name: "Gautam",
    age: 20
};

var test2 = { # Declare and instantiate test2 as an identical object
    name: "Joshua",
    age: 23
};

print(str(test1) != str(test2)); # Prints true if stringified test1 doesn't have the same value as stringified test2
```
```javascript
true
```

<br>

```python
var test1 = {1, 2, 3, 4, 5}; # Declare and instantiate test2 as a list

var test2 = {5, 4, 3, 2, 1}; # Declare and instantiate test2 as a different list

print(str(test1) != str(test2)); # Prints true if stringified test1 doesn't have the same value as stringified test2
```
```javascript
true
```

<br>
Greater Than:
 
 ```python
var x = 60; # Declare and instantiate x to 60

var y = 50; # Declare and instantiate x to 50

print(x > y); # Prints true if x is greater than y
```
```javascript
true
```

<br>
Greater Than or Equal to:

 ```python
var x = 50; # Declare and instantiate x to 50

var y = 50; # Declare and instantiate x to 50

print(x >= y); # Prints true if x is greater than or equal to y
```
```javascript
true
```

<br>
Less Than:
 
 ```python
var x = 50; # Declare and instantiate x to 50

var y = 60; # Declare and instantiate x to 60

print(x < y); # Prints true if x is less than y
```
```javascript
true
```

<br>
Less Than or Equal to:

 ```python
var x = 50; # Declare and instantiate x to 50

var y = 50; # Declare and instantiate x to 50

print(x <= y); # Prints true if x is less than or equal to y
```
```javascript
true
```

<br>

### Arithmetic Operators
This is how one performs arithmetic with another value.

<br>
Basic Math Operators:

 ```python
print(5 + 5); # Prints the sum of 5 and 5

print(10 - 5); # Prints the difference of 10 and 5

print(7 * 3); # Prints the product of 7 and 3

print(1 / 2); # Prints the quotient of 1 and 2
```
```javascript
10
5
21
0.5
```

<br>
Modulus:

 ```python
print(12 % 5); # Prints the remainder of 12 / 5
```
```javascript
2
```

<br>
Unary Negation:

 ```python
var x = 5; # Declare and instantiate x to 5

print(-x); # Prints the numeric negation of x
```
```javascript
-5
```

<br>

### Logical Operators
This is how one compares a value to another.

<br>
AND:
 
 ```python
print(true && true); # Prints true if both values are true

print(true && false); # Prints true if both values are true

print(false && true); # Prints true if both values are true

print(false && false); # Prints true if both values are true
```
```javascript
true
false
false
false
```

<br>
OR:
 
 ```python
print(true || true); # Prints true if one or both values are true

print(true || false); # Prints true if one or both values are true

print(false || true); # Prints true if one or both values are true

print(false || false); # Prints true if one or both values are true
```
```javascript
true
true
true
false
```

<br>
Nullish Coalescing Operator:

```python
print(NULL ?? "Hello"); # Prints the string if the first value is a NULL datatype

print(false ?? "Hello"); # Prints the number if the first value is a NULL datatype

print(15 ?? "Fallback"); # Prints the string if the first value is not a NULL datatype

print(0 ?? 17); # Prints the number if the first value is not a NULL datatype
```
```javascript
"Hello"
false
15
0
```

<br>
NOT

```python
print(!false); # Prints true if the value is not false

print(!true); # Prints false if the value is not true

print(!!false); # Prints false if the value is not not false

print(!!true); # Prints true if the value is not not true
```
```javascript
true
false
false
true
```

<br>

### Lambda Expressions
A lambda expression is a compact anonymous alternative to a traditional function expression.

<br>
Syntaxes:

```
() -> passed expression

(param) -> passed expression

(param1, paramN) -> passed expression

() -> {
  statements
  passed expression
}

(param1, paramN) -> {
  statements
  passed expression
}

(() -> passed expression)()

(() -> {
  statements
  passed expression
})()
```

<br>
Examples:

```python
func test(a) { # Traditional Function Declaration
  pass a + 100;
}

var test2 = (a) -> { # Lambda with Body Version
  pass a + 100;
};

var test3 = (a) -> a + 100; # Lambda with Implicit Pass Version


# They all return the same value as they all do the same thing
print(test(8)); # Prints the function with a parameter

print(test2(8)); # Prints the function with a parameter

print(test3(8)); # Prints the function with a parameter


# Immediately Invoked Function Expression
(() -> print(8 + 100))(); # Immediately executes the function declaration, without storing the function
```
```javascript
108
108
108
108
```

<br>

### String Operator
This is how one combines other values with strings.

<br>
Adding two or more strings:

```python
print("Hello" + "World"); # Prints the concatenated string

print("Hello" + "World" + "!"); # Prints the concatenated string
```
```javascript
"HelloWorld"
"HelloWorld!"
```

<br>
Adding other datatypes to strings:

```python
print("Number: " + 1); # Prints the concatenated string

print("Number: " + (1 + 1)); # Prints the concatenated string

print("Numbers: " + {1, 2, 3}); # Prints the concatenated string

print("Null: " + NULL); # Prints the concatenated string
```
```javascript
"Number: 1"
"Number: 2"
"Numbers: [
  1,
  2,
  3
]"
"Null: null"
```

<br>

### Property Accessor
This is how one gets property values on objects and lists, using either dot notation (only objects) or bracket notation (both).

<br>
Dot Notation:

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  location: "Canada",
  online: true,
  followers: 420
};

print(developer.location); # Prints the location property
```
```javascript
"Canada"
```

<br>
Bracket Notation (Object):

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
Bracket Notation (List) uses indices starting from 0:

```python
var list =  {1, 2, 3, 4, 5};

print(list[2]); # Prints the third element
```
```javascript
3
```

<br>

### Optional Chaining
The optional chaining syntax ( ?. ) allows operations on existing objects and returns NULL if the object is null or undefined.
<br>
Basically, the operator will check the right-most property, and if its NULL, it goes left. If it all ends up NULL, then it returns NULL.

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

print(developer?.location); # Prints the location property
```
```javascript
"Canada"
```

<br>

```python
var developer =  { # Declare and instantiate an object with many properties
  firstName: "Gautam",
  lastName: "Batta",
  online: true,
  followers: 420
};

print(developer?.location); # Prints the whole object as the location property does not exist
```
```javascript
"Canada"
```

<br>

```python
var developer =  NULL;

print(developer?.location); # Prints NULL
```
```javascript
null
```

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
Example 1:

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
Example 2:

```python
var printNum = (number) -> print(number); # Defines a function that takes in one parameter, which prints said parameter

printNum(69); # Calls the function with a passed parameter
```
```javascript
69
```

<br>
Example 3:

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
Example 4:

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

## Built-In/Native Functions
SidGautamScript provides a lot of built-in native functions that assist with the writing of code. They are basically global constants and can not be overwritten.
<br>
These functions are built straight into the runtime environment and do not need to be imported to be used.

<br>

### dataType(\<arg\>)
The dataType() function is a built-in function that returns a string indicating the type of the arg's value. 
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

<br>

### int(\<obj\>)
The int() function is a built-in function that takes an object as input and returns its value parsed as an integer.
<br>
If the value can not be properly converted into an integer, then it will return 0.

<br>
Example 1:

```python
var string = "14";

print(int(string)); # Prints the value of string parsed as an integer
```
```javascript
14
```

<br>

```python
var string = "14.68665";

print(int(string)); # Prints the value of string parsed as an integer
```
```javascript
14
```

<br>
Example 2:

```python
var string = "Hello World";

print(int(string)); # Prints the value of string parsed as an integer
```
```javascript
0
```

<br>
Example 3:

```python
var obj = {
    name: "Gautam",
    age: 20
};

print(int(obj)); # Prints the value of obj parsed as an integer
```
```javascript
0
```

<br>

```python
var list = {1, 2, 3, 4, 5};

print(int(list)); # Prints the value of obj parsed as an integer
```
```javascript
0
```

<br>

### double(\<obj\>)
The double() function is a built-in function that takes an object as input and returns its value parsed as a double (floating point number).
<br>
If the value can not be properly converted into a double, then it will return 0.

<br>
Example 1:

```python
var string = "14";

print(double(string)); # Prints the value of string parsed as a double
```
```javascript
14
```

<br>

```python
var string = "14.68665";

print(double(string)); # Prints the value of string parsed as a double
```
```javascript
14.68665
```

<br>
Example 2:

```python
var string = "Hello World";

print(double(string)); # Prints the value of string parsed as a double
```
```javascript
0
```

<br>
Example 3:

```python
var obj = {
    name: "Gautam",
    age: 20
};

print(double(obj)); # Prints the value of string parsed as a double
```
```javascript
0
```

<br>

```python
var list = {1, 2, 3, 4, 5};

print(double(list)); # Prints the value of string parsed as a double
```
```javascript
0
```

<br>

### trim(\<obj\>)
The trim() function is a built-in function that takes an object as input, converts it to a string, then removes whitespace from both ends, and returns it as a new string.
<br>
It basically does the same thing as str() but also trims it at the end.

<br>
Example:

```python
var string = "  SPACED?  ";

print(string); # Prints the value of string

print(trim(string)); # Prints the value of string trimmed
```
```javascript
"  SPACED?  "
"SPACED?"
```

<br>

```python
var num = 21;

print(num); # Prints the value of num

print(trim(num)); # Prints the value of num as a trimmed string
```
```javascript
21
"21"
```

<br>

### print(\<...objs\>)
The print() function is a built-in function that prints the objects as a concatenated message to the console.

<br>
Example:

```python
print("Hello World"); # Prints the string literal

var list = {1, 2, "gfg"}; # Declare and instantiate a list

print(list); # Prints list
```
```javascript
"Hello World"
[
  1,
  2,
  "gfg"
]
```

<br>

```python
var name = "Gautam";
var age = 20;

print("Name:", name); # Prints name with a string literal

print("Age:", age); # Prints age with a string literal
```
```javascript
"Name:" "Gautam"
"Age:" 20
```

<br>

### errPrint(\<...objs\>)
The errPrint() function is a built-in function that prints the objects as a concatenated message to the console, in bolded red text.

<br>
Example:

```python
errPrint("Hello World"); # Prints the string literal, as an Error

var list = {1, 2, "gfg"}; # Declare and instantiate a list

errPrint(list); # Prints list, as an Error
```
```javascript
"Hello World"
[
  1,
  2,
  "gfg"
]
```
(I have no clue how to make it red in Markdown)

<br>

```python
var name = "Gautam";
var age = 20;

errPrint("Name:", name); # Prints name with a string literal, as an Error

errPrint("Age:", age); # Prints age with a string literal, as an Error
```
```javascript
"Name:" "Gautam"
"Age:" 20
```

<br.

### exit(\<errCode\>)
The exit() function is a built-in function that is used to terminate the currently running Runtime Environment and exit the program immediately.
<br>
The errorCode is optional, and is 0 by default.

<br>
Example:

```python
print("Hello World"); # Prints the string literal

exit(); # Exits the program

print("Test"); # The program will exit before this line, so this won't print
```
```javascript
"Hello World"
```

<br>

```python
var x = 5;

unless (x == 5) { # Checks if x is 5
  exit(); # Exits the program if x isn't 5
}

print("Test"); # Prints the string literal
```
```javascript
"Test"
```

<br>

### len(\<obj\>)
The len() function is a built-in function that is used to get the number of elements in a list, or the number of characters in a string. 
<br.
It returns an integer value representing the length or the number of elements.

<br>
Get String Length:

```python
var string = "Hello World"; 

print(len(string)); # Prints the length of the string (number of characters)
```
```javascript
11
```

<br>
Get List Length:

```python
var list = {1, 2, 3, 6, 7, 3, 9, 2}; 

print(len(list)); # Prints the length of the list (number of elements)
```
```javascript
8
```

<br>
If you try to get the length of anything other than a string or list. It throws an error:

```python
var num = 52; 

print(len(num)); # Try to print the length of num, but an error is thrown during execution
```
```javascript
Error: len() expects list or string, at line: 3 and column: 4
```

<br>

### isEmpty(\<obj\>)
The isEmpty() function is a built-in function that is used to check if there are any elements in a list, or if a string is empty. 
<br.
It returns a boolean value, indicating if obj is empty or not.

<br>
Check String:

```python
var string = "Hello World"; 

print(isEmpty(string)); # Prints true if the string is empty
```
```javascript
false
```

<br>

```python
var string = "  "; 

print(isEmpty(string)); # Prints true if the string is empty
```
```javascript
true
```

<br>
Check List:

```python
var list = {1, 2, 7, 4, 5}; 

print(isEmpty(list)); # Prints true if the list is empty
```
```javascript
false
```

<br>

```python
var list = {}; 

print(isEmpty(list)); # Prints true if the list is empty
```
```javascript
true
```

<br>
If you try to check if anything other than a string or list is empty. It throws an error:

```python
var num = 52; 

print(isEmpty(num)); # Try to check if num is empty, but an error is thrown during execution
```
```javascript
Error: isEmpty() expects list or string, at line: 3 and column: 4
```







