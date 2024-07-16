const fs = require('node:fs/promises');
const path = require('node:path');

const pathToDb = path.join(process.cwd(), 'db.json');
module.exports = {
    read: async ()=>{
        const json = await fs.readFile(pathToDb, 'utf-8');
        return json ? JSON.parse(json) : [];
    },
    write: async (users) => {
        await fs.writeFile(pathToDb, JSON.stringify(users));
    }
}