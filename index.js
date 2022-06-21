require("dotenv").config();
const { NFTStorage, File, Blob } = require('nft.storage')

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const nftStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: nftStorageToken })

const areValidLists = (names, descriptions) => {
    if(names.length != descriptions.length){
        return false
    }
    let arrLength = names.length;
    for (let index = 0; index < arrLength; index++) {
        const name = names[index], description = descriptions[index]
        if (!description.includes(name)) {
            return false;
        }
    }
    return true;

}

const imageDirectoryPath = path.join(__dirname, 'images');
const nameDirectoryPath = path.join(__dirname, 'info', 'name.txt');
const descriptionDirectoryPath = path.join(__dirname, 'info', 'description.txt');

const nftNames = fs.readFileSync(nameDirectoryPath, 'utf-8').split("\r\n");
const nftDescriptions = fs.readFileSync(descriptionDirectoryPath, 'utf-8').split("\r\n");
let namesAndDescriptionsValid = areValidLists(names, descriptions);
if (namesAndDescriptionsValid) {
    fs.readdir(imageDirectoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        console.log("File names:");
        files.forEach(function (file) {
            // console.log(file); 
        });
    }); 
}
else{
    console.log("Name and description lists are invalid.");
}

