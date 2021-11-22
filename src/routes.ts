import { Request, Response, Router } from "express";
import fs from "fs"
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
        fs.writeFileSync("programming.txt",
            "Esses são os produtos " + csvsplit[1] + "\nEsses são os respectivos preços" + csvsplit[2] + "\n", {
            encoding: "utf8",
            flag: "a+",
            mode: 0o666
        })
    }

    return res.send();
})

export { router };