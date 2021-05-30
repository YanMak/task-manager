const tinify = require("tinify");
//tinify.key = "ftzR1sM2vqckmCj5nJNWWdwP7CyrXHVj";
//sQNRMpWQTHHKxWF3htG4CfdF4Vj8WGmm
tinify.key = "sQNRMpWQTHHKxWF3htG4CfdF4Vj8WGmm";

const processImage = async (src, dest) => {
    const source = await tinify.fromFile(src);
    //source.toFile("optimized.jpg");
    //source.toFile("./temporaryForCompression/optimized.jpg");
    
    
    const resized = await source.resize({
        method: "fit",
        width: 1000,
        height: 5000
    });
    
    await resized.toFile(dest);                
    
    //await source.toFile(dest);                

}

/*
var fileSrc = "./temporaryForCompression/3.jpg";
var fileDest = "./temporaryForCompression/optimized.jpg"; 
processImage(fileSrc, fileDest);
*/

/*
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
*/

module.exports = {
  processImage
}