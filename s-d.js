import path from 'path/posix';
import { writeFile } from 'fs/promises';
import shortid from 'shortid';
/* eslint-disable indent */

export class SimpleDB {
    constructor(destination) {
        const fileName = `${shortid.generate()}.txt`;
        this.newFile = path.join(destination, fileName);
    }
    save(item) {
        return writeFile(this.newFile, item);
    }

}









// const actions = fsPromises
    //.readFile('file-name.mg, 'utf8')
    //.then()
    //.then()
    //.then()

