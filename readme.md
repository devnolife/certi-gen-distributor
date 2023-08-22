# Certificate Generation and Distribution Script 📜🚀

Automate the process of generating certificates, converting them to PDF, and sending them via WhatsApp. This script leverages **Node.js**, **Python**, and the **WhatsApp Web API** to streamline the process of generating and distributing certificates to participants.

## Prerequisites 🛠️

- **Node.js** and **npm** installed on your machine.
- **Python** installed on your machine for PDF conversion.
- WhatsApp Web account and phone number.

## Installation ⚙️

1. Clone this repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the required dependencies.

## Usage 🚀

1. Prepare your Excel file with participant information. The Excel file should contain columns for email addresses and phone numbers.
2. Customize the Word template for certificate generation and place it in the appropriate folder.
3. Update the necessary configuration and paths in the script files (`app.js`, `getDataFromExcel.js`, `generateCertificate.js`, `deleteFileByName.js`, `sendCertificate.js`, and `whatsapp.js`).
4. Run the script using the command: `npm start`.

## Configuration ⚙️

- Update participant data path and columns in `getDataFromExcel.js`.
- Customize certificate generation in `generateCertificate.js`.
- Configure WhatsApp session and sending in `whatsapp.js`.

## How It Works 🔄

1. The script reads participant data from an Excel file.
2. Certificates are generated using a Word template and customized data.
3. Word documents are converted to PDF using Python.
4. PDF certificates are sent to participants via WhatsApp.

## About devnolife 💡

This project is developed and maintained by **devnolife**, a passionate developer dedicated to creating useful and innovative solutions for the community. Check out [devnolife's GitHub](https://github.com/devnolife) for more projects and contributions.

## License 📜

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp Web API wrapper for Node.js.
- [xlsx](https://github.com/sheetjs/sheetjs) - Excel file reader and writer for JavaScript.
- [docxtemplater](https://github.com/open-xml-templating/docxtemplater) - Template-based docx generation library.
