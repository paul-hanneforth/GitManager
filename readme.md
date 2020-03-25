# GitManager
### The most convenient way to switch GitHub Accounts via Terminal.
## Notices
GitManager currently only supports Windows. Support for other operating systems will come soon.
## Installation
Install `GitManager`via NPM
```sh
npm install -g gitmanager
```

## Usage
### Command-Line
Add a new account
```sh
gitmanager add [username] [password]
```
See all accounts
```sh
gitmanager list
```
Login to an account
```sh
gitmanager switch [username]
```
Remove an account
```sh
gitmanager remove [username]
```
Edit an account
```sh
gitmanager edit [username] [new password]
```

### Module
`GitManager` can also be used as a Module.

First you need to require the module
```js
const gitmanager = require("gitmanager")
```
Then you can make use of the 5 exposed functions `login`, `addAccount`, `removeAccount`, `editAccount`,`loadAccounts`
