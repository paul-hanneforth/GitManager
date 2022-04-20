const { exec } = require("child_process");
const { File } = require("fileger");
const  os = require('os');

const login = (username, password) => {
    return new Promise((resolve, reject) => {

        const osPlatform = os.platform();
        const site = "git:https://github.com"

        if (osPlatform == "win32") {
            exec("cmdkey /generic:" + site + " /user:" + username + " /pass:" + password, (error, stdout, stderr) => {

                if (error) reject(error.message);
                if (stderr) reject(stderr)

                resolve(stdout)

            });
        } else if (osPlatform == "darwin" || osPlatform == "linux") {
            exec("git config --global credential.username \"" + username + "\" && git config --global user.name \"" + username + "\" && git config --global user.signingkey \"" + password + "\" && git config credential.username", (error, stdout, stderr) => {
                if (error) reject(error.message);
                if (stderr) reject(stderr);

                resolve(stdout)
            });
        }
    });
}

const addAccount = async (path, username, password) => {

    const file = new File(path);

    if(await file.exists()) {

        const content = await file.read();
        const object = content == "" ? {} : JSON.parse(content)

        if(object.accounts == undefined) object.accounts = [];

        object.accounts.push({"username": username, "password": password})

        file.write(JSON.stringify(object));

        return true;

    } else {
        file.create();
        return false;
    }

}
const removeAccount = async (path, username) => {

    const file = new File(path);

    if(await file.exists()) {

        const content = await file.read();
        const object = content == "" ? {} : JSON.parse(content)

        if(object.accounts == undefined) object.accounts = [];

        const editedObject = {};
        editedObject.accounts = object.accounts.filter((account) => {
            if(account.username == username) {
                return false;
            } else {
                return true;
            }
        })

        file.write(JSON.stringify(editedObject));

        if(editedObject == object) {
            return false;
        } else {
            return true;
        }

    } else {
        file.create();
        return false;
    }

}
const editAccount = async (path, username, password) => {

    const file = new File(path);

    if(await file.exists()) {

        const content = await file.read();
        const object = content == "" ? {} : JSON.parse(content)

        if(object.accounts == undefined) object.accounts = [];

        const editedObject = {}
        editedObject.accounts = object.accounts.map((account) => {
            if(account.username == username) {
                return {
                    "username": username,
                    "password": password
                }
            } else {
                return account;
            }
        })
        file.write(JSON.stringify(editedObject));

        if(editedObject == object) {
            return false;
        } else {
            return true;
        }

    } else {
        file.create();
        return false;
    }

}
const loadAccounts = async (path) => {

    const file = new File(path);

    if(await file.exists()) {

        const content = await file.read();
        const object = content == "" ? {} : JSON.parse(content)

        if(object.accounts == undefined) object.accounts = [];

        const accounts = object.accounts.map(account => [account.username, account.password]);
        return accounts;

    } else {
        file.create();
        return [];
    }

}

module.exports = {
    login,
    addAccount,
    removeAccount,
    editAccount,
    loadAccounts
}