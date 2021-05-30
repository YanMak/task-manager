const tinify = require("tinify");
tinify.key = "ftzR1sM2vqckmCj5nJNWWdwP7CyrXHVj";

var fileSrc = "./temporaryForCompression/3.jpg";
var fileDest = "./temporaryForCompression/optimized.jpg"; 
//var fileSrc = '/temporaryForCompression/1.jpg';
//var fileDest = '/temporaryForCompression/1_optimized.jpg'; 
//tinify.fromFile(fileDest).toFile(fileDest);
const source = tinify.fromFile(fileSrc);
//source.toFile("optimized.jpg");
//source.toFile("./temporaryForCompression/optimized.jpg");
const resized = source.resize({
  method: "fit",
  width: 80,
  height: 60
});
resized.toFile(fileDest);
