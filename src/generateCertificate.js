const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs").promises;
const path = require("path");


const generateCerti = async (nama) => {
    const content = await fs.readFile(
        path.resolve(__dirname, `../files/tempSertifikat.docx`),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    await doc.render({
        nama_peserta: nama,
    });
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    let filaName  = `${nama}.docx`;

    const docxOutputPath = path.resolve(__dirname, '../files/certificate/', filaName);
    await fs.writeFile(docxOutputPath, buf);
    return docxOutputPath;
};


module.exports = generateCerti;

    