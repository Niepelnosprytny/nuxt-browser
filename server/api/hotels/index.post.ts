import { IncomingMessage } from "http";
import formidable from "formidable";

export default defineEventHandler(async (event) => {
    const body = await handleRequest(event.node.req);

    console.log(body);

    return {ok: true};
});

function handleRequest(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true })
        form.uploadDir = "tmp";
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ ...fields, ...files });
        });
    });
}
