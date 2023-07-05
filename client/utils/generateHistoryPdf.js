import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => {
        sum += item.quantity * item.price;
    });
    return sum.toFixed(2);
};

export default function generatePdf(backupItems) {
    const tableRows = backupItems.map((item) => [
        { text: item.Naziv, style: 'products',alignment: "center" },
        { text: item.Naziv_Vrste, style: 'products',alignment: 'center' }, // Include item's name
        { text: item.Cijena.toFixed(2)+'€', style: 'products', alignment: "center" },
        { text: item.Datum_izmjene.toString().split("T")[0], style: 'products', alignment: "center" },
    ]);

    const documentDefinition = {
        content: [
            {
                text: "Prethodne verzije",
                style: "documentHeading",
                alignment: "center",
                margin: [0, 0, 0, 10]
            },
            {
                style: "table",
                table: {
                    headerRows: 1,
                    widths: ["*", "*", "*", '*'],
                    body: [
                        [
                            { text: "Naziv", style: "tableHeader", alignment: "center" },
                            { text: "Vrsta", style: "tableHeader", alignment: "center" },
                            { text: "Cijena", style: "tableHeader", alignment: "center" },
                            { text: "Datum izmjene", style: "tableHeader", alignment: "center" },
                        ],
                        ...tableRows,
                    ],
                },
            },
        ],
        styles: {
            documentHeading: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                margin: [0, 5, 0, 5],
            },
            products: {
                margin: [0, 5, 0, 5]
            }
        },
        defaultStyle: {
            fontSize: 10,
            bold: false,
        },
    };


    pdfMake.createPdf(documentDefinition).open();
}