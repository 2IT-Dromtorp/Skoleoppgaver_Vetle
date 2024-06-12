const fs = require("node:fs/promises");
const path = require("node:path");
const { MongoClient } = require("mongodb");

const ac = new AbortController();
const { signal } = ac;

async function setupFileWatcher(mongoDbUrl, mongoDbDatabase, mongoDbCollection, directoryPath) {
    const client = await MongoClient.connect(mongoDbUrl);
    const db = client.db(mongoDbDatabase);
    const col = db.collection(mongoDbCollection);

    async function readAndWriteData(filename) {
        const rawData = await fs.readFile(path.resolve(`${directoryPath}/${filename}`));
        let parsedData = JSON.parse(rawData);
        if (!Array.isArray(parsedData)) parsedData = [parsedData];
        for (let i = 0; i < parsedData.length; i++) {
            const data = parsedData[i];
            const product = await col.findOne({ name: data.name });
            if (product) {
                await col.updateOne({ name: data.name }, { $inc: { amount: data.amount } });
            } else {
                await col.insertOne({ ...data, price: undefined });
            }
        }
        await fs.rm(path.resolve(`${directoryPath}/${filename}`), { force: true });
    }

    const allFiles = await fs.readdir(path.resolve(`${directoryPath}`));
    for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        if (!file.endsWith(".json")) continue;
        await readAndWriteData(file);
    }
    try {
        const watcher = fs.watch(path.resolve(`${directoryPath}`), { signal });
        for await (const event of watcher) {
            setTimeout(async () => {
                const allFiles = await fs.readdir(path.resolve(`${directoryPath}`));
                for (let i = 0; i < allFiles.length; i++) {
                    const file = allFiles[i];
                    if (!file.endsWith(".json")) continue;
                    await readAndWriteData(file);
                }
            }, 1000);
        }
    } catch (err) {
        if (err.name === "AbortError") return;
        throw err;
    }
}

module.exports = { setupFileWatcher };
