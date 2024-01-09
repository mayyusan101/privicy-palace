const express = require("express");

const router = express.Router();
const { storeAccount, getAllAccounts, updateAccountPassword, deleteAccount } = require("../controller/user");

/* prefix => api/accounts */

router.post("/", storeAccount);
router.get("/", getAllAccounts);
router.patch("/:id", updateAccountPassword);
router.delete("/:id", deleteAccount);

module.exports = router;
