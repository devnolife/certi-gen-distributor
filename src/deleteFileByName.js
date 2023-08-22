const fs = require('fs');
const path = require('path');

async function deleteFileByName(folderPath, fileName) {
    const filePath = path.join(folderPath, fileName);

    if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
            console.error(`${filePath} is a directory. Use deleteFolderContents to delete directories.`);
            return;
        } else {
            fs.unlinkSync(filePath);
            console.log(`File ${fileName} has been deleted.`);
        }
    } else {
        console.error(`File ${fileName} does not exist.`);
    }
}

module.exports = deleteFileByName;
