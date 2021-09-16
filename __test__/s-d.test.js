//import ;
/* eslint-disable indent */

import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../s-d';
//import { SimpleDB } from '../s-d';

describe('routes for simple database api', () => {
    //set up root directory
    const destination = './dest';

    beforeEach(() => {
        return rm(destination, { force: true, recursive: true })
        .then(() => {
            return mkdir(destination);
        });
    });

    it('assigns an id and saves the object to the database', () => {
        const saver = new SimpleDB(destination);
        const firstItem = {
            category: 'shelter',
            type: 'tent',
            material: 'canvas',
        };

        return saver
            .save(firstItem)
            .then(() => {
                expect(firstItem.id).toEqual(expect.any(String));
            });
    });

    it('saves and retrieves an object from the database', () => {
        const savedItem = new SimpleDB(destination);
        const getItem = new SimpleDB(id);
        const firstItem = {
            category: 'shelter',
            type: 'tent',
            material: 'canvas',
        };

        return savedItem
            .save(firstItem)
            .then(() => {
                return getItem.get();
            })
            .then((booger) => {
                expect(booger).toEqual(firstItem);
            });
    });

    it('should return null if no object was returned', () => {
        const getInstance = new SimpleDB(id);
    
        return getInstance.get().then((booger) => {
        expect(booger).toBeNull();
        });
    });
});

