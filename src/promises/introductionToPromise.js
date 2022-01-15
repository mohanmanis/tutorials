/* 
1. benefit of Async code
2. Downsides of callback
3. intro to Promises
4. Async/await
*/

function job1(callback) {
 setTimeout(function () {
  callback('test 1');
 }, 2000);
}

function job2(callback) {
 setTimeout(function () {
  callback('test 2');
 }, 4000);
}

job1(function (data) {
 console.log(data);

 job2(function (data) {
  console.log(data);
 });
});

//pyramid of doom also known as callback hell

job1(function () {
 doSomething1();

 job2(function () {
  doSomething2();

  job3(function () {
   doSomething3();

   job4(function () {
    doSomething4();
   });
  });
 });
});

var counter = 0;

job1(function () {
 doSomething1();

 counter += 1;

 if (counter == 2) {
  done();
 }
});

job2(function () {
 doSomething2();

 counter += 1;

 if (counter == 2) {
  done();
 }
});

function done() {
 console.log('done');
}

const promise = new Promise((resolve, reject) => {

})

fetch('products.json').then(function (response) {
 return response.json();
}).then(function (json) {
 let products = json;
 initialize(products);
}).catch(function (err) {
 console.log('Fetch problem: ' + err.message);
});


/* 
Main thread -- uses the stack
web apis --> event queue --> async code queued 

main thread is free then event loop will put the process or the async event from the queue to the call stack so that main thread will take care of the processing.
*/


chooseToppings(function (toppings) {
 placeOrder(toppings, function (order) {
  collectOrder(order, function (pizza) {
   eatPizza(pizza);
  }, failureCallback);
 }, failureCallback);
}, failureCallback);


chooseToppings()
 .then((toppings) => placeOrder(toppings))
 .then(order => collectOrder(order))
 .then(pizza => eatPizza(pizza))
 .catch(failureCallback);

chooseToppings().then(placeOrder).then(collectOrder).then(eatPizza).catch(failureCallback);

async function hello() { return "Hello" };
hello();


const hello = async function () { return "Hello" };
hello();

const hello = async () => "hello";

hello().then(console.log)


async function hello() {
  await Promise.resolve("Hello"); //await pauses the execution untill the async code finishes its operation
  console.log("Manish")
};


hello().then(alert);


chooseToppings()
 .then(toppings => placeOrder(toppings))
 .then(order => collectOrder(order))
 .then(pizza => eatPizza(pizza))
 .catch(failureCallback);


const start = async () => {
 try {
  const toppings = await chooseToppings();
  const order = await placeOrder(toppings);
  const pizza = await collectOrder(order);
  await eatPizza(pizza);
 } catch (err) {
   failureCallback(err)
 }
}

start().then(()=> {})