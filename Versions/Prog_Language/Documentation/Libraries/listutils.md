# SidGautamScript ListUtils Library

## Methods
### List.Prototype.forEach(fn)
This method of List instances executes a provided function once for each list element.

```python
import "ListUtils";

var list = {1, 2, 3};
list.forEach(print); # Prints every element on a seperate line

list.forEach((el) -> print(el)); # Does same but easier to visualize
```
```javascript
1
2
3
```

<br>

### List.Prototype.has(val)
This method of List instances returns an object, which has a boolean that indicates whether a value exists in the list and a list containing the indices of the values.

```python
import "ListUtils";

var list = {1, 2, 3, 1, 2, 3};
var valToFind = 2;

var found = list.has(valToFind); # Returns the object that indicates the existence of the value in the list, and the indices

print(found); # Prints the object
```
```javascript
{
  found: true,
  index: [
    1,
    4
  ]
}
```

<br>
This is what happens when it can't find the value.

```python
import "ListUtils";

var list = {1, 2, 3, 1, 2, 3};
var valToFind = 4;

var found = list.has(valToFind); # Returns the object that indicates the existence of the value in the list, and the indices

print(found); # Prints the object
```
```javascript
{
  found: false,
  index: []
}
```

<br>

### List.Prototype.join(sep)
This method of List instances creates and returns a string by concatenating all of the elements in the list, separated by commas and a space, or a specified separator string.

<br>
If the array has only one item, then that item will be returned without using the separator.

```python
import "ListUtils";

var list = {1};
print(list.join()); # Prints the list as a single value string
```
```javascript
"1"
```

<br>
If no parameter is given, it returns the concatenated list separated by ", ".

```python
import "ListUtils";

var list = {1, 2, 3};
print(list.join()); # Prints the list as a string, concatenated by ", "
```
```javascript
"1, 2, 3"
```

<br>
If a separator parameter is given, it returns the concatenated list separated by it.

```python
import "ListUtils";

var list = {1, 2, 3};
print(list.join("\n")); # Prints the list as a string separated by a new line
```
```javascript
"1"
"2"
"3"
```

<br>
