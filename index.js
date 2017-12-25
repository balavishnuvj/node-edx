const path = require('path')
const uuidv1 = require('uuid/v1')
const fs = require('fs')
const csv=require('csvtojson')

const convertedFolder = 'converted';
const pathToConvert = path.join(__dirname, convertedFolder);
if (!fs.existsSync(pathToConvert)){
    fs.mkdirSync(pathToConvert);
}
let json = [];

const convertCSVtoJSON = (filePath = 'customer-data.csv') => {
    const fileExtension = path.extname(filePath);
    const fileName = path.basename(filePath, fileExtension);
    if (fileExtension === '.csv') {
        csv()
        .fromFile(filePath)
        .on('json',(jsonObj)=>{
            json.push(jsonObj);
        })
        .on('done',(error)=>{
            if (error) return console.log(error)
            const folderName = uuidv1()
            fs.mkdirSync(path.join(pathToConvert, folderName))
            let jsonString = '';
            try {
                jsonString = JSON.stringify(json)
            }
            catch(err) {
                console.log(err)
            }
            fs.writeFileSync(path.join(pathToConvert, folderName, `${fileName}.json`), jsonString)
            console.log('Converting is done in folder ', folderName)
        })
    } else {
        console.error('Only CSV file type supported')
    }
}

convertCSVtoJSON(process.argv[2]);