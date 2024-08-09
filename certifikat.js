const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
  path.resolve(__dirname, "TemplateSertifikat.docx"),
  "binary"
);

const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

doc.render({
  nama: "John",
  no: "0652455478",
});

const buf = doc.getZip().generate({
  type: "nodebuffer",
  compression: "DEFLATE",
});
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
