const PDFDocument = require('pdfkit');
const bairroModel = require('../models/bairroModel'); 

const exportBairrosPdf = async (req, res) => {
    try {
        console.log("Iniciando a geração do PDF dos bairros...");
        const bairros = await bairroModel.getBairros();
        console.log("Bairros retornados para o PDF:", bairros);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=bairros.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fillColor('#FF8C00') 
        .font('Helvetica-Bold') 
        .fontSize(20)
        .text('Lista de Bairros', { align: 'center' });
        doc.moveDown();

        // Cabeçalho 
        doc.rect(50, doc.y, 500, 20) 
            .fill('#f0f0f0') 
            .stroke(); 

        doc.fill('#000') 
            .font('Helvetica')
            .fontSize(12)
            .text('ID | Nome | Cidade | Estado', 55, doc.y + 5, { align: 'left' }); 
        doc.moveDown(2);

        // Dados dos bairros 
        bairros.forEach(bairro => {
            doc.text(`${bairro.id} | ${bairro.nome} | ${bairro.cidade} | ${bairro.estado}`, { align: 'left' });
            doc.moveDown(); 
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF dos bairros:", error);
        res.status(500).json({ message: "Erro ao gerar pdf dos bairros" });
    }
};

module.exports = { exportBairrosPdf };