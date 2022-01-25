/* 
1. Multiple callbacks
2. Promise chaining
3. Traps of Promises

*/
const promise = new Promise((resolve) => setTimeout(() => resolve('hello world'), 2000));

promise.then(data => console.log(data + ' 1'));
promise.then(data => console.log(data + ' 2'));
promise.then(data => console.log(data + ' 3'));

const promise = new Promise((_, reject) => setTimeout(() => reject('We are going to reject this'), 2000));

promise.then(data => console.log(data), data => console.error(data));

/* 
 a job function --> returns an object of promise, it gets resolved after 2 seconds with the value "hello world"

*/

const job = ()=> new Promise((resolve, reject)=>setTimeout(()=> resolve("hello world"), 2000));

job().then(data => console.log(data));


const job = (p)=> {
  return new Promise((resolve, reject)=>{
    if (typeof p !== "number") reject("error");
    else if (p % 2 === 0) setTimeout(reject, 2000, "even");
    else if (p % 2 !== 0) setTimeout(resolve, 1000, "odd");
  })
}


job("manish").then(data => console.log(data)).catch(err => console.log(err))
job(10).then(data => console.log(data)).catch(err => console.log(err))
job(11).then(data => console.log(data)).catch(err => console.log(err))


const job1 = () => new Promise((resolve) => setTimeout(() => resolve('result of job 1'), 1000));

const job2 = () => new Promise((resolve) => setTimeout(() => resolve('result of job 2'), 1000));

const promise = job1();


promise
 .then(data1 => {
  console.log('data1', data1);
  return job2();
 })
 .then(data2 => {
  console.log('data2', data2);
  return 'Hello world';
 })
 .then(data3 => {
  console.log('data3', data3);
 })

 //the broken chain

const job = () => new Promise((resolve, reject) => setTimeout(() => resolve("hello world"), 2000));


const test = () => {
 const promise = job();

 promise.then(data => {
  doSomething(data);
 });

 return promise;
}

const test = () => {
    return job().then(data => {
    doSomething(data);
});
}


//pyramid of doom


function test() {
 return job().then(() => {
  return job2().then(() => {
   return job3().then(() => {
    return job4().then(() => {
     doSomething();
    });
   });
  });
 });
}

function test() {
 return job()

  .then(() => {
   return job2();
  })

  .then(() => {
   return job3();
  })

  .then(() => {
   return job4();
  })

  .then(() => {
   doSomething();
  });
}

// we should always return a promise

function job() {
 if (test) {
  return aNewPromise();
 } else {
  return 42;
 }
}

const result = job();

if (typeof job === 'object' && typeof job.then === 'function') {
 // ...
} else {
 // ...
}

Promise.resolve(42);

function job() {
 if (test) {
  return aNewPromise();
 } else {
  return Promise.resolve(42); // return an auto-resolved promise with `42` in data.
 }
}
Promise.reject()


// forgotten promise

const test = () => {
 let promise = job();

 return new Promise((resolve, reject) => {
  promise.then(data => {
   data = doSomething(data);
   resolve(data);
  }, (error) => {
   reject(error);
  });
 });
}

const test = () => {
 return job().then(data => {
  return doSomething(data);
 });
}





const job = () => new Promise((_, reject) => reject())

const promise = job();

promise

 .then(() => console.log('Success 1'))

 .then(() => console.log('Success 2'))

 .then(() => console.log('Success 3'))

 .catch(() => console.log('Error 1'))

 .then(() => console.log('Success 4'));


const job = (state) => {
 return new Promise((resolve, reject) => {
  if (state) {
   resolve('success');
  } else {
   reject('error');
  }
 });
}

let promise = job(true);
//success, error, Error Caught
promise

 .then(data => {
  console.log(data);

  return job(false);
 })

 .catch(error => {
  console.log(error);

  return 'Error caught';
 })

 .then(data => {
  console.log(data);

  return job(true);
 })

 .catch(error => {
  console.log(error);
 });

const job = (state) => {
 return new Promise((resolve, reject) => {
  if (state) {
   resolve('success');
  } else {
   reject('error');
  }
 });
}

const promise = job(true);
//"success", "Defeat", "error", "Error Caught", "Error: test"
promise

 .then(data => {
  console.log(data);

  return job(true);
 })

 .then(data => {
  if (data !== 'victory') {
   throw 'Defeat';
  }

  return job(true);
 })

 .then(data => {
  console.log(data);
 })

 .catch(error => {
  console.log(error);

  return job(false);
 })

 .then(data => {
  console.log(data);

  return job(true);
 })

 .catch(error => {
  console.log(error);

  return 'Error caught';
 })

 .then(data => {
  console.log(data);

  return new Error('test');
 })

 .then(data => {
  console.log('Success:', data.message);
 })

 .catch(data => {
  console.log('Error:', data.message);
 });


const p1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'p1'))

const p2 = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p2'))

const p3 = new Promise((resolve, reject) => setTimeout(resolve, 1200, 'p3'));

const p4 = new Promise((resolve, reject) => setTimeout(reject, 300, 'p4'));

const p5 = new Promise((resolve, reject) => setTimeout(resolve, 800, 'p5'));

const promise = Promise.all([p1.catch(() => { }), p2.catch(() => { }), p3.catch(() => { }), p4.catch(() => { }), p5.catch(() => { })]);


promise
 .then(data => {
  data.forEach(data => {
   console.log(data);
  });
 })

 .catch(error => {
  console.error('error', error);
 });




