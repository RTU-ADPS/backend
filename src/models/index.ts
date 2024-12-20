import {Sequelize} from 'sequelize';
import {createAddressModel} from "./address";
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

AccountHolder.hasMany(PaymentOption);

PaymentOption.hasOne(Account);
PaymentOption.hasOne(DebitCard);

Account.hasMany(DebitCard);

PaymentOption.hasMany(Transaction);
Transaction.belongsTo(PaymentOption);


console.log("Database & tables created!");

export {sequelize, Address, Account, AccountHolder, DebitCard, PaymentOption, Transaction};
