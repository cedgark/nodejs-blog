// const name = 'luigi';
//
// // const time = global.setTimeout(() => {
// //   console.log(`Hello there, ${name}`)
// // }, 2000);
//
// console.log(__dirname);

// const xyz = require('./people');
//
// console.log(xyz.people);

// const os = require('os');
//
// console.log(os.platform(), os.homedir())

// ** File system module ** //

const fs = require('fs');

// fs.readFile('./blog1.txt', (err,data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.toString());
//   }
// });

// fs.writeFile('./blog2.txt', 'hello, luigi', () => {
//   console.log('file updated successfully');
// });

// if (!fs.existsSync('./assets')) {
// fs.mkdir('./assets', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("folder created successfully");
//   }
// });
//
// } else {
//
// fs.rmdir('./assets', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("folder deleted");
//   }
// });
//
// }

// ** File system module: Streams and Buffers ** //

const readStream = fs.createReadStream('./docs/blog3.txt');
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//   writeStream.write('\n---NEW CHUNK---\n')
//   writeStream.write(chunk);
// });

readStream.pipe(writeStream);
