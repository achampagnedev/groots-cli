var
    fs = require('fs'),
    child = require('child_process');

module.exports = {

    fileExists: (file, successCb, failCb) => {

        fs.access(file, fs.F_OK, (err) => {

            if (!err) {

                successCb();

            } else {

                failCb();

            }

        });

    }

};