// STRAIGHT UP - 10 sec - 783 results
// node monkey.js 10
var monkeyResults = [],
    monkeyPressing = true,
    monkeyPressTill = new Date().getTime()+(parseInt(process.argv[2])*1000),
    keys = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '*', '/', '+', '-'];
 
function monkeyStopped() {
  var Sum = 0;
 
  Sum = monkeyResults.reduce(function(a, b) {
    return a + b;
  })
   
  var average = Sum / monkeyResults.length;
 
  console.log('monkey calculated '+monkeyResults.length+' results');
  console.log('monkey result average: ',average);
}
 
while(monkeyPressing) {
  if( new Date().getTime() > monkeyPressTill ) {
    monkeyStopped();
    monkeyPressing = false;
  } else {
    var MonkeyAlgo = '';
   
    for(var MonkKeyPresses=1; MonkKeyPresses<10000; ) {
      // monkey space dem ops
      var monkKey;
      if( MonkKeyPresses == 1 || MonkKeyPresses == 9999 || ['*', '/', '+', '-'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) != -1 ) {
        monkKey = keys.slice(1,10)[Math.floor(Math.random()*keys.slice(1,10).length)];
      } else if( ['0'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) == 0 ) {
        monkKey = keys.slice(1)[Math.floor(Math.random()*keys.slice(1).length)];
      } else {
        monkKey = keys[Math.floor(Math.random()*keys.length)];
      }
      MonkKeyPresses++;
      MonkeyAlgo += monkKey;
    }
    var result = eval(MonkeyAlgo);
    monkeyResults.push(result);
    console.log('monkey result: ', result);
  }
}

// FORKING IMPLEMENTATION
// node monkey.js
// const cluster = require('cluster');
 
// if (cluster.isMaster) {
//   const numCPUs = require('os').cpus().length;
//   var monkeyCount = 0;
   
//   // fork some monkeys
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
   
//   // once the monkeys are online, send them a message.
//   cluster.on('online', (worker) => {
         
//     worker.send({
//       message: 'I would like to hire you, monkey!'
//     });
     
//     // handle a message when a monkey responds
//     worker.on('message', (message) => {
//       console.log(`monkey ID: ${message.monkeyid} said ${message.message}`);
       
//       // as soon as I have received a response from all available monkeys I need to exit
//       monkeyCount++;
//       if( monkeyCount == numCPUs ) {
//         process.exit();
//       }
//     });
     
     
//   });
   
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`monkey ID: ${worker.process.pid} died`);
//   });
   
// } else {
   
//   // the child monkey responds to being poked.
//   process.on('message', (message) => {
     
//     console.log(`Monkey: ${process.pid} is online and received a message received a message.`);
     
//     if( message.message == 'I would like to hire you, monkey!' ) {
//       process.send({
//         monkeyid: process.pid,
//         message: 'I\'ll take the job!'
//       });
//     }
     
//   });
   
// }

// FORKED MONKEY RESULTS - 10 sec - 1285 results
// node monkey.js 10
// const cluster = require('cluster');
 
// var monkeyResults = [],
//     monkeyPressing = true,
//     monkeysCompleted = 0,
//     keys = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '*', '/', '+', '-'];
 
// if(cluster.isMaster) {
//   const numWorkers = require('os').cpus().length;
//   var   monkeyPressTill = new Date().getTime()+(parseInt(process.argv[2])*1000);
   
//   console.log('Master monkey hiring ' + numWorkers + ' monkeys...');
   
//   for(var i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
 
//   cluster.on('online', (worker) => {
//     console.log('Monkey ID ' + worker.process.pid + ' is hired');
         
//     worker.send({
//       type: 'keypress',
//       from: 'master',
//       data: {
//         'pressTill': monkeyPressTill
//       }
//     });
     
//     worker.on('message', (message) => {
//       switch(message.type) {
//         case'result':
//           monkeyResults.push(message.data.result);
//           console.log('Monkey ID '+message.monkeyid+' result: '+message.data.result);
//           break;
//         case'end':
//           console.log('Monkey ID '+message.monkeyid+' completed '+message.data.totalresults+' result.');
//           monkeysCompleted++;
//           if( monkeysCompleted == numWorkers ) {
//             monkeyStopped();
//           }
//           break;
//       }
//     });
         
//   });
 
//   cluster.on('exit', (worker, code, signal) => {
//     console.log('Monkey ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//     console.log('Hiring a new Monkey');
//     cluster.fork();
//   });
   
// } else {
     
//   process.on('message', (message) => {
//     if(message.type === 'keypress') {
//       monkeyPress(message.data.pressTill);
//     }
//   });
   
   
// }
 
 
// function monkeyPress(monkeyPressTill) {
//   var resultCount = 0;
//   while(monkeyPressing) {
//     if( new Date().getTime() > monkeyPressTill ) {
//       process.send({
//         'type':'end',
//         'monkeyid': process.pid,
//         'data':{
//           'totalresults':resultCount
//         }
//       });
//       monkeyPressing = false;
//     } else {
//       var MonkeyAlgo = '';
       
//       for(var MonkKeyPresses=1; MonkKeyPresses<10000; ) {
//         // monkey space dem ops
//         var monkKey;
//         if( MonkKeyPresses == 1 || MonkKeyPresses == 9999 || ['*', '/', '+', '-'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) != -1 ) {
//           monkKey = keys.slice(1,10)[Math.floor(Math.random()*keys.slice(1,10).length)];
//         } else if( ['0'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) == 0 ) {
//           monkKey = keys.slice(1)[Math.floor(Math.random()*keys.slice(1).length)];
//         } else {
//           monkKey = keys[Math.floor(Math.random()*keys.length)];
//         }
//         MonkKeyPresses++;
//         MonkeyAlgo += monkKey;
//       }
//       var result = eval(MonkeyAlgo);
//       process.send({
//         'type':'result',
//         'monkeyid': process.pid,
//         'data':{
//           'result':result
//         }
//       });
//       resultCount++;
//     }
//   }
// }
 
// function monkeyStopped() {
//   var Sum = 0;
 
//   Sum = monkeyResults.reduce(function(a, b) {
//     return a + b;
//   })
   
//   var average = Sum / monkeyResults.length;
 
//   console.log('Together the monkeys calculated '+monkeyResults.length+' results');
//   console.log('All monkeys averaged: ',average);
//   process.exit();
// }

// REDUCED OVERHEAD FORKED RESULTS  - 10 sec - 1461 resuts
// node monkey.js 10 true
// const cluster = require('cluster');
 
// var monkeyResults = [],
//     monkeyPressing = true,
//     monkeysCompleted = 0,
//     keys = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '*', '/', '+', '-'];
 
// if(cluster.isMaster) {
//   const numWorkers = require('os').cpus().length;
//   var   monkeyPressTill = new Date().getTime()+(parseInt(process.argv[2])*1000);
   
//   console.log('Master monkey hiring ' + numWorkers + ' monkeys...');
   
//   for(var i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }
 
//   cluster.on('online', (worker) => {
//     console.log('Monkey ID ' + worker.process.pid + ' is hired');
         
//     worker.send({
//       type: 'keypress',
//       from: 'master',
//       groupResults: Boolean(process.argv[3]),
//       data: {
//         'pressTill': monkeyPressTill
//       }
//     });
     
//     worker.on('message', (message) => {
//       switch(message.type) {
//         case'result':
//           monkeyResults.push(message.data.result);
//           console.log('Monkey ID '+message.monkeyid+' result: '+message.data.result);
//           break;
//         case'groupedResult':
//           monkeyResults = monkeyResults.concat(message.data.result);
//           monkeysCompleted++;
//           if( monkeysCompleted == numWorkers ) {
//             monkeyStopped();
//           }
//           break;
//         case'end':
//           console.log('Monkey ID '+message.monkeyid+' completed '+message.data.totalresults+' result.');
//           if( !Boolean(process.argv[3]) ) {
//             monkeysCompleted++;
//           }
//           if( monkeysCompleted == numWorkers ) {
//             monkeyStopped();
//           }
//           break;
//       }
//     });
         
//   });
 
//   cluster.on('exit', (worker, code, signal) => {
//     console.log('Monkey ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//     console.log('Hiring a new Monkey');
//     cluster.fork();
//   });
   
// } else {
     
//   process.on('message', (message) => {
//     if(message.type === 'keypress') {
//       monkeyPress(message.data.pressTill,message.groupResults);
//     }
//   });
   
   
// }
 
 
// function monkeyPress(monkeyPressTill,groupResults) {
//   var resultCount = 0;
//   var resultGroup = [];
//   while(monkeyPressing) {
//     if( new Date().getTime() > monkeyPressTill ) {
//       if(groupResults) {
//         process.send({
//           'type':'groupedResult',
//           'monkeyid': process.pid,
//           'data':{
//             'result':resultGroup
//           }
//         });
//       }
//       process.send({
//         'type':'end',
//         'monkeyid': process.pid,
//         'data':{
//           'totalresults':resultCount
//         }
//       });
//       monkeyPressing = false;
//     } else {
//       var MonkeyAlgo = '';
       
//       for(var MonkKeyPresses=1; MonkKeyPresses<10000; ) {
//         // monkey space dem ops
//         var monkKey;
//         if( MonkKeyPresses == 1 || MonkKeyPresses == 9999 || ['*', '/', '+', '-'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) != -1 ) {
//           monkKey = keys.slice(1,10)[Math.floor(Math.random()*keys.slice(1,10).length)];
//         } else if( ['0'].indexOf(MonkeyAlgo[MonkeyAlgo.length -1]) == 0 ) {
//           monkKey = keys.slice(1)[Math.floor(Math.random()*keys.slice(1).length)];
//         } else {
//           monkKey = keys[Math.floor(Math.random()*keys.length)];
//         }
//         MonkKeyPresses++;
//         MonkeyAlgo += monkKey;
//       }
//       var result = eval(MonkeyAlgo);
//       if( groupResults ) {
//         resultGroup.push(result);
//       } else {
//         process.send({
//           'type':'result',
//           'monkeyid': process.pid,
//           'data':{
//             'result':result
//           }
//         });
//       }
//       resultCount++;
//     }
//   }
// }
 
// function monkeyStopped() {
//   var Sum = 0;
 
//   Sum = monkeyResults.reduce(function(a, b) {
//     return a + b;
//   })
   
//   var average = Sum / monkeyResults.length;
 
//   console.log('Together the monkeys calculated '+monkeyResults.length+' results');
//   console.log('All monkeys averaged: ',average);
//   process.exit();
// }