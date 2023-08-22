const xlsx = require('xlsx');
const path = require('path');

async function getDataFromExcel(columnIndex) {
    const excelFilePath = path.resolve(__dirname, '../files/participant/partisipan.xlsx');
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    const emails = [];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const cellAddress = xlsx.utils.encode_cell({ r: row, c: columnIndex });
        const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : '';
        const cleanedValue = cellValue.trim().replace(/ /g, '');
        if (cleanedValue  !== '') {
            emails.push(cleanedValue );
        }
    }
    
    return emails;
}

module.exports = getDataFromExcel;
