function mergeSort(array) {
  if (array.length === 1) {
    return array
  } else {
    var split = Math.floor(array.length/2)
    var left = array.slice(0, split)
    var right = array.slice(split)

    left = mergeSort(left)
    right = mergeSort(right)

    var sorted = []
    while (left.length > 0 || right.length > 0) {
      if (right.length === 0 || left[0] <= right[0]) {
        sorted.push(left.shift())
      } else {
        sorted.push(right.shift())
      }
    }

    return sorted
  }
}

function quickSort(arr) {
	if (arr.length < 2) return arr; // last case. 1 element left

	// find center and use it as pivot
	var pivot = arr[Math.trunc(arr.length / 2)],
		left = [],
		right = [],
		middle = [];

	// segregate elements as left, middle and right
	arr.forEach(function (x) {
		if (x < pivot) {
			left.push(x);
		} else if (x === pivot) {
			middle.push(x);
		} else {
			right.push(x);
		}
	});

	left = quickSort(left); // quick sort the left sub array
	right = quickSort(right); // quick sort the right sub array

	return left.concat(middle).concat(right); // concat left + middle + right
}
// ### Tests:
var arr = [1000,12,124,12,45,578,11,3,6,9,100,50,9,12,1,34];

console.log(arr);
arr = mergeSort(arr);
console.log(arr);

// console.log(mergeSort([3,6,9,2]))
// console.log(mergeSort([1000,12,124,12,45,578,11,3,6,9,100,50,9,12,1,34]))
// console.log(mergeSort([3,6,9,11,123,111]))
