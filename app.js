var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canH = canvas.height;
var canW = canvas.width;
var colH = canH - 30;
var i, j, k;
var array = [];



/**************************************** Events  *************************************/
var popup = document.getElementsByClassName("popup")[0];
var descBtn = document.getElementById("desc-btn");
descBtn.onclick = function () {
  popup.style.display = "block";
  console.log("0"+document.getElementById("algos").selectedIndex);
  document.getElementsByClassName("desc")[0].textContent = getDescription(document.getElementById("algos").selectedIndex);
};
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function () {
  popup.style.display = "none";
};
var genBtn = document.getElementById("gen-btn");
genBtn.onclick = function () {
  // Genetate new array
  reload();
};
var stop = false;
var stopBtn = document.getElementById("stop-btn");
stopBtn.onclick = function () {
  // Stop running
  stop = !stop;
};
var startBtn = document.getElementById("start-btn");
startBtn.onclick = function () {
  var algoIndex = document.getElementById("algos").selectedIndex;
  switch (
    algoIndex // Run selected algorithm
  ) {
    case 0:
      i = 0;
      j = 1;
      bubbleSort();
      break;
    case 1:
      i = 1;
      j = i;
      insertionSort();
      break;
    case 2:
      i = 0;
      j = 1;
      selectionSort();
      break;
    case 3:
      i = 0;
      quickSort(array, 0, colNbr - 1);
      break;
    case 4:
      i = 0;
      j = 0;
      k = 0;
      var sortedArray = mergeSort(array);
      mergeDraw(sortedArray, true);
      break;
    default:
  }
  nbrInput.disabled = true;
  genBtn.disabled = true;
  startBtn.disabled = true;
};
var resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = function () {
  reset();
};

var delay;
var spdInput = document.getElementById("speed");
spdInput.onchange = function () {
  delay = spdInput.value;
  document.getElementById("speed-txt").textContent =
    "(" + spdInput.value + "ms)";
};
var nbrInput = document.getElementById("number");
nbrInput.onchange = function () {
  document.getElementById("number-txt").textContent =
    "(" + nbrInput.value + ")";
  reload();
};
/**************************************** Handling functions  *************************************/
function reload() {
  delay = spdInput.value;
  colNbr = nbrInput.value;
  colW = canW / colNbr;
  var posX = 0;
  array = generateArray(colNbr, colH);
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var i = 0; i < colNbr; i++) {
    // Draw initial generated algorithm
    ctx.fillStyle = colColor;
    ctx.fillRect(posX, canH - array[i], colW - 1, array[i]);
    if (colNbr <= 50) {
      ctx.fillStyle = "#FF9800";
      ctx.font =
        " small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(array[i], posX, canH - array[i] - 2, 1000);
    }
    posX += colW;
  }
  stop = false;
}

function reset() {
  nbrInput.disabled = false;
  genBtn.disabled = false;
  startBtn.disabled = false;
  resetBtn.disabled = false;
  spdInput.value = 100;
  nbrInput.value = 100;
  document.getElementById("algos").selectedIndex = 0;
  stop = true;
  reload();
}
/**************************************** Sorting & drawings   *************************************/
var colColor = "#3925f0";
var canColor = "#fff";
var preColor = "#f8e500";
var nexColor = "#f50018";
var indColor = "#f50018";
var sortdColor = "#01f84d";
var topColor = "#ffa933";
var sorted = false;
var bubbleSort = function () {
  delay = spdInput.value;
  setTimeout(()=>{
    if (!sorted) {
      if (array[j - 1] > array[j]) {
        var temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
      }
      if (!stop) {
        // pause the animation
        j++;
        if (j >= colNbr - i) {
          j = 0;
          i++;
        }
      }
      bubbleDraw(array, j, i);
      if (i == colNbr) {
        sorted == true;
        cancelAnimationFrame(bubbleSort);
      } else requestAnimationFrame(bubbleSort);
    }
  }, delay);
};

function bubbleDraw(arr, index, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var h = 0; h < colNbr; h++) {
    if (h == index && sorted != colNbr) {
      ctx.fillStyle = indColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else if (h == index - 1 && sorted != colNbr - 1) {
      ctx.fillStyle = preColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else if (h >= colNbr - sorted) {
      ctx.fillStyle = sortdColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    if (colNbr <= 50) {
      ctx.fillStyle = topColor;
      ctx.font =
        " small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(array[h], posX, canH - array[h] - 2, 1000);
    }
    posX += colW;
  }
}

var min = 0;
var selectionSort = function () {
  delay = spdInput.value;
  setTimeout(()=>{
    if (!sorted) {
      if (array[j] < array[min]) min = j;
      if (j < colNbr && !stop) j++;
      if (j == colNbr) {
        if (min != i) {
          var temp = array[i];
          array[i] = array[min];
          array[min] = temp;
        }
        i++;
        min = i;
        if (i == colNbr) {
          sorted = true;
          cancelAnimationFrame(selectionSort);
        } else if (i < colNbr) j = i + 1;
      }
      selectionDraw(array, j, min, i);
      requestAnimationFrame(selectionSort);
    }
  }, delay);
};

function selectionDraw(arr, index, min, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var h = 0; h < colNbr; h++) {
    if (h == index && sorted != colNbr - 1) {
      ctx.fillStyle = indColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else if (h == min && sorted != colNbr - 1) {
      ctx.fillStyle = preColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else if (h < sorted) {
      ctx.fillStyle = sortdColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    if (colNbr <= 50) {
      ctx.fillStyle = topColor;
      ctx.font =
        " small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(array[h], posX, canH - array[h] - 2, 1000);
    }
    posX += colW;
  }
}

var insertionSort = function () {
  delay = spdInput.value;
  setTimeout(()=> {
    if (!sorted) {
      if (i < colNbr && !stop) {
        if (j > 0 && array[j] < array[j - 1]) {
          var temp = array[j];
          array[j] = array[j - 1];
          array[j - 1] = temp;
          j--;
        } else {
          i++;
          if (i == colNbr) {
            sorted = true;
            cancelAnimationFrame(insertionSort);
          }
          j = i;
        }
        insertionDraw(array, j, i);
      }
      requestAnimationFrame(insertionSort);
    }
  }, delay);
};

function insertionDraw(arr, index, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var h = 0; h < colNbr; h++) {
    if (h == index) {
      ctx.fillStyle = indColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    // else if(h == min) {
    //   ctx.fillStyle = preColor;
    //   ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    else if (h < sorted) {
      ctx.fillStyle = sortdColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    if (colNbr <= 50) {
      ctx.fillStyle = topColor;
      ctx.font =
        " small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(array[h], posX, canH - array[h] - 2, 1000);
    }
    posX += colW;
  }
}

var quickSort = function (arr, start, end) {
  delay = spdInput.value;
  setTimeout(()=> {
    if (start < end) {
      var pivot = arr[end];
      var partitionIndex = start;
      // var i = start;
      // var interval = setInterval(function () {
      for (i = start; i < end; i++) {
        if (arr[i] <= pivot) {
          var temp1 = arr[i];
          arr[i] = arr[partitionIndex];
          arr[partitionIndex] = temp1;
          partitionIndex = partitionIndex + 1;
        }
        //quickDraw(arr, start, end, start);
      }
      var temp2 = arr[end];
      arr[end] = arr[partitionIndex];
      arr[partitionIndex] = temp2;

      p = partitionIndex;
      //console.log("partition --> "+p);
      quickSort(arr, start, p - 1);
      quickSort(arr, p + 1, end);
      quickDraw(arr, start, end, 0, true);
    }
    requestAnimationFrame(quickSort);
  }, delay);
};

function quickDraw(arr, start, end, pivot, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var h = 0; h < colNbr; h++) {
    if (h == pivot) {
      ctx.fillStyle = indColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    // else if(h == min) {
    //   ctx.fillStyle = preColor;
    //   ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    // else if(h < sorted) {
    //     ctx.fillStyle = sortdColor;
    //     ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }

    if (sorted) {
      ctx.fillStyle = sortdColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    if (colNbr <= 50) {
      ctx.fillStyle = topColor;
      ctx.font =
        " small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(array[h], posX, canH - array[h] - 2, 1000);
    }
    posX += colW;
  }
}

var mergeSort = function (arr) {
  delay = spdInput.value;
  var n = arr.length;
  setTimeout(() => {
    if (n < 2) return arr;
    else {
      middle = Math.floor(n / 2);
      var left = [];
      var right = [];
      for (i = 0; i <= middle - 1; i++) left[i] = arr[i]; // or left = arr.slice(0, middle);
      for (i = middle; i <= n - 1; i++) right[i - middle] = arr[i]; // or right = arr.slice(middle, n);

      left = mergeSort(left);
      right = mergeSort(right);

      var nLeft = left.length;
      var nRight = right.length;

      var sorted = [];
      i = 0;
      j = 0;
      k = 0;

      while (i < nLeft && j < nRight) {
        if (left[i] < right[j]) {
          sorted[k] = left[i];
          i++;
        } else {
          sorted[k] = right[j];
          j++;
        }
        k++;
      }
      // Only one of those while loop will be executed
      while (i < nLeft) {
        sorted[k] = left[i];
        i++;
        k++;
      }
      while (j < nRight) {
        sorted[k] = right[j];
        j++;
        k++;
      }
      console.log(sorted);
      return sorted;
    }
    }, delay);
};

function mergeDraw(arr, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for (var h = 0; h < colNbr; h++) {
    // if(h == middle) {
    //   ctx.fillStyle = indColor;
    //   ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    // else if(h == min) {
    //   ctx.fillStyle = preColor;
    //   ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    // else if(h < sorted) {
    //     ctx.fillStyle = sortdColor;
    //     ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    if (sorted) {
      ctx.fillStyle = sortdColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    } else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    if (colNbr <= 50) {
      ctx.fillStyle = "#FF9800";
      ctx.font =
        "small-caps bold " +
        Math.ceil(colW / 2) +
        "px Helvetica, Arial, sans-serif";
      ctx.fillText(arr[h], posX, canH - arr[h] - 2, 1000);
    }
    posX += colW;
  }
}

/**************************************** Random Genrating functions  *************************************/
// Generate random array of N element with with max value H
function generateArray(N, H) {
  var array = new Array(N);
  for (var i = 0; i < N; i++) {
    array[i] = getRandomInt(10, H);
  }
  return array;
}

// Generate random number within range(min max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

reload();

/**************************************** Algorithms Description  *************************************/

var desc_1 = "Bubble sort is a simple sorting algorithm. The algorithm starts at the beginning of the data set." +
 "It compares the first two elements, and if the first is greater than the second, it swaps them. It continues doing" +
 " this for each pair of adjacent elements to the end of the data set. It then starts again with the first two elements, " +
 "repeating until no swaps have occurred on the last pass.[33] This algorithm's average time and worst-case performance is O(n2),"+
 " so it is rarely used to sort large, unordered data sets. Bubble sort can be used to sort a small number of items (where its asymptotic "+
 " inefficiency is not a high penalty). Bubble sort can also be used efficiently on a list of any length that is nearly sorted (that is, the "+
 "elements are not significantly out of place). For example, if any number of elements are out of place by only one position (e.g. 0123546789 "+
 "and 1032547698), bubble sort's exchange will get them in order on the first pass, the second pass will find all elements in order, so the sort will take only 2n time.";

var desc_2 = "Insertion sort is a simple sorting algorithm that is relatively efficient for small lists and mostly sorted lists,"+
" and is often used as part of more sophisticated algorithms. It works by taking elements from the list one by one and inserting "+
"them in their correct position into a new sorted list similar to how we put money in our wallet.[22] In arrays, the new list and"+
" the remaining elements can share the array's space, but insertion is expensive, requiring shifting all following elements over by one."+
" Shellsort (see below) is a variant of insertion sort that is more efficient for larger lists.";

var desc_3 = "Selection sort is an in-place comparison sort. It has O(n2) complexity, making it inefficient on large lists,"+
" and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity, and also has performance"+
" advantages over more complicated algorithms in certain situations. The algorithm finds the minimum value, swaps it with the value in "+
"the first position, and repeats these steps for the remainder of the list.[23] It does no more than n swaps, and thus is useful where swapping is very expensive.";

var desc_4 = "Quicksort is a divide and conquer algorithm which relies on a partition operation: to partition an array, an element" +
" called a pivot is selected.[30][31] All elements smaller than the pivot are moved before it and all greater elements are moved after "+
"it. This can be done efficiently in linear time and in-place. The lesser and greater sublists are then recursively sorted. This yields "+
"average time complexity of O(n log n), with low overhead, and thus this is a popular algorithm. Efficient implementations of quicksort "+
"(with in-place partitioning) are typically unstable sorts and somewhat complex, but are among the fastest sorting algorithms in practice. "+
"Together with its modest O(log n) space usage, quicksort is one of the most popular sorting algorithms and is available in many standard "+
"programming libraries.<br/> "+
"The important caveat about quicksort is that its worst-case performance is O(n2); while this is rare, in naive implementations (choosing the "+
"first or last element as pivot) this occurs for sorted data, which is a common case. The most complex issue in quicksort is thus choosing "+
"a good pivot element, as consistently poor choices of pivots can result in drastically slower O(n2) performance, but good choice of pivots "+
"yields O(n log n) performance, which is asymptotically optimal. For example, if at each step the median is chosen as the pivot then the "+
"algorithm works in O(n log n). Finding the median, such as by the median of medians selection algorithm is however an O(n) operation on "+
"unsorted lists and therefore exacts significant overhead with sorting. In practice choosing a random pivot almost certainly yields O(n log n) performance."

var desc_5 = "Merge sort takes advantage of the ease of merging already sorted lists into a new sorted list. It starts by"+
" comparing every two elements (i.e., 1 with 2, then 3 with 4...) and swapping them if the first should come after the second."+
" It then merges each of the resulting lists of two into lists of four, then merges those lists of four, and so on; until at "+
"last two lists are merged into the final sorted list.[24] Of the algorithms described here, this is the first that scales well"+
" to very large lists, because its worst-case running time is O(n log n). It is also easily applied to lists, not only arrays, "+
"as it only requires sequential access, not random access. However, it has additional O(n) space complexity, and involves a large"+
" number of copies in simple implementations.";


function getDescription(index) {
  switch (index) {
    case 0:
      return desc_1;
      break;
    case 1:
      return desc_2;
      break;
    case 2:
      return desc_3;
      break;
    case 3:
      return desc_4;
      break;
    case 4:
      return desc_5;
      break;
    default:
      return desc_1;
  }

}
