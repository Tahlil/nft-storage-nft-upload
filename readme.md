# Store NFT related files to NFT Storage
This node app takes the NFT images and corresponding files for names and description as input, upload each images to [NFT.Storge](https://nft.storage/) in a folder and then create the corresponding json files for each NFTs and upload it to a folder and return the base IPFS json file

## Requirements

* Node js
* Git

## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Tahlil/nft-storage-nft-upload.git
cd nft-storage-nft-upload
```

```bash
npm i
```

## Instructions 
1. Store all the images in the `images` folder.
2. Store the NFT names and descriptions in `info/name.txt` and `info/description.txt` files respectively.
3. Create a `.env` file and copy the `.env.example` file to  `.env` file.
4. Create a NFT.storage API token, follow the instructions from [this link](https://nft.storage/docs/#get-an-api-token) to get the token  
5. Set the API token in the `.env` file for the environment variable `NFT_STORAGE_TOKEN`.
6. Run the following command to upload the NFT images and metadata json file. It will print the base folder CID for where all the metadata json files are stored.
```
node index.js
```


### Validity check
There are three validity checks for the NFT info:
1. Check if the number of names and descriptions are same in the corresponding files 
2. Check if number of images in the `images` folder 
3. Check if corresponding name is included in the description


