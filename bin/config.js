const helpText = `usage: gitmanager <command> [<args>]

gitmanager help
gitmanager list
gitmanager switch [username]
gitmanager add [username] [password]
gitmanager remove [username]
gitmanager edit [username, password]`

const listAccountsText = `To switch to another account use:
gitmanager switch [username]`

const switchAccountText = {
    success: "Successfully switched accounts!",
    failure: "Account couldn't be found!"
}
const addAccountText = {
    success: "Successfully added account!",
    failure: "Account couldn't be added!"
}
const removeAccountText = {
    success: "Successfully removed account!",
    failure: "Account couldn't be removed!"
}
const editAccountText = {
    success: "Successfully edited accounts!",
    failure: "Account couldn't be edited!"
}

module.exports = {
    helpText,
    listAccountsText,
    switchAccountText,
    addAccountText,
    removeAccountText,
    editAccountText
}