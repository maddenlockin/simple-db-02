//import ;
/* eslint-disable indent */

import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../s-d';

describe('routes for simple database api', () => {
    //set up root directory
    const destination = './__tests__/dest/';

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

});
