require("dotenv").config();
const { NFTStorage } = require('nft.storage')
const { NFTStorage, File, Blob } = require('nft.storage')

const nftStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: nftStorageToken })