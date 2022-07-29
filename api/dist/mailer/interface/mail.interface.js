"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILER_TEMPLATE = exports.MAILER_TEMPLATE_ENUM = void 0;
var MAILER_TEMPLATE_ENUM;
(function (MAILER_TEMPLATE_ENUM) {
    MAILER_TEMPLATE_ENUM["WELCOME"] = "WELCOME";
    MAILER_TEMPLATE_ENUM["RESET_PASSWORD"] = "RESET_PASSWORD";
    MAILER_TEMPLATE_ENUM["SUBMIT_USER"] = "SUBMIT_USER";
    MAILER_TEMPLATE_ENUM["AUDIT_STONE"] = "AUDIT_STONE";
    MAILER_TEMPLATE_ENUM["AUDIT_STONE_TO_USER"] = "AUDIT_STONE_TO_USER";
    MAILER_TEMPLATE_ENUM["BUY_ACCOUNT_BY_USER"] = "BUY_ACCOUNT_BY_USER";
    MAILER_TEMPLATE_ENUM["BUY_ACCOUNT_TO_USER"] = "BUY_ACCOUNT_TO_USER";
    MAILER_TEMPLATE_ENUM["BUY_ACCOUNTS_TO_USER"] = "BUY_ACCOUNTS_TO_USER";
    MAILER_TEMPLATE_ENUM["BUY_ACCOUNTS_BY_USER"] = "BUY_ACCOUNTS_BY_USER";
})(MAILER_TEMPLATE_ENUM = exports.MAILER_TEMPLATE_ENUM || (exports.MAILER_TEMPLATE_ENUM = {}));
exports.MAILER_TEMPLATE = {
    WELCOME: {
        TEMPLATE: "welcome-mail",
        SUBJECT: "Welcome!",
    },
    RESET_PASSWORD: {
        TEMPLATE: "reset-password-mail",
        SUBJECT: "Reset password!",
    },
    SUBMIT_USER: {
        TEMPLATE: "submit-user-mail",
        SUBJECT: "Submit user!",
    },
    AUDIT_STONE: {
        TEMPLATE: "request-stone-mail",
        SUBJECT: "Request Stone",
    },
    AUDIT_STONE_TO_USER: {
        TEMPLATE: "request-stone-mail-to-user",
        SUBJECT: "Request Stone to user",
    },
    BUY_ACCOUNT_BY_USER: {
        TEMPLATE: "buy-account-by-user",
        SUBJECT: "Buy account by user",
    },
    BUY_ACCOUNT_TO_USER: {
        TEMPLATE: "buy-account-to-user",
        SUBJECT: "Buy account to user",
    },
    BUY_ACCOUNTS_TO_USER: {
        TEMPLATE: "buy-accounts-to-user",
        SUBJECT: "Buy accounts to user",
    },
    BUY_ACCOUNTS_BY_USER: {
        TEMPLATE: "buy-accounts-by-user",
        SUBJECT: "Buy accounts by user",
    },
};
//# sourceMappingURL=mail.interface.js.map