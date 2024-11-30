import {Sequelize} from 'sequelize';
import {createUserModel} from './user';
import {createAccountHolderModel} from './account-holder';
import {createAddressModel} from './address';
import {createTransactionModel} from './transaction';
import {createTransactionCategoryModel} from './transaction-category';
import {createCurrencyExchangeModel} from './currency-exchange';
import {createNotificationModel} from './notification';
import {createBeneficiaryModel} from './beneficiary';
import {createSpendingAnalysisModel} from './spending-analysis';
import {createSecurityLogModel} from './security-log';
import {createPaymentOptionModel} from './payment-option';
import {createDebitCardModel} from './debit-card';
import {createBankTransferModel} from './bank-transfer';
import {createDigitalWalletModel} from './digital-wallet';
import {createAccountModel} from "./account";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const User = createUserModel(sequelize);
const AccountHolder = createAccountHolderModel(sequelize);
const Address = createAddressModel(sequelize);
const Account = createAccountModel(sequelize);
const Transaction = createTransactionModel(sequelize);
const TransactionCategory = createTransactionCategoryModel(sequelize);
const CurrencyExchange = createCurrencyExchangeModel(sequelize);
const Notification = createNotificationModel(sequelize);
const Beneficiary = createBeneficiaryModel(sequelize);
const SpendingAnalysis = createSpendingAnalysisModel(sequelize);
const SecurityLog = createSecurityLogModel(sequelize);
const PaymentOption = createPaymentOptionModel(sequelize);
const DebitCard = createDebitCardModel(sequelize);
const BankTransfer = createBankTransferModel(sequelize);
const DigitalWallet = createDigitalWalletModel(sequelize);

// Define Associations
// User to AccountHolder (1:1)
User.hasOne(AccountHolder, {foreignKey: 'userId', as: 'accountHolder'});
AccountHolder.belongsTo(User, {foreignKey: 'userId', as: 'user'});

// AccountHolder to Addresses (1:N)
AccountHolder.hasMany(Address, {foreignKey: 'accountHolderId', as: 'addresses'});
Address.belongsTo(AccountHolder, {foreignKey: 'accountHolderId', as: 'accountHolder'});

// AccountHolder to Accounts (1:N)
AccountHolder.hasMany(Account, {foreignKey: 'accountHolderId', as: 'accounts'});
Account.belongsTo(AccountHolder, {foreignKey: 'accountHolderId', as: 'accountHolder'});

// AccountHolder to Notifications (1:N)
AccountHolder.hasMany(Notification, {foreignKey: 'accountHolderId', as: 'notifications'});
Notification.belongsTo(AccountHolder, {foreignKey: 'accountHolderId', as: 'accountHolder'});

// AccountHolder to Beneficiaries (1:N)
AccountHolder.hasMany(Beneficiary, {foreignKey: 'accountHolderId', as: 'beneficiaries'});
Beneficiary.belongsTo(AccountHolder, {foreignKey: 'accountHolderId', as: 'accountHolder'});

// Account to Transactions (1:N)
Account.hasMany(Transaction, {foreignKey: 'accountId', as: 'transactions'});
Transaction.belongsTo(Account, {foreignKey: 'accountId', as: 'account'});

// Account to SpendingAnalysis (1:1)
Account.hasOne(SpendingAnalysis, {foreignKey: 'accountId', as: 'spendingAnalysis'});
SpendingAnalysis.belongsTo(Account, {foreignKey: 'accountId', as: 'account'});

// Account to PaymentOptions (1:N)
Account.hasMany(PaymentOption, {foreignKey: 'accountId', as: 'paymentOptions'});
PaymentOption.belongsTo(Account, {foreignKey: 'accountId', as: 'account'});

// Polymorphic Association for Payment Options
PaymentOption.hasOne(DebitCard, {
    foreignKey: 'paymentOptionId',
    constraints: false,
    scope: {
        paymentOptionType: 'DebitCard'
    }
});
PaymentOption.hasOne(BankTransfer, {
    foreignKey: 'paymentOptionId',
    constraints: false,
    scope: {
        paymentOptionType: 'BankTransfer'
    }
});
PaymentOption.hasOne(DigitalWallet, {
    foreignKey: 'paymentOptionId',
    constraints: false,
    scope: {
        paymentOptionType: 'DigitalWallet'
    }
});

// Transactions to Transaction Categories (N:1)
TransactionCategory.hasMany(Transaction, {foreignKey: 'categoryId', as: 'transactions'});
Transaction.belongsTo(TransactionCategory, {foreignKey: 'categoryId', as: 'category'});

// Transactions to Currency Exchange (Optional 1:1)
Transaction.hasOne(CurrencyExchange, {foreignKey: 'transactionId', as: 'currencyExchange'});
CurrencyExchange.belongsTo(Transaction, {foreignKey: 'transactionId', as: 'transaction'});

// User to Security Logs (1:N)
User.hasMany(SecurityLog, {foreignKey: 'userId', as: 'securityLogs'});
SecurityLog.belongsTo(User, {foreignKey: 'userId', as: 'user'});

// Sync database
sequelize.sync({alter: true})
    .then(() => {
        console.log("Database & tables created/updated!");
    })
    .catch((error) => {
        console.error("Unable to create tables : ", error);
    });

export {
    sequelize,
    User,
    AccountHolder,
    Address,
    Account,
    Transaction,
    TransactionCategory,
    CurrencyExchange,
    Notification,
    Beneficiary,
    SpendingAnalysis,
    SecurityLog,
    PaymentOption,
    DebitCard,
    BankTransfer,
    DigitalWallet,
};
