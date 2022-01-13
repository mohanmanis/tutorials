/* 

Promise.any() takes an iterable of Promise objects. It returns a single promise that resolves as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

*/

/* 
Syntax  -->> Promise.any(iterable);

Parameters --->> iterable, An iterable object, such as an Array.

Return value

1. An already rejected Promise if the iterable passed is empty.

2. An asynchronously resolved Promise if the iterable passed contains no promises.

3. A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when any of the  promises in the given iterable resolve, or if all the promises have rejected.

*/

Promise.myAny = function (promises) {
 const error = new AggregateError([new Error("some error")], "All promises were rejected")
 let rejectedCount = 0;
 return new Promise((resolve, reject) => {
  if (promises.length === 0) reject(error);
  promises.forEach(promise => {
   Promise.resolve(promise).then(value => {
    resolve(value);
   }).catch(err => {
    rejectedCount++;
    if (rejectedCount === promises.length) {
     reject(error)
    }
   })
  })
 })
}


const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3, 123];

Promise.myAny(promises).then((value) => console.log(value)).catch(err => console.log(err));

const promise4 = new Promise((resolve, reject) => {
 setTimeout(resolve, 500, 'one');
});

const promise5 = new Promise((resolve, reject) => {
 setTimeout(reject, 100, 'two');
});

Promise.myAny([promise4, promise5]).then((value) => {
 // Only promise4 is fulfilled, even though promise5 settled sooner
 console.log('succeeded with value:', value);
}).catch((reason) => {
 console.log('failed with reason:', reason);
});
