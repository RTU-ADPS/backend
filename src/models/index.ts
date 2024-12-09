import {Sequelize} from 'sequelize';
import {createUserModel} from './user';
import {createAddressModel} from "./address";
import {setDefaultHighWaterMark} from "node:stream";
import {createAccountModel} from "./account";
import {createAccountHolderModel} from "./account-holder";
import {createDebitCardModel} from "./debit-card";
import {createPaymentOptionModel} from "./payment-option";
import {createTransactionModel} from "./transaction";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const Address = createAddressModel(sequelize);
const Account = createAccountModel(sequelize);
const AccountHolder = createAccountHolderModel(sequelize);
const DebitCard = createDebitCardModel(sequelize);
const PaymentOption = createPaymentOptionModel(sequelize);
const Transaction = createTransactionModel(sequelize);

Address.hasMany(AccountHolder);
AccountHolder.hasOne(Address);

AccountHolder.hasMany(PaymentOption);
PaymentOption.hasMany(AccountHolder);

PaymentOption.hasOne(Account);
PaymentOption.hasOne(DebitCard);

Account.hasMany(DebitCard);

PaymentOption.hasMany(Transaction);
Transaction.belongsTo(PaymentOption);


console.log("Database & tables created!");

export {sequelize, Address, Account, AccountHolder, DebitCard, PaymentOption, Transaction};
