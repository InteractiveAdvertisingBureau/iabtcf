const axios = require('axios');
const stream = require('stream');
const util = require('util');
const Fs = require('fs');  

const baseURL = 'https://iabtcf.com';
const latestVersionURL= 'https://vendor-list.consensu.org/v2'

async function getExistingVersion() {
    try{
        const res = await axios.get(`${baseURL}/vendorlist/vendor-list.json`);
        return res.data.vendorListVersion;
    } catch(error){
        return error;
    }
}

async function getLatestVersion() {
    try{
        const res = await axios.get(`${latestVersionURL}/vendor-list.json`);
        return res.data.vendorListVersion;
    } catch(error){
        return error;
    }
}

async function updateGVLData(){
   const existingVersion =  await getExistingVersion();
   const latestVersion =  await getLatestVersion();
   console.log("existingVersion", existingVersion);
   console.log("latestVersion", latestVersion);
   var counter = existingVersion;
   if(counter < latestVersion){
        while(counter < latestVersion){
            counter++;
            console.log(`writing file vendor-list-v${counter}.json`);
            await downloadFile(`${latestVersionURL}/archives/vendor-list-v${counter}.json`, `./docs/vendorlist/archives/vendor-list-v${counter}.json`);  
        }
        console.log(`updating file vendor-list.json`);
        await removeOldFile(`./docs/vendorlist/vendor-list.json`);
        await updateVendorList(`./docs/vendorlist/vendor-list.json`, `archives/vendor-list-v${latestVersion}.json`);  
   }
}



const finished = util.promisify(stream.finished);

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = Fs.createWriteStream(outputLocationPath);
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(writer);
    return finished(writer); //this is a Promise
  });
}

async function removeOldFile(path){
  return Fs.unlink(path,function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
  });  
}

async function updateVendorList(path, content){
    return Fs.writeFile(path, content, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(Fs.readFileSync(path, "utf8"));
        }
      });
}

updateGVLData();