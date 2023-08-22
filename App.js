const path = require('path');
const getDataFromExcel = require('./src/getDataFromExcel');
const generateCertificate = require('./src/generateCertificate');
const deleteFileByName = require('./src/deleteFileByName');
const sendCertificate = require('./src/sendCertificate');
const {  MessageMedia } = require('whatsapp-web.js');
const client = require('./src/wa');
const { spawn } = require('child_process');
(async () => {
    try {
        const emails = await getDataFromExcel(7);
        const numbers = await getDataFromExcel(1);

        for (const email of emails) {
            const pdfFilePath = await generateCertificate(email);
            console.log(`Certificate generated: ${pdfFilePath}`);
            await sendCertificate({ first_name: 'Andi', last_name: 'Agung', emailUser: email }, pdfFilePath);
            const pythonScriptPath = path.join(__dirname, 'convert_to_pdf.py');
            const pythonProcess = spawn('python', [pythonScriptPath, pdfFilePath]);
            pythonProcess.stdout.on('data', (data) => {
                console.log(`Python Output: ${data}`);
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`Python Error: ${data}`);
            });

            pythonProcess.on('close', async (code) => {
                if (code === 0) {
                    console.log(`PDF conversion successful for ${email}`);
                    deleteFileByName(pdfFilePath, `${email}.word`);
                    console.log(`Word file deleted for ${email}`);

                    const index = emails.indexOf(email); // Dapatkan indeks email
                    const phoneNumber = numbers[index]; // Ambil nomor telepon sesuai dengan indeks
                    const chat = await client.getChatById(phoneNumber + '@c.us');
                    const media = new MessageMedia('application/pdf', pdfFilePath);
                    chat.sendMessage(media, { caption: 'Ini adalah sertifikat Anda' });
                    console.log(`Certificate sent via WhatsApp for ${email}`);
                } else {
                    console.error(`PDF conversion failed for ${email}`);
                }
            });
        }
        console.log(`Certificate Successfully Generated`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
