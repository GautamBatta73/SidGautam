# SidGautamScript StringUtils Library

## Methods
### upper(string)
This function returns the string converted to uppercase letters.

```python
import "StringUtils";

print(upper("test")); # Prints the string in uppercase
```
```javascript
"TEST"
```

<br>

### lower(string)
This function returns the string converted to lowercase letters.

```python
import "StringUtils";

print(lower("TEST")); # Prints the string in lowercase
```
```javascript
"test"
```

<br>

### String.Prototype.split(sep)
This method of String instances creates and returns a list by separating the string by spaces, or a specified separator string.

<br>
If no parameter is given, it returns the list split by " ".

```python
import "StringUtils";

var string = "Hello World";
var list = string.split();

print(list); # Prints the string as a list, separated by " "
```
```javascript
[
  "Hello",
  "World"
]
```

<br>
If a separator parameter is given, it returns a list by separating the string by it.

```python
import "StringUtils";

var string = "Hello,World";
var list = string.split(",");

print(list); # Prints the string as a list, separated by ","
```
```javascript
[
  "Hello",
  "World"
]
```

<br>
If you want to make a list of the characters in the string, separate the string by "".

```python
import "StringUtils";

var string = "Hello";
var list = string.split("");

print(list); # Prints the string's character as a list
```
```javascript
[
  "H",
  "e",
  "l",
  "l",
  "o"
]
```

<br>
