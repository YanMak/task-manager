const scp = require('node-scp')
const tinify = require('./tinify_queries');
const fs = require('fs').promises;

//const sftpTest = require('./tinify_queries');

/*sessionOptions.HostName = "80.78.246.130";
            sessionOptions.UserName = "bitrix";
            sessionOptions.Password = "qS8iF7uL9ckS6v";
            sessionOptions.SshHostKeyFingerprint = "ssh-rsa 2048 3rvUAyxIUJMqIYhRP6vzO72Wa6CkY3L477Eczre1HTI=";    
*/

const ProcessImages = async (article) => {
    var ProcessedDir = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/";
    var UnprocessedDir = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/";
    var localTempDir = "./temporaryForCompression/";

    processAndUpload(article, UnprocessedDir, ProcessedDir, localTempDir);
}

const processAndUpload = async (article, fromDir, toDir, tempDir) => {
    console.log(fromDir + article + '/');
    
    var list = await listDir(fromDir + article + '/');
    
    var src = "";
    var dest = "";
    var tempProcessed = "";
    var srcUpload = "";
    //console.log(list);
    //return;
    await list.forEach(function(entry) {
        src = fromDir + article + "/" + entry.name;
        dest = tempDir + entry.name;
        //srcUploadingFile = toDir + article + '/' + entry.name;
        srcUploadingFile = toDir + entry.name;
        //console.log(src + ' -> ' + dest );
        if (isImage(entry.name)){
            //console.log('isImage');
            //downloadFile(src, dest);

            tempProcessed = tempDir + "_processed_" + entry.name;
            //tinify.processImage(dest, tempProcessed);// now we has processed images with same names
            //uploadFile1(tempProcessed, srcUploadingFile);
            //uploadFile1(dest, srcUploadingFile);
            
            // copy compressed on sftp
            
            //console.log('upload from: ' + dest + ' to dir: ' + srcUploadingFile);                
            //var file1 = "./temporaryForCompression/" + entry.name;
            //var file2 = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/" + entry.name;
                       
            //uploadFile1(dest, srcUploadingFile);
            //testUpload(dest, srcUploadingFile);    
            //uploadFile(file1, file2);
            //uploadFile(dest, srcUploadingFile);      
        }
    });
    uploadDir1();
}

async function uploadDir1 (src = "./temporaryForCompression", dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/1") {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })

    //await client.uploadDir('./local/dir', '/server/path')
    await client.uploadDir(src, dest)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

const isImage = (name) => {
    //console.log('isImage=' + name.indexOf('.jpg'));
    if (name.indexOf('.jpg')>-1){
        return true;
    }
    return false;
} 

async function downloadFile(src, dest) {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    //var fileSrc = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo/2.1.2.20.06.59.02505_194007/1.jpg';
    await client.downloadFile(src, dest);
    client.close() // remember to close connection after you finish
  } catch(e) {
    console.log(e)
  }
}

async function uploadFile_archive(src = "./temporaryForCompression/3.jpg", dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/1.jpg") {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    var fileDest = dest;
    var fileSrc = src;
    console.log('src: ' + src + ' dest:' + dest);

    await client.uploadFile(fileSrc, fileDest);
    // you can perform upload multiple times
    //await client.uploadFile('./test1.txt', '/workspace/test1.txt')
    client.close() // remember to close connection after you finish    
    //await client.uploadFile(src, dest);
    //client.close() // remember to close connection after you finish // remember to close connection after you finish
  } catch (e) {
  }
}

async function uploadFile1(src = "./temporaryForCompression/3.jpg", dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/1.jpg") {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    var fileDest = dest;
    //var fileDest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007/";
    var fileSrc = src;
    console.log('upload1 src: ' + src + ' dest:' + dest);

    await client.uploadFile(src, dest);
    //await client.uploadFile(fileSrc, fileDest);
    // you can perform upload multiple times
    //await client.uploadFile('./test1.txt', '/workspace/test1.txt')
    client.close(); // remember to close connection after you finish
  } catch (e) {
  }
}

async function listDir(dir) {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    const result = await client.list(dir);
    client.close() // remember to close connection after you finish
    //console.log(result);
    return result;
  } catch (e) {
    console.log(e)
  }
}

//////////////////////////////////////////////
const getScpClient = async () =>{
  try {
      const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })

    return client;
  } catch (e) {
    console.log(e)
  }
}

const readProcessImagesInDir_archive = async (path = "") =>{
  await fs.readdir(path, async function(err, items) {
    //console.log(items);
    var src = "";
    var dest = "";

    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
        src = "" + path + "/" + items[i];
        dest = "" + path + "/processed_" + items[i];
        //console.log(items[i] + ' src:' + src + ' dest:' + dest);
        await tinify.processImage(src, dest);
        // now we has processed images with same names
    }
});
}

const readProcessImagesInDir = async (path = "") =>{
  
    //console.log(items);
    var src = "";
    var dest = "";

    const items = await fs.readdir(path);

    let name = '';
    for (var i=0; i<items.length; i++) {
      name = items[i];
      if (isImage(name)){
        //console.log(name);
        src = "" + path + "/" + name;
        dest = "" + path + "/processed/" + name;
        //console.log(items[i] + ' src:' + src + ' dest:' + dest);
        await tinify.processImage(src, dest);
        // now we has processed images with same names
      }
    }

}

const letsProcessArticle = async (article) =>{
  try {
    var client = await getScpClient();
    await letsDownloadDir(client, article);
    //await client.close();

    await readProcessImagesInDir("./temporaryForCompression");

    //var client = await getScpClient();
    await letsUploadDir(client, article);
    
    await client.close();
  } catch (e) {
    console.log(e)
  }
}

const doJob = async () =>{
  try {
    var client = await getScpClient();
    await letsDownloadDir(client);
    //await client.close();

    await readProcessImagesInDir("./temporaryForCompression");

    //var client = await getScpClient();
    await letsUploadDir(client);
    
    await client.close();
  } catch (e) {
    console.log(e)
  }
}



const letsDownloadDir = async (
  client,
  article = "",  
  src = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/2.1.2.20.06.59.02505_194007", 
  dest = "./temporaryForCompression") =>
{ 
  if (article!==""){
    src = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/" + article;
  };
  await client.downloadDir(src, dest);
}

const letsListDir = async (
  client, 
  src = "./temporaryForCompression") => 
{ 
  const result = await client.list(src);
  return result;
}

const letsUploadDir = async (
  client, 
  article = "", 
  src = "./temporaryForCompression/processed", 
  dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/2.1.2.20.06.59.02505_194007") =>
{ 
  if (article!==""){
    dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/" + article;
  };
  await client.uploadDir(src, dest);
}

//doJob();
//letsProcessArticle("2.1.2.20.06.59.02424_006129");

module.exports = {
  letsProcessArticle
}
//ProcessImages('2.1.2.20.06.59.02505_194007');