const promise1 = new Promise((resolve, reject) => {
 setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
 setTimeout(resolve, 100, 'two');
});

Promise.myRace = function (promises) {
 return new Promise((resolve, reject) => promises.forEach(promise => Promise.resolve(promise).then(resolve, reject)))
}

Promise.myRace([promise1, promise2]).then((value) => {
 console.log(value);
 // Both resolve, but promise2 is faster
});



var p1 = new Promise(function (resolve, reject) {
 setTimeout(() => resolve('one'), 500);
});
var p2 = new Promise(function (resolve, reject) {
 setTimeout(() => resolve('TWO'), 100);
});

Promise.myRace([p1, p2])
 .then(function (value) {
  console.log(value); // "two"
  // Both fulfill, but p2 is faster
 });

var p3 = new Promise(function (resolve, reject) {
 setTimeout(() => resolve('three'), 100);
});
var p4 = new Promise(function (resolve, reject) {
 setTimeout(() => reject(new Error('four')), 500);
});

Promise.myRace([p3, p4])
 .then(function (value) {
  console.log(value); // "three"
  // p3 is faster, so it fulfills
 }, function (error) {
  // Not called
 });

var p5 = new Promise(function (resolve, reject) {
 setTimeout(() => resolve('five'), 500);
});
var p6 = new Promise(function (resolve, reject) {
 setTimeout(() => reject(new Error('six')), 100);
});

Promise.myRace([p5, p6, "100"])
 .then(function (value) {
  // Not called
 }, function (error) {
  console.log(error.message); // "six"
  // p6 is faster, so it rejects
 });
