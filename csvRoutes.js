const express = require('express');
const csvFile = require('./models/csvFile');
const { parse } = require('csv-parse');
const fileUploader = require('express-fileupload');
const fs = require('fs');
const auth = require('./middlewares/authorization')
const router = express.Router();
router.use(fileUploader({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//csv file uploade route
router.post('/upload', auth, async(req, res) => {
    let myFile = req.files.myCsvFile;
    myFile = fs.readFileSync(myFile.tempFilePath, 'utf-8');
    parse(myFile, { columns: true }, async(err, records) => {
        if (err)
            console.log(err);
        const myCsvFile = new csvFile({ employeesList: records });
        const files = await myCsvFile.save();
        return res.status(201).send(files);
    });
});

module.exports = router;