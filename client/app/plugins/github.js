class Github {
    constructor(username, password) {
        this.url = 'https://github.com/login';
        this.username = username;
        this.password = password;
    }

    getUsernameInput() {
        return 'document.querySelector("input[id=\'login_field\']")';
    }

    setUsernameInput() {
        return `${this.getUsernameInput()}.value = "${this.username}"`;
    }

    getPasswordInput() {
        return 'document.querySelector("input[id=\'password\']")';
    }

    setPasswordInput() {
        return `${this.getPasswordInput()}.value = "${this.password}"`;
    }

    getForm() {
        return `${this.getUsernameInput()}.parentNode.parentNode`;
    }

    releaseForm() {
        return `${this.getForm()}.submit()`
    }
}

module.exports = Github