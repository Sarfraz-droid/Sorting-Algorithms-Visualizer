var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canH = canvas.height;
var canW = canvas.width;
var colH = canH;
var colColor = "rgb(57,37,240)";
var canColor = "#fff";
var preColor = "#f8e500";
var nexColor = "#f50018";
var indColor = "#f50018";
var sortdColor =  "#01f84d";
var pink = "#f801d1c";
var lightBlue = "#00e7ee";
var i;
var j;
var k;
var min  = 0;
var stop = false;
var swap = true;
var delay;
var nbrInput = document.getElementById("number");
var spdInput = document.getElementById("speed");
var genBtn = document.getElementById("gen-btn");
var stopBtn = document.getElementById("stop-btn");
var startBtn = document.getElementById("start-btn");
var resetBtn = document.getElementById("reset-btn");
var algoSlct = document.getElementById("algos");

reload();

/**************************************** Events  *************************************/
genBtn.onclick = function() { // Genetate new array
  reload();
}
stopBtn.onclick = function() { // Stop running
  stop = !stop;
}
startBtn.onclick = function() {
  var algoIndex = algoSlct.selectedIndex;
  switch (algoIndex) { // Run selected algorithm
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
      j = i + 1;
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
      console.log(array);
      mergeSort(array);
      console.log(array);
      break;
    default:
  }
  nbrInput.disabled = true;
  spdInput.disabled = true;
  genBtn.disabled = true;
  startBtn.disabled = true;
}
resetBtn.onclick = function() {
  reset();
}
spdInput.onchange = function() {
  delay = spdInput.value;
  document.getElementById("speed-txt").textContent = "("+spdInput.value + "ms)";
}
nbrInput.onchange = function() {
  document.getElementById("number-txt").textContent = "(" + nbrInput.value + ")";
  reload();
}
/**************************************** Handling functions  *************************************/
function reload() {
  delay = spdInput.value;
  colNbr = nbrInput.value;
  colW = canW/colNbr;

  var posX = 0;
  array = generateArray(colNbr, colH);
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for(var i = 0; i < colNbr; i++) { // Draw initial generated algorithm
    ctx.fillStyle = colColor;
    ctx.fillRect(posX, canH - array[i], colW - 1, array[i]);
    posX+=colW;
  }
}

function reset() {
  nbrInput.disabled = false;
  spdInput.disabled = false;
  genBtn.disabled = false;
  startBtn.disabled = false;
  resetBtn.disabled = false;
  spdInput.value = 100;
  nbrInput.value = 100;
  algoSlct.selectedIndex = 0;
  stop = true;
  reload();
}
/**************************************** Drawing functions  *************************************/
// Draw columns on canvas
function bubbleDraw(arr, index, sorted) {
    var posX = 0;
    ctx.fillStyle = canColor;
    ctx.fillRect(0, 0, canW, canH);
    for(var h = 0; h < colNbr; h++) {
      if(h == index) {
        ctx.fillStyle = indColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else if(h == index - 1) {
        ctx.fillStyle = preColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else if(h >= colNbr - sorted) {
          ctx.fillStyle = sortdColor;
          ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else {
        ctx.fillStyle = colColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
        posX+=colW;
    }
}
function selectionDraw(arr, index, min, sorted) {
    var posX = 0;
    ctx.fillStyle = canColor;
    ctx.fillRect(0, 0, canW, canH);
    for(var h = 0; h < colNbr; h++) {
      if(h == index) {
        ctx.fillStyle = indColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else if(h == min) {
        ctx.fillStyle = preColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else if(h < sorted) {
          ctx.fillStyle = sortdColor;
          ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
      else {
        ctx.fillStyle = colColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
      }
        posX+=colW;
    }
}
function insertionDraw(arr, index, sorted) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for(var h = 0; h < colNbr; h++) {
    if(h == index) {
      ctx.fillStyle = indColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    // else if(h == min) {
    //   ctx.fillStyle = preColor;
    //   ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    // }
    else if(h < sorted) {
        ctx.fillStyle = sortdColor;
        ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
    else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
      posX+=colW;
  }
}

function quickDraw(arr, start, end, pivot) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for(var h = 0; h < colNbr; h++) {
    if(h == pivot) {
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
    else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
      posX+=colW;
  }
}
function mergeDraw(arr, left, middle, right) {
  var posX = 0;
  ctx.fillStyle = canColor;
  ctx.fillRect(0, 0, canW, canH);
  for(var h = 0; h < colNbr; h++) {
    if(h == middle) {
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
    else {
      ctx.fillStyle = colColor;
      ctx.fillRect(posX, canH - arr[h], colW - 1, arr[h]);
    }
      posX+=colW;
  }
}
/**************************************** Sorting   *************************************/
// Bubble Sort
function bubbleSort()
{
  setInterval(
    function() {
      if(swap == true) {
        if(array[j - 1] > array[j]) {
             var temp = array[j - 1];
             array[j - 1] = array[j];
             array[j] = temp;
             swap = true;
               }
        bubbleDraw(array, j, i);
        if(!stop) {
          j++;
          if(j >= colNbr - i) {
            j = 0;
            i++;
          }
        }
      }
    }, delay);
}

// Selection Sort
function selectionSort()
{
  setInterval(
    function() {
      if(swap == true) {
          selectionDraw(array, j, min, i);
        if(array[j] < array[min]) {
            min = j;
        }
          j++;
          if(j >= colNbr) {
            if(min != i) {
              var temp = array[min];
              array[min] = array[i];
              array[i] = temp;
            }
            i++;
            j = i + 1;
          }
      }
    }, delay);
}

// Insertion Sort
function insertionSort() {
  setInterval(
    function() {
      // Loop
      if(i < colNbr) {
        if(j > 0 && array[j] < array[j - 1]) {
          var temp = array[j];
              array[j] = array[j - 1];
              array[j - 1] = temp;
          j--;
        }
        else {
          i++;
          j = i;
        }
      insertionDraw(array, j, i);
      }
    }, delay);
}

// Quick Sort
function quickSort(arr, start, end) {
  setInterval(function () {
    if(start < end) {
      var p = partition(arr, start, end); /* index of partition */
      //console.log("partition --> "+p);
      quickSort(arr, start, p - 1);
      quickSort(arr, p + 1, end);
      quickDraw(arr, start, end, 0);
    }
  }, delay);
}

function partition(arr, start, end) {
  var pivot = arr[end];
  var partitionIndex = start;
  // var i = start;
  // var interval = setInterval(function () {

     for(i = start; i < end; i++){
       if(arr[i] <= pivot) {
         var temp1 = arr[i];
         arr[i] = arr[partitionIndex];
         arr[partitionIndex] = temp1;
         partitionIndex = partitionIndex + 1;
       }

      quickDraw(arr, start, end, start);
     }

     var temp2 = arr[end];
     arr[end] = arr[partitionIndex];
     arr[partitionIndex] = temp2;



  // }, delay);


  return partitionIndex;
}

function mergeSort(arr) {

  console.log("length---"+arr.lenght);
  var n = arr.length;
  if(n < 2) return ;
  else {

  middle = Math.ceil(n/2);
  var left = new Array(middle);
  var right = new Array(n - middle);
  for(i = 0; i < middle - 1; i++) left[i] = arr[i];
  for(i = middle; i < n - 1; i++) right[i - middle] = arr[i];

  mergeSort(left);
  mergeSort(right);
  merge(left, right, arr);
}

}
function merge(left, right, arr) {
  // mergeDraw(arr, left, middle, right);
  var nLeft = left.length;
  var nRight = right.length;

  // console.log("left-->\n" + left);
  // console.log("right-->\n" + right);
  i = 0; j = 0; k = 0;
  while(i < nLeft && j < nRight) {
    if(left[i] < right[j]) {
      arr[k] = left[i];
      i++
    }
    else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while(i < nLeft) {
    arr[k] = left[i];
    i++;
    k++;
  }

  while(j < nRight) {
    arr[k] = right[j];
    j++;
    k++;
  }

  mergeDraw(arr, left, middle, right);
}
/**************************************** Random Genrating functions  *************************************/
// Generate random array of N element with with max value H
function generateArray(N, H) {
  var array= new Array(N);
  for(var i = 0; i < N; i++){
  array[i] = getRandomInt(10, H);
  }
return array;
}

// Generate random number within range(min max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
