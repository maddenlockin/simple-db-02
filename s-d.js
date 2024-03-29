import path from 'path/posix';
import { readFile, writeFile, readdir } from 'fs/promises';
import shortid from 'shortid';
/* eslint-disable indent */

export class SimpleDB {
    constructor(destination) {
        this.path = destination;
    }
    getPath(id) {
        const fileName = `${id}.json`;
        const getPath = path.join(this.path, fileName);
        return getPath;
    }
    save(item) {
        item.id = shortid.generate();
        const fileName = `${item.id}.json`;
        const dest = path.join(this.path, fileName);
        return writeFile(dest, JSON.stringify(item)).then(() => {
            return fileName;
        });
    }

    get(id) {
        const getFile = this.getPath(id);
        return readFile(getFile, 'utf-8')
            .then((res) => JSON.parse(res))
            .catch((err) => {
            if (err.code === 'ENOENT') 
                return null;
            throw err;
        });
    }
    
    getAll() {
        return readdir(this.path).then((files) => {
            return Promise.all(
                files.map((file) => {
                    const getAllFiles = file.split('.');
                    return this.get(getAllFiles[0]);
                })
            );
        
        });
    }
}
