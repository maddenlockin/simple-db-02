/* eslint-disable indent */

import { rm, mkdir } from 'fs/promises';
import { SimpleDB } from '../s-d';


describe('simple database api', () => {
    //set up root directory
    const destination = '../dest';

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
            .then((id) => {
                expect(id).toEqual(expect.any(String));
            });
    });

    it('saves and retrieves an object from the database', () => {
        const savedItem = new SimpleDB(destination);
        //const getItem = new SimpleDB(id);
        const firstItem = {
            category: 'shelter',
            type: 'tent',
            material: 'canvas',
        };

        return savedItem
            .save(firstItem)
            .then(() => {
                return savedItem.get(firstItem.id).then((res) => {
                    expect(res).toEqual({
                        id: expect.any(String),
                        category: 'shelter',
                        type: 'tent',
                        material: 'canvas',
                    });
                });
            });
    });

    it('should return null if no object was returned', () => {
        const getInstance = new SimpleDB(destination);
    
        return getInstance.get().then((res) => {
        expect(res).toBeNull();
        });
    });

    it('should return all objects in the database', () => {
        const database = new SimpleDB(destination);
        const allItems = [
            { 
                category: 'shelter',
                type: 'tent',
                material: 'canvas', 
            },
            { 
                category: 'shelter',
                type: 'house',
                material: 'brick',
            },  
        ];
        allItems.forEach((item) => database.save(item));
        return database.getAll().then((res) => {
            expect(new Set(res)).toEqual(
                new Set([
                    {
                        id: expect.any(String),
                        category: 'shelter',
                        type: 'tent',
                        material: 'canvas',
                    },
                    {
                        id: expect.any(String),
                        category: 'shelter',
                        type: 'house',
                        material: 'brick',
                    },
                ])
            );
        });
    });
});

