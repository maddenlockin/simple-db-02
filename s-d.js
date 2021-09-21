import path from 'path/posix';
import { readFile, writeFile } from 'fs/promises';
import shortid from 'shortid';
/* eslint-disable indent */

export class SimpleDB {
    constructor(destination) {
        this.path = destination;
    }

    save(item) {
        item.id = shortid.generate();
        const fileName = `${item.id}.json`;
        const dest = path.join(this.path, `${item.id}.json`);
        return writeFile(dest, JSON.stringify(item)).then(() => {
            return fileName;
        });
    }

    get(id) {
        const getFile = path.join(this.path, id);
        return readFile(getFile).then((res) => {
            return JSON.parse(res);
        })
        .catch(() => {
            return null;
        });
    }

    getAll() {

    }

}









// const actions = fsPromises
    //.readFile('file-name.mg, 'utf8')
    //.then()
    //.then()
    //.then()

