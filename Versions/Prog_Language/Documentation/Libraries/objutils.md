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
