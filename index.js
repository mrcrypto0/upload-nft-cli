import { NFTStorage } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'
import * as pathModule from 'path';

import { exit } from 'process';

//Please write NFT storage API Access Token to "const token" variable.
//Token Example: NFT storage
const token = '';

async function main() {

    if( token == '' ) {
        console.log("please set your NFT storage API token");
        return ;
    }

    const path = "./assets"; //Please paste the images to this folder.
    const files = await getFilesFromPath(path);
    
    for(var i = 0; i < files.length; i++ )
      files[i].name = pathModule.basename(files[i].name);

    const storage = new NFTStorage({ token })

    console.log(`storing ${files.length} file(s) from ${path}`)
    
    const cid = await storage.storeDirectory(files, {

        pathPrefix: path, // see the note about pathPrefix below
        hidden: true //hidden property
    })

    console.log({ cid })

    const status = await storage.status(cid)
    console.log(status)// view the status
}

main()
