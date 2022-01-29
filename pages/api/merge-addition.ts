import { NextApiRequest, NextApiResponse } from "next";
import { EMPTY_DRAWING_URI } from "../../config";
import { writeImageFile } from "../../server/server-utils";
import { ADMIN_ST } from "../../server/firebase";
import apiHandler from "../../server/api-middleware";
import sharp from "sharp";
import { v4 } from "uuid";
import fs from "fs";

const handler = apiHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const start = new Date().getTime();
    const additionUrl = req.body.additionUrl;
    const baseUrl = req.body.baseUrl;

    const additionPath = `/tmp/${v4()}.png`;
    const basePath = `/tmp/${v4()}.png`;
    const newBasePath = `/tmp/${v4()}.png`;

    await writeImageFile(additionUrl, additionPath);
    if (baseUrl) {
      await writeImageFile(baseUrl, basePath);
    } else {
      await writeImageFile(EMPTY_DRAWING_URI, basePath);
    }

    await sharp(basePath)
      .composite([{ input: additionPath, gravity: "northwest", top: 0, left: 0 }])
      .toFile(newBasePath);

    const storagePath = `finals/${v4()}.png`;
    await ADMIN_ST.upload(newBasePath, { destination: storagePath });

    fs.rmSync(additionPath);
    fs.rmSync(basePath);
    fs.rmSync(newBasePath);

    const end = new Date().getTime();

    console.log("api done");
    console.log(`${(end - start) / 1000} seconds`);

    res.status(200).send(storagePath);
  } catch (error) {
    console.error({ error });
    res.status(500).send(error);
  }
});

export default handler;
