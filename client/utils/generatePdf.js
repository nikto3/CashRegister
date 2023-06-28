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

export default function generatePdf(billItems) {
    const tableRows = billItems.map((item) => [
        { text: item.quantity.toString(), alignment: "center" },
        { text: item.name, alignment: 'center' }, // Include item's name
        { text: item.price.toFixed(2)+'€', alignment: "center" },
    ]);

    const documentDefinition = {
        content: [
            {
                text: "Račun",
                style: "documentHeading",
                alignment: "center",
                margin: [0, 0, 0, 10]
            },
            {
                style: "table",
                table: {
                    headerRows: 1,
                    widths: ["auto", "*", "auto"],
                    body: [
                        [
                            { text: "Kolicina", style: "tableHeader", alignment: "center" },
                            { text: "Naziv", style: "tableHeader", alignment: "center" },
                            { text: "Cijena", style: "tableHeader", alignment: "center" },
                        ],
                        ...tableRows,
                        [
                            { text: "Ukupno:", style: "totalLabel", colSpan: 2, alignment: "left" },
                            {},
                            { text: calculateTotal(billItems)+'€', style: "totalAmount", alignment: "right" },
                        ],
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
                margin: [0, 5, 0, 10],
            },
            totalLabel: {
                bold: true,
                fontSize: 14,
                alignment: "right",
            },
            totalAmount: {
                bold: true,
                fontSize: 14,
                alignment: "right",
                decoration: "underline",
            }
        },
        defaultStyle: {
            fontSize: 10,
            bold: false,
        },
    };


    pdfMake.createPdf(documentDefinition).open();
}