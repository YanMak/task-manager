const scp = require('node-scp')

/*sessionOptions.HostName = "80.78.246.130";
            sessionOptions.UserName = "bitrix";
            sessionOptions.Password = "qS8iF7uL9ckS6v";
            sessionOptions.SshHostKeyFingerprint = "ssh-rsa 2048 3rvUAyxIUJMqIYhRP6vzO72Wa6CkY3L477Eczre1HTI=";    
*/

async function testUpload() {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    var fileDest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/3.jpg";
    //var fileDest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007/";
    var fileSrc = "./temporaryForCompression/3.jpg";

    await client.uploadFile(fileSrc, fileDest);
    // you can perform upload multiple times
    //await client.uploadFile('./test1.txt', '/workspace/test1.txt')
    client.close() // remember to close connection after you finish
  } catch (e) {
  }
}

async function testDownloadFile() {
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
    var fileSrc = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007/3.jpg'
    var fileDest = './temporaryForCompression/3.jpg';
    await client.downloadFile(fileSrc, fileDest);
    client.close() // remember to close connection after you finish
  } catch(e) {
    console.log(e)
  }
}

async function testStat() {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    //cosnt result = await client.stat('/server/path')
    const result = await client.stat('/')
    console.log(result)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

async function testList() {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })
    const result = await client.list('/var/www/bitrix/data/www/incity.ru/upload/1c_photo/');
    console.log(result)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

async function testDeleteFiles() {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })

    var fileDest = './temporaryForCompression/1.jpg';
    var fileSrc = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007/3.jpg';
    const result = await client.unlink(fileSrc);
    console.log(result)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

async function testDeleteDirectories() {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })

    var fileDest = './temporaryForCompression/1.jpg';
    var fileSrc = '/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007';
    const result = await client._rmdir(fileSrc);
    console.log(result)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

async function uploadDir1 (src, dest) {
  try {
    const client = await scp({
      host: '80.78.246.130',
      port: 22,
      username: 'bitrix',
      password: 'qS8iF7uL9ckS6v',
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    })

    var Dest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_processed/1";
    //var fileDest = "/var/www/bitrix/data/www/incity.ru/upload/1c_photo_compressed/2.1.2.20.06.59.02505_194007/";
    var Src = "./temporaryForCompression";

    //await client.uploadDir('./local/dir', '/server/path')
    await client.uploadDir(Src, Dest)
    client.close() // remember to close connection after you finish
  } catch (e) {
    console.log(e)
  }
}

uploadDir1('', '');
//testList();
//testDownloadFile();
//testDeleteFiles();//unlink
//testDeleteDirectories();
//testUpload();
//_rmdir

module.exports = {
  testUpload
}