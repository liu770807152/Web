let startTime;

function appStart() {
  startTime = new Date();
  console.log('app started');
}

function timestamp() {
  console.log(`${new Date() - startTime} ms passed`);
}

module.exports = { appStart, timestamp };
// module.exports = { appStart: appStart, timestamp: timestamp };

// module

// node REPL