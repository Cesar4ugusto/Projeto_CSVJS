import { Request, Response, Router } from "express";
import multer from 'multer';
import { Readable } from 'stream'
import readline from "readline";

const multerConfig = multer()
const router = Router();

router.post("/products", multerConfig.single("file"), async (req: Request, res: Response) => {
    const { file } = req;

    const readableFile = new Readable();
    readableFile.push(file?.buffer);
    readableFile.push(null);

    const csvline = readline.createInterface({
        input: readableFile,
    })

    for await (let line of csvline) {
        const csvsplit = line.split(";")
        const csvoptionsplit = csvsplit[3].split("-")
        console.log(`${csvoptionsplit[2]}`);
        console.log(`${csvoptionsplit[2]}`);
    }

    // console.log(req.file?.buffer.toString("utf-8"))
    return res.send()
})

export { router };