import {IncomingMessage} from "http";
import formidable from 'formidable';
import {Hotel} from "../../hotel";
import * as fs from 'fs';

export default defineEventHandler(async (event) => {
    try {
        //Picks form from request, then takes file from it and saves it on server as "hotels.json"
        await handleRequest(event.node.req).then(

            //After saving file pushes data into mongoDB
            async function () {

                //loads hotels from file
                const hotels = JSON.parse(fs.readFileSync('data/hotels.json', 'utf-8'));

                try {
                    if(await Hotel.count() === 0) {
                        await Hotel.insertMany(hotels);
                    } else {
                        await Hotel.updateMany( { "id": { "$eq": "id" } }, { "$set": hotels } );
                    }
                    console.log('Done!');
                } catch(e) {
                    console.log(e);
                }
            }
        );

        return { ok: true };
    } catch (e) {
        return { e };
    }
});

function handleRequest(req: IncomingMessage) {
    return new Promise((resolve, reject) => {

        //Formidable initial config
        const form = formidable({
            multiples: true,
            encoding: "utf-8",
            uploadDir: "data",
            filename: () => { return "hotels.json" },
        });

        //Here file is being parsed by Formidable
        form.parse(req, (error: any, fields: any, files: any) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ ...fields, ...files });
        });
    });
}
