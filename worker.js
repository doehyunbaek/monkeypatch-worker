console.log(`workerFunction: ${workerFunction().toString()}`);

function workerFunction() {
  return Math.random().toString();
}

self.addEventListener('message', event => {
  console.log('got this data: ' + event.data);
});

(async function() {
  while (true) {
    self.postMessage(workerFunction.toString());
    await new Promise(x => setTimeout(x, 100));
  }
})();