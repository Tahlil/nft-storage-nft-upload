require("dotenv").config();
const { NFTStorage, File, Blob } = require('nft.storage')
const { filesFromPath } = require('files-from-path')

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
let namesAndDescriptionsValid = areValidLists(nftNames, nftDescriptions);
let baseIpfsLink;
async function main()
{
    const files = filesFromPath(imageDirectoryPath, {
        pathPrefix: path.resolve(imageDirectoryPath), // see the note about pathPrefix below
        hidden: true, // use the default of false if you want to ignore files that start with '.'
    });
    console.log(`storing file(s) from ${path}`)
    const cid = await client.storeDirectory(files)
    console.log({ cid })

    const status = await client.status(cid)
    console.log(status)
    baseIpfsLink = 'https://' + cid + '.ipfs.nftstorage.link/';
}

if (namesAndDescriptionsValid) {
    main()
}
else{
    console.log("Name and description lists are invalid.");
}

