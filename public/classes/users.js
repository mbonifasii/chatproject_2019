class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, cell) {
        let user = { id, name, cell }

        this.users.push(user);

        return this.users;
    }

    getUser(id) {

        let searchUser = this.users.filter(user => user.id === id)[0];

        return searchUser;
    }

    deleteUser(id) {

        let userEliminated = this.getUser(id);

        this.users = this.users.filter(user => user.id != id);

        return this.users;
    }

    getUsers() {
        let returnArrayUsers = new Array();
        for (let index = 0; index < this.users.length; index++) {
            returnArrayUsers.push(this.users[index]);
        }
        return returnArrayUsers;
    }

}

module.exports = {
    Users
};