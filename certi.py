from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
import pdfkit
from pdf2image import convert_from_path

# Fungsi untuk membuat PDF dengan gambar latar belakang dan teks HTML
def create_pdf_with_background(background_image, html_file, output_pdf):
    # Buat canvas dengan gambar latar belakang dalam mode landscape
    c = canvas.Canvas('temp_canvas.pdf', pagesize=landscape(A4))
    width, height = landscape(A4)

    # Tambahkan gambar latar belakang
    c.drawImage(background_image, 0, 0, width=width, height=height)
    c.save()

    # Konversi HTML ke PDF sementara
    pdfkit.from_file(html_file, 'temp_content.pdf')

    # Baca PDF sementara
    background_pdf = PdfReader('temp_canvas.pdf')
    content_pdf = PdfReader('temp_content.pdf')
    output = PdfWriter()

    # Ambil halaman dari masing-masing PDF
    background_page = background_pdf.pages[0]
    content_page = content_pdf.pages[0]

    # Gabungkan halaman konten ke halaman latar belakang
    background_page.merge_page(content_page)
    output.add_page(background_page)

    # Simpan PDF hasil akhir
    with open(output_pdf, 'wb') as f:
        output.write(f)

# Panggil fungsi untuk membuat PDF dengan latar belakang dan konten HTML dalam mode landscape
create_pdf_with_background('background_page.png', 'input.html', 'final_output.pdf')

# Konversi hasil PDF ke PNG
images = convert_from_path('final_output.pdf')

# Simpan hasil konversi ke PNG (jika ada lebih dari satu halaman, ini akan menyimpan semua halaman sebagai gambar)
for i, image in enumerate(images):
    image.save(f'final_output_page_{i+1}.png', 'PNG')
