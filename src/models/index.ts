import {Sequelize} from 'sequelize';
import {createUserModel} from './user';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const User = createUserModel(sequelize);


console.log("Database & tables created!");

export {sequelize, User};
