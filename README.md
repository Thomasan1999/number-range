# NumericRange

NumericRange is a library supporting numeric ranges between two real numbers called bounds. The upper bound is the maximal value of the range, the lower bound is the minimal value. The
 object itself is not an array of numbers contained in
 the range but instead is an
 abstract representation of the range by containing bounds which allows us to add several helper methods and to save memory in the case the range is too large. The object contains
  a method enumerate() which returns an array of numbers instead similar to range function in other languages.
  
## Installation
`npm i numeric-range`

## API
### min: number
The lower bound of the range. It represents the minimal value of the range. The value itself is included in the range.
### max: number
The upper bound of the range. It represents the maximal value of the range. The value itself is included in the range.

### constructor(min: number, max: number)
The new keyword, lower and upper bound are required in the constructor, if one of the bounds is missing an error will be thrown. It is preferred to use the number type, the
 library uses the Number function to parse non-numerical values, so strings like `'5.5'` or bigints will work properly but using non-numerical types might lead to unexpected
  behavior and side-effect. Use them at your own risk.
```js
new NumericRange(5, 10)
```
 
### enumerate(step: number = 1): number[]
The method returns an array of contained numbers inside the range including the bounds, step indicates the difference of two adjacent numbers of the returned array, defaults to 1.
```js
new NumericRange(5, 10).enumerate()
[5, 6, 7, 8, 9, 10]
```
The step might be any positive number, if the number is decimal, the numbers will be rounded using the toFixed(the number of digits of the step) method to avoid numbers like 0.30000000000000004. 
```js
new NumericRange(0, 1).enumerate(.1)
[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
new NumericRange(5, 10).enumerate(.5)
[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
```
The step might be any positive number, if the current value + step is greater than the upper bound, the next value is omitted, regardless of whether the current value is equal
 or lower to the upper bound. The upper bound is not included either.
 ```js
new NumericRange(5, 10).enumerate(.7)
[5, 5.7, 6.4, 7.1, 7.8, 8.5, 9.2, 9.9] //10 and 10.6 are not included
 ```

### includes(searchNumber: number): boolean
This method determines whether the search number is contained in the range. The search number might be equal to either bound.
```js
new NumericRange(5, 10).includes(7.5)
true
new NumericRange(5, 10).includes(5)
true
new NumericRange(5, 10).includes(3.5)
false
```

### incorporate(numberToIncorporate: number): number
This method incorporates the number given in the argument to the range. It means if the number is greater than the upper bound, the method returns the upper bound. If the number
 is lower, lower bound is returned. Otherwise, the given number is returned.
```js
new NumericRange(5, 10).incorporate(12)
10
new NumericRange(5, 10).incorporate(3.5)
5
new NumericRange(5, 10).incorporate(7)
7
new NumericRange(5, 10).incorporate(10)
10
```

## License
NumericRange is licensed under an [MIT License](https://opensource.org/licenses/MIT).
