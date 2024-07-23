const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const ac = new AbortController();
const { signal } = ac;

async function setupFileWatcher(mongoDbCollection, sportDbCollection, directoryPath) {
    const col = mongoDbCollection;
    const sports = sportDbCollection;

    async function readAndWriteData(filename) {
        const rawData = await fs.readFile(path.resolve(`${directoryPath}/${filename}`));
        let parsedData = JSON.parse(rawData);
        if (!Array.isArray(parsedData)) parsedData = [parsedData];
        for (let i = 0; i < parsedData.length; i++) {
            const data = parsedData[i];
            const result = await col.updateOne(
                { username: data.username },
                {
                    $setOnInsert: {
                        username: data.username,
                        password: crypto.createHash("sha256").update(data.password).digest("hex"),
                        isAdmin: false,
                        activeSports: data.activeSports,
                    },
                },
                { upsert: true }
            );
            if (result.upsertedCount == 0) continue;
            for (let j = 0; j < data.activeSports.length; j++) {
                await sports.updateOne({ name: data.activeSports[j].toLowerCase() }, { $inc: { members: 1 } });
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
