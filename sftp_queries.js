const scp = require('node-scp')
const tinify = require('./tinify_queries');
const fs = require('fs').promises;

const isImage = (name) => {
    //console.log('isImage=' + name.indexOf('.jpg'));
    if (name.indexOf('.jpg')>-1){
        return true;
    }
    return false;
}
const processedFilesSFTP = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/';
const unprocessedFilesSFTP = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/';
const unprocessedFilesLocal = '/var/www/temp/';

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

const readProcessImagesInDir = async (path = "") =>{
  
    //console.log(items);
    var src = "";
    var dest = "";

    const items = await fs.readdir(path);
    
    let name = '';
    for (var i=0; i<items.length; i++) {
      name = items[i];
      
      if (isImage(name)){
        
        src = "" + path + "/" + name;
        dest = "" + path + "/processed/" + name;
        
        await tinify.processImage(src, dest);
        //if (i>0) {return "" + i + " path: " + path;}
        // now we has processed images with same names
      }
    }
    return true;
}

const cleanTempDir = async ()=>{
    // clean root
    let name = '';
    let path = unprocessedFilesLocal;
    let items = await fs.readdir(unprocessedFilesLocal);
    
    for (var i=0; i<items.length; i++) {
      name = items[i];
      
      if (isImage(name)){
        
        src = "" + path + "" + name;
        dest = "" + path + "processed/" + name;
        
        await fs.unlink(src);
        //if (i>0) {return "" + i + " path: " + path;}
        // now we has processed images with same names
      }
    }

    // clean root
    items = await fs.readdir(unprocessedFilesLocal + 'processed');
    
    for (var i=0; i<items.length; i++) {
      name = items[i];
      
      if (isImage(name)){
        
        src = "" + path + "/" + name;
        dest = "" + path + "/processed/" + name;
        
        await fs.unlink(dest);
        //if (i>0) {return "" + i + " path: " + path;}
        // now we has processed images with same names
      }
    }
}

const letsProcessArticle = async (article) =>{
  try {
    let client = await getScpClient();

    // lets clean temp first
    await cleanTempDir();

    await letsDownloadDir(client, article);
    //await client.close();
 
    // проверяем вызов экспресса и комментируем это
    //let processed =  
    await readProcessImagesInDir(unprocessedFilesLocal);
    //return processed;//test of node express
    
    //if all prev func except this is comented, then uploading succesful
    await letsUploadDir(client, article);
            
    await client.close();
    //client.close();
    return true;
  } catch (e) {
    console.log(e)
  }
  return false;
}

const letsDownloadDir = async (
  client,
  article = "",  
  src = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/2.1.2.20.06.59.02505_194007", 
  dest = "/var/www/temp") =>
{ 
  if (article!==""){
    src = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_unprocessed/" + article;
  };
  await client.downloadDir(src, dest);
}

const letsListDir = async (
  client, 
  src = processedFilesSFTP) => 
{ 
  //console.log('letsListDir ' + processedFilesSFTP);
  const result = await client.list(src);
  //console.log(result);
  return result;
}

const letsUploadDir = async (
  client, 
  article = "", 
  src = unprocessedFilesLocal, 
  dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/2.1.2.20.06.59.02505_194007") =>
{ 
  if (article!==""){
    dest = processedFilesSFTP + article;
  };
  await client.uploadDir(src + 'processed', dest);
}

const hasProcessedImages = async (items) => {
    // list processed dir and send true if has imgs    
    
    let name = '';
    hasImages = false;
    for (let i=0; i<items.length; i++){
        name = items[i].name;
        if (isImage(name)){
            hasImages = true;                    
        }        
    }
    //console.log('hasProcessedImages ' + article + ' ' + hasImages);
    return hasImages;
}

const letsFindOutIfHasProcessedImages = async (article) =>
{ 
    let client = await getScpClient();
    let src = ''+processedFilesSFTP + article;
    let exist = await pathExist(client, src);
    if (!exist) {
        await client.close();
        //console.log('!!!!!' + src + ' exists ' + exist);
        return exist
    };
    //console.log('!!!!!' + src + ' exists ' + exist);
    src = processedFilesSFTP + article;
    //console.log('!!!!! dir before listing ' + src);
    let items = await letsListDir(client, src);
    //console.log('!!!!! dir was listed ' + src);
    let res = await hasProcessedImages(items, article);
    //console.log('!!!res ' + res);
    
    await client.close();
    return res;
}

const cleanFiles = async (client, dir, items) => {
  for (let i=0; i<items.length; i++){

  }    
} 

const letsFindOutIfPathExist = async (path) => {
    let client = await getScpClient();
    let src = ''+processedFilesSFTP + path;
    //console.log('src'+src);
    //let res = await pathExist(client, src);
    let res = await client.exists(src);

    //console.log('letsFindOutIfPathExist ' + src + ' res:' + !(res ===false));
    await client.close();
    return !(res ===false);
}


const pathExist = async (client, path) => {
  try {
    const result = await client.exists(path);
    //console.log('pathExist ' + path + ' : ' + !(result ===false));
    return !(result ===false);
  } catch (e) {
    console.log(e)
  }
}

//letsProcessArticle();
//letsFindOutIfHasProcessedImages("1.1.1.18.01.04.00073_110602");
//cleanTempDir();
//letsProcessArticle("1.1.1.19.01.02.00650_999999");
//letsFindOutIfHasProcessedImages("1.1.1.19.01.02.00650_999999");
//letsFindOutIfHasProcessedImages('2.1.2.20.06.59.02424_006129');
//letsFindOutIfHasProcessedImages('2.1.2.20.06.59.02505_194007');
//letsFindOutIfHasProcessedImages('2.1.2.20.06.59.02505_194007__');
//letsFindOutIfPathExist('2.1.2.20.06.59.02505_194007__');
//letsFindOutIfPathExist('2.1.2.20.06.59.02505_19400');
//letsFindOutIfPathExist('2.1.2.20.06.59.02505_194007');
//letsFindOutIfPathExist('2.1.2.20.06.59.02424_006129');
//doJob();

module.exports = {
  letsProcessArticle, letsFindOutIfHasProcessedImages, letsFindOutIfPathExist
}