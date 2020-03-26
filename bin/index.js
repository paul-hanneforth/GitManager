#!/usr/bin/env node

const { login, loadAccounts, editAccount, removeAccount, addAccount } = require("./../lib/index.js")
const { helpText, listAccountsText, switchAccountText, addAccountText, removeAccountText, editAccountText } = require("./config.js"):
const { File } = require("fileger")

const accountsPath = __dirname + "/accounts.json"

const parseArguments = async () => {

    const passedArguments = (process.argv);
    passedArguments.splice(0, 2)

    if(passedArguments[0] == "help" || passedArguments[0] == null) {

        console.log(helpText)

    } else if(passedArguments[0] == "list") {

        const accounts = await loadAccounts(accountsPath);

        accounts.forEach((account) => {
            console.log(account[0])
        })
        console.log("");
        console.log(listAccountsText)

    } else if(passedArguments[0] == "switch") {
        
        const username = passedArguments[1];
        const accounts = await loadAccounts(accountsPath);

        accounts.forEach(async (account) => {
            if(account[0] == username) {
                const success = await login(account[0], account[1]);
                if(success) {
                    console.log(switchAccountText.success)
                } else {
                    console.log(switchAccountText.failure)
                }
            }
        })

    } else if(passedArguments[0] == "add") {

        const username = passedArguments[1];
        const password = passedArguments[2];

        const success = await addAccount(accountsPath, username, password);

        if(success) {
            console.log(addAccountText.success);
        } else {
            console.log(addAccountText.failure);
        }

    } else if(passedArguments[0] == "remove") {

        const username = passedArguments[1];

        const success = await removeAccount(accountsPath, username);

        if(success) {
            console.log(removeAccountText.success);
        } else {
            console.log(removeAccountText.failure);
        }

    } else if(passedArguments[0] == "edit") {

        const username = passedArguments[1];
        const password = passedArguments[2];

        const success = await editAccount(accountsPath, username, password);

        if(success) {
            console.log(editAccountText.success);
        } else {
            console.log(editAccountText.failure);
        }

    }

}

parseArguments();