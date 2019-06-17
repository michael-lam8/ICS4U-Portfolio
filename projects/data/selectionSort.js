// Declaring variables
var incr = 0;

// Displays array and swapping procedure
var displayArray = function(array, index, swappedNum) {
  fill(0);
  text(array + ": " + index + " ↔ " + swappedNum,
    10, 15 + incr);
  incr += 22;
};

// Swaps between two indexes of passed array
var swap = function(array, firstIndex, secondIndex) {
  displayArray(array, array[secondIndex], array[firstIndex]);
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

// Returns the original array index of the smallest value of subarray
var indexOfMinimum = function(array, startIndex) {
  var minValue = array[startIndex];
  var minIndex = startIndex;

  for (var i = minIndex + 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minIndex = i;
      minValue = array[i];
    }
  }
  return minIndex;
};

// Swaps index position value and the next smallest value
var selectionSort = function(array) {
  var temp = 0;
  for (var i = 0; i < array.length; i++) {
    temp = indexOfMinimum(array, i);
    swap(array, temp, i);
  }
};

function setup() {
  createCanvas(400, 400);
  // Running selection sort on array
  selectionSort([2, 1]); // Default array
  selectionSort([100, 99, 98, 97, 96]); // Reverse sorted
  selectionSort([10, 11, 11, 12, 11, 13]); // Multiples of same values
  selectionSort([0, 1, 3, 2, 4]); // One value out of order
}
