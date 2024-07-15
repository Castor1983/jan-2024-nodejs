const path = require('node:path');
const fs = require('node:fs/promises');


const foo = async () => {
 try {
  const baseFolderPath = path.join(__dirname, 'baseFolder');
  await fs.mkdir(baseFolderPath, {recursive: true});

  const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
  const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

  await Promise.all(folderNames.map(async (folder)=>{
   const folderPath = path.join(baseFolderPath, folder);
   await fs.mkdir(folderPath, {recursive: true});
   await Promise.all(fileNames.map(async (file)=> {
    await fs.writeFile(path.join(folderPath, file), 'say Hello')
   }))
  }))
 } catch (e) {
  console.error(e.message)
 }
}

void foo()