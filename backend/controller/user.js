const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10; // the more greater, the more it longs

// create
const storeAccount = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const type = req.body.type;
    const accountName = req.body.accountName;
    const password = req.body.password;
    const note = req.body.note || null;
    // hash password
    const hashedPasswrod = await bcrypt.hash(password, saltRounds);
    const accountData = {
        type,
        accountName,
        password: hashedPasswrod,
        note
    };
    currentUser.accounts.push(accountData);
    await currentUser.save();
    res
      .status(200)
      .json({
        message: "Success"
      });
  } catch (err) {
    const error = new Error(err);
    error.message = "Can't create account";
    return next(error);
  }
};

// react
const getAllAccounts = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const accounts = currentUser.accounts;
    res
      .status(200)
      .json({
        message: "Success",
        data:{accounts}
      });
  } catch (err) {
    return next(err);
  }
};

// update password
const updateAccountPassword = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const accountId = req.params.id;
    const password = req.body.password;
    // hash password
    const hashedPasswrod = await bcrypt.hash(password, saltRounds);
    const updatedAccount = currentUser.accounts.filter(account => account._id.toString() == accountId ? ({...account, password: hashedPasswrod}) : account);
    currentUser.accounts = updatedAccount;
    await currentUser.save();
    res
      .status(200)
      .json({
        message: "Success"
      });
  } catch (err) {
    return next(err);
  }
};

// delete account
const deleteAccount = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const accountId = req.params.id;
    const removedAccount = currentUser.accounts.filter(account => account._id.toString() !== accountId);
    currentUser.accounts = removedAccount;
    await currentUser.save();
    res
      .status(200)
      .json({
        message: "Success"
      });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
    storeAccount,
    getAllAccounts,
    updateAccountPassword,
    deleteAccount
};


// $2b$10$FAO7AwGdKinY45H4l76lTOkdf/R5ipDWlkF51G1BJCl6Nw4Szl/sS
// $2b$10$FAO7AwGdKinY45H4l76lTOkdf/R5ipDWlkF51G1BJCl6Nw4Szl/sS
// $2b$10$FAO7AwGdKinY45H4l76lTOkdf/R5ipDWlkF51G1BJCl6Nw4Szl/sS