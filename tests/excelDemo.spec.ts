import {expect, test} from "playwright/test";

const excelts = require('exceljs');

async function writeExcel(searchText: any, replaceText: any, change: any, filePath: string) {
    
    const workbook = new excelts.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output:any = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.col+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet: any, searchText: any) {

    let output: any = {row:1, col:1};
     worksheet.eachRow((row: any, rowNumber: any) => {
        row.eachCell((cell: any, colNumber: any) => {
            if(cell.value === searchText) {
                console.log(`Found '${searchText}' at Row: ${rowNumber}, Column: ${colNumber}`);
                output.row = rowNumber;
                output.col = colNumber;
            }
        });
    });
    return output;
}

//writeExcel("Banana",350,{rowChange:0,colChange:2},"C:\\Users\\Deepa\\Downloads\\exceldownload.xlsx");
test("Upload Download Excel", async ({page}) => {
    
    const searchText = "Mango";
    const updatedValue:any = 450;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcel(searchText,updatedValue,{rowChange:0,colChange:2},"C:\\Users\\Deepa\\Downloads\\download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:\\Users\\Deepa\\Downloads\\download.xlsx");
    const textLocator = await page.getByText(searchText);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue.toString());
});