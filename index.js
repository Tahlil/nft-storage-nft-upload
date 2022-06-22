require("dotenv").config();
const { NFTStorage, File, Blob } = require('nft.storage')
const { filesFromPath } = require('files-from-path')

//requiring path and fs modules
const path = require
('path');
const fs = require('fs');


const nftStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: nftStorageToken })

const imageDirectoryPath = path.join(__dirname, 'images');
const nameDirectoryPath = path.join(__dirname, 'info', 'name.txt');
const descriptionDirectoryPath = path.join(__dirname, 'info', 'description.txt');

const areValidLists = (names, descriptions) => {
    const numberOfImages = fs.readdirSync(imageDirectoryPath).length;
    if(names.length != descriptions.length){
        console.log("Number of names and description don't match");
        return false
    }
    if(names.length != numberOfImages){
        console.log("Number of names/description and images don't match");
        return false
    }
 
    for (let index = 0; index < numberOfImages; index++) {
        const name = names[index], description = descriptions[index]
        if (!description.includes(name)) {
            console.log("Name don't include in the description");
            return false;
        }
    }
    return true;

}

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
    // console.log(`storing file(s) from ${path}`)
    // const cid = await client.storeDirectory(files)
    // console.log({ cid })

    // const status = await client.status(cid)
    // console.log(status)
    let cid = "bafybeiajefzt7jg5pttoxbs7hnm2czmu7onplsngpcz7e6oe53ohiflodu";
    baseIpfsLink = 'https://' + cid + '.ipfs.nftstorage.link';

    let index = 0;
    for await (const f of files) {        
        const imageLink = baseIpfsLink + f['name'];
        const metaDataObj = {
            name: nftNames[index],
            description: nftDescriptions[index],
            image: imageLink
        }
        const json = JSON.stringify(metaDataObj);
        const jsonDirectoryPath = path.join(__dirname, 'jsons', (index+'.json'));

        fs.writeFileSync(jsonDirectoryPath, json, 'utf8');
        index++;
    }

}

if (namesAndDescriptionsValid) {
    main()
}
else{
    console.log("Name and/or description and/or image lists are invalid.");
}

