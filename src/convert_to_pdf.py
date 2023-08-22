import os
import sys

from docx2pdf import convert

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: Convert Python <input_docx_path>")
        sys.exit(1)

    INPUTFILE = sys.argv[1]
    file_name_without_extension = os.path.splitext(
        os.path.basename(INPUTFILE))[0]
    output_pdf_name = f"{file_name_without_extension}.pdf"
    output_pdf_path = os.path.join('../files/certificate', output_pdf_name)

    convert(INPUTFILE)
    print(f"Converte Success")
