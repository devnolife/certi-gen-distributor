from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from pdfrw import PdfReader, PdfWriter, PageMerge

def generate_certificate(name, certificate_no, template_path, output_path):
    # Create a new canvas
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=letter)
    width, height = letter

    # Define fonts (ubah sesuai dengan font yang Anda miliki)
    c.setFont("Helvetica-Bold", 60)  # Placeholder untuk HammersmithOne
    c.drawCentredString(width / 2, height - 200, "SERTIFIKAT")

    c.setFont("Helvetica", 50)  # Placeholder untuk BrittanySignature
    c.drawCentredString(width / 2, height - 400, name)

    c.setFont("Helvetica", 30)  # Placeholder untuk PlayfairDisplay
    c.drawString(50, 100, f"NO: {certificate_no}")

    # Draw remaining text
    c.setFont("Helvetica", 20)  # Placeholder untuk PlayfairDisplay
    body_text = (
        'A P R E S I A S I\n'
        '"Menyelesaikan Laboratorium Prodi Informatika\n'
        'Komputasi Bergerak pada tanggal 30 Agustus 2023”\n'
        'L A B O R A N  I N F O R M A T I K A'
    )
    text_object = c.beginText(width / 2, height - 500)
    for line in body_text.split('\n'):
        text_object.textLine(line)
    c.drawText(text_object)

    c.save()

    # Move to the beginning of the StringIO buffer
    packet.seek(0)

    # Create a new PDF with Reportlab
    new_pdf = PdfReader(packet)

    # Read the template PDF
    template_pdf = PdfReader(template_path)
    for page in template_pdf.pages:
        overlay = new_pdf.pages[0]
        PageMerge(page).add(overlay).render()

    # Write the output
    PdfWriter(output_path, trailer=template_pdf).write()

# Path ke template sertifikat
template_path = "TemplateSertifikat.pdf"

# Data sertifikat
data = [
    {"name": "Agung", "certificate_no": "67/20/B.5-II/IV/45/2024"},
    {"name": "Budi", "certificate_no": "67/21/B.5-II/IV/45/2024"},
    {"name": "Siti", "certificate_no": "67/22/B.5-II/IV/45/2024"}
]

# Generate sertifikat untuk setiap entri dalam data
for entry in data:
    name = entry["name"]
    certificate_no = entry["certificate_no"]
    output_path = f"certificate_{name}.pdf"
    generate_certificate(name, certificate_no, template_path, output_path)
