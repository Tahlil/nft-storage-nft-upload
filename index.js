require("dotenv").config();
const { NFTStorage, File, Blob } = require('nft.storage')

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const nftStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: nftStorageToken })

const directoryPath = path.join(__dirname, 'images');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log("File names:");
    files.forEach(function (file) {
        console.log(file); 
    });
});