
Promise.myAllSettled = function (promises) {
 let mappedPromises = promises.map((promise) => {
  return Promise.resolve(promise)
   .then(value => ({ status: 'fulfilled', value }))
   .catch(reason => ({ status: 'rejected', reason }))
 })
 return Promise.all(mappedPromises)
}

Promise.myAllSettled([
 Promise.resolve(33),
 new Promise(resolve => setTimeout(() => resolve(66), 0)),
 99,
 Promise.reject(new Error('an error'))
])
 .then(values => console.log(values));

 // [
//   {status: "fulfilled", value: 33},
//   {status: "fulfilled", value: 66},
//   {status: "fulfilled", value: 99},
//   {status: "rejected",  reason: Error: an error}
// ]