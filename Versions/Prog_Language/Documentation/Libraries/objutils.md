# SidGautamScript ObjectUtils Library

## Methods
### Object.Prototype.Values()
This method of Object instances returns a list of lists. Each list element contains the key and value.

```python
import "ObjectUtils";

var obj = {
  name: "Gautam",
  age: 21
};

var objVal = obj.Values();
print(objVal); # Prints the list of lists, that contain the keys and values of the object.
```
```javascript
[
  [
    "name",
    "Gautam"
  ],
  [
    "age",
    21
  ]
]
```

<br>

### Object.Prototype.has(val)
This method of Object instances returns a list, which has the key-value pair with the search value.

```python
import "ObjectUtils";

var obj = {
        name: "Gautam",
        age: 21,
        greeting: "Yo, what's up?",
        birthday: "04/04/05"
};

var valToFind = 21;

var found = obj.has(valToFind); # Returns the list of key-value pairs that have the search value

print(found); # Prints the object
```
```javascript
[
  {
    "age": 21
  }
]
```

<br>

### Object.clone(obj)
This function creates and returns a deep clone of the parameter obj. Any changes to the original or clone object will not affect the other.

<br>
Example:

```python
import "ObjectUtils";

var obj = {a: 1, b: 2, c: 3};
var clone = Object.clone(obj);

print("Original Object: " + obj); # Prints the original object
print("Cloned Object: " + clone); # Prints the cloned object

clone.b = 10; # Modify the cloned object
print("\nAfter modification:\n");

print("Original Object: " + obj); # Prints the original object
print("Cloned Object: " + clone); # Prints the cloned object
```
```javascript
"Original Object:" {
  "a": 1,
  "b": 2,
  "c": 3
}
"Cloned Object:" {
  "a": 1,
  "b": 2,
  "c": 3
}

"After modification:"

"Original Object:" {
  "a": 1,
  "b": 2,
  "c": 3
}
"Cloned Object:" {
  "a": 1,
  "b": 10,
  "c": 3
}
```

<br>

### Object.new()
This function creates and returns a new empty object instance.
<br>
Because both lists and objects use curly braces ( { } ), the only distinction is made at compile time when an object has a key-value.
<br>
Because an empty object ( { } ) has the same syntax as a list, and has no key-value pairs, it is treated as a list. 
<br>
This function will return an actual empty list.

<br>
Example:

```python
import "ObjectUtils";

var test = {};
var test2 = Object.new();

print(dataType(test)); # Prints the datatype of test (which is actually an empty list)
print(dataType(test2)); # Prints the datatype of test2 (which is an object)

test["key"] = "value"; # Tries to add a key-value pair to the list
test2["key"] = "value"; # Adds a key-value pair to the object

print(test); # Prints test
print(test2); # Prints test2
```
```javascript
"List"
"Object"
[]
{
  "key": "value"
}
```

<br>

### Object.parse(string)
This method parses a string into an object. If the string is not in a valid format, it will throw an error. This can be used to convert a stringified object into an actual object that can be manipulated in code.

<br>
Examples:

```python
import "ObjectUtils";

var obj = {a: 1, b: 2}; # Creates an object with two key-value pairs

var stringedObj = str(obj); # Converts the object to a string

print(dataType(stringedObj));
print(stringedObj); # Prints the string representation of the object

var parsedObj = Object.parse(stringedObj); # Parses the string back into an object

print("\n", dataType(parsedObj));
print(parsedObj); # Prints the object
```
```javascript
"String"
{
  "a": 1,
  "b": 2
}

" Object"
{
  "a": 1,
  "b": 2
}
```

<br>

```python
import "ObjectUtils";

var obj = '\{"a": 1, "b": 2\}'; # Declare and instantiate stringified object

print(dataType(obj));
print(obj); # Prints the string

var parsedObj = Object.parse(obj); # Parses the string back into an object

print("\n", dataType(parsedObj));
print(parsedObj); # Prints the object
```
```javascript
"String"
'{"a": 1, "b": 2}'

" Object"
{
  "a": 1,
  "b": 2
}
```

<br>
