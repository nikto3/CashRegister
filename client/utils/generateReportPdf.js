import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => {
        sum += item.Kolicina * item.Cijena;
    });
    return sum.toFixed(2);
};

export default function generatePdf(billItems) {

    const [drinks, food] = categorizeProducts(billItems);

    const drinkRows = drinks.map(item => [
        { text: item.Kolicina.toString(), alignment: "center", margin: [0, 5, 0, 5] },
        { text: item.Naziv, alignment: 'center', margin: [0, 5, 0, 5] }, // Include item's name
        { text: item.Cijena.toFixed(2)+'€', alignment: "center", margin: [0, 5, 0, 5] },
    ]);

    const foodRows = food.map(item => [
        { text: item.Kolicina.toString(), alignment: "center", margin: [0, 5, 0, 5] },
        { text: item.Naziv, alignment: 'center', margin: [0, 5, 0, 5] }, // Include item's name
        { text: item.Cijena.toFixed(2)+'€', alignment: "center", margin: [0, 5, 0, 5] },
    ])

    const documentDefinition = {
        content: [
            {
                text: "Izvještaj",
                style: "documentHeading",
                alignment: "center",
                margin: [0, 0, 0, 10]
            },
            {
                style: "table",
                table: {
                    headerRows: 3,
                    widths: ["auto", "*", "auto"],
                    body: [
                        [
                            { text: "Kolicina", style: "tableHeader", alignment: "center" },
                            { text: "Naziv", style: "tableHeader", alignment: "center" },
                            { text: "Cijena", style: "tableHeader", alignment: "center" },
                        ],
                        [
                            { text: 'Pice', style: 'tableHeader', colSpan: 3, alignment: 'left'},
                            {},
                            {}
                        ],
                        ...drinkRows,
                        [
                            { text: 'Hrana', style: 'tableHeader', colSpan: 3, alignment: 'left'},
                            {},
                            {}
                        ],
                        ...foodRows,
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
                margin: [0, 5, 0, 5]
            },
            totalAmount: {
                bold: true,
                fontSize: 14,
                alignment: "right",
                decoration: "underline",
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

function categorizeProducts(products){
    const result = [
        [],
        []
    ];

    for (const product of products){
        if (product.Naziv_Kat === 'Pice'){
            result[0].push(product);
        }
        else {
            result[1].push(product);
        }
    }

    return result;
}
