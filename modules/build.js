var
    fs = require('fs'),
    path = require('path'),
    yesno = require('yesno'),
    child = require('child_process'),
    hlp = require('./helpers');

module.exports = {

    install: (url, dirName) => {

        hlp.fileExists(dirName, () => {

            console.log(`${dirName} is already installed.`);

        }, () => {

            console.log(`Cloning ${dirName} from ${url} and running 'npm install'...`);

            child.exec(`git clone ${url} ${dirName}`, (err, stdout, stderr) => {

                if (stdout !== '') { console.log(stdout); }
                if (stderr !== '') { console.log(stderr); }

                if (err !== null) {

                    console.log(err);
                    process.exit(1);

                }

                console.log(`Running 'npm install'...`);

                child.exec(`cd ${dirName} && npm install`, (err, stdout, stderr) => {

                    if (stdout !== '') { console.log(stdout); }
                    if (stderr !== '') { console.log(stderr); }

                    if (err !== null) {

                        console.log(err);
                        process.exit(1);

                    }
                });

            });

        });

    },

    update: (url, dirName) => {

        hlp.fileExists(dirName, () => {

            yesno.ask(`Proceed with update (WARNING: This will overwrite all core files)? (Y/n)`, true, (ok) => {

                if (ok) {

                    console.log(`Updating ${dirName} and running 'npm install'.`);

                    child.exec(`cd ${dirName} && git pull origin master && npm install`, (err, stdout, stderr) => {

                        if (stdout !== '') { console.log(stdout); }
                        if (stderr !== '') { console.log(stderr); }

                        if (err !== null) {

                            console.log(err);
                            process.exit(1);

                        } else {

                            console.log(`Updated ${dirName} from ${url}.`);
                            process.exit(1);

                        }

                    });

                } else {

                    console.log(`Canceling update...`);
                    process.exit(1);

                }

            });

        }, () => {

            console.log(`${dirName} is not installed yet. Try running 'groots install' first.`);

        });

    },

    uninstall: (dirName) => {

        hlp.fileExists(dirName, () => {

            yesno.ask(`Proceed with uninstall ? (Y/n)`, true, (ok) =>{

                if (ok) {

                    console.log(`uninstalling...`);

                    child.exec(`cd ${dirName} && rimraf node_modules && rm -rf ${dirName}`, (err, stdout, stderr) => {

                        if (stdout !== '') { console.log(stdout); }
                        if (stderr !== '') { console.log(stderr); }

                        if (err !== null) {

                            console.log(err);
                            process.exit(1);

                        } else {

                            console.log(`${dirName} has been uninstalled.`);
                            process.exit(1);

                        }
                    });

                } else {

                    console.log(`Canceling uninstall...`);
                    process.exit(1);

                }

            });

        }, () => {

            console.log(`${dirName} is not installed.`);

        });

    }

};