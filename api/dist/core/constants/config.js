"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACCOUNT_IMAGE = exports.LIMIT_FILE_ACCOUNT = exports.LIMIT_FILE_BANNER = exports.QUILL_LIANG_EMAIL = exports.TIM_DANG_EMAIL = exports.DEFAULT_CONFIG = exports.CLOUDINARY_CONFIG = exports.POST_CONFIG = exports.ROLE_CONTEXT = exports.JWT_EMAIL_CONFIG = exports.JWT_CONFIG = exports.MULTER_CONFIG = exports.DRIVE_CONFIG = exports.MAILER_CONFIG = exports.NAME_APP_COMPANY = exports.SHOP_EMAIL = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
exports.SHOP_EMAIL = "shoppacc.9999@gmail.com";
exports.NAME_APP_COMPANY = "Tempest Genshin";
exports.MAILER_CONFIG = {
    HOST: "smtp.gmail.com",
    PORT: 587,
    SECURE: false,
    USER: "shoppacc.9999@gmail.com",
    PASS: "knmpnfkoitioimbs",
    TEMPLATE_DIR: "./templates/",
    FROM: `"Tempest Genshin" <${exports.SHOP_EMAIL}>`,
};
exports.DRIVE_CONFIG = {
    PROJECT_ID: "utopian-plane-348304",
    AUTH_URL: "https://accounts.google.com/o/oauth2/auth",
    TOKEN_URI: "https://oauth2.googleapis.com/token",
    CLIENT_ID: "153297762508-ioh0pj6cgt04illlfl6ud1aluo5cmv77.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REFRESH_TOKEN: "1//040vAtTkSndS6CgYIARAAGAQSNwF-L9IrQAcPZIXwyEUahifdWCzO76MNmuUpNb4qLCET6m_jyhYk8K9aXnTv92NeB7AhFBAhdQk",
    REDIRECT_URI: "https://developers.google.com/oauthplayground",
    ROLE: {
        READER: "reader",
    },
    TYPE: {
        ANYONE: "anyone",
    },
    FIELDS: "webViewLink, webContentLink",
    SCOPES: ["https://www.googleapis.com/auth/drive"],
    TOKEN_PATH: "token.json",
    API_KEY: "AIzaSyAtKnWG6Jvad3_ff-CK2gtLZB5njangp6w",
};
exports.MULTER_CONFIG = {
    DESTINATION: "./uploads",
    CONFIG: {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (_req, file, cb) => {
                const randomName = (0, uuid_1.v4)();
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    },
};
exports.JWT_CONFIG = {
    SECRET: "secretKey",
    EXPIRES_IN: "1d",
};
exports.JWT_EMAIL_CONFIG = {
    secret: "secretKeyMail",
    expiresIn: "300s",
};
exports.ROLE_CONTEXT = "roles";
exports.POST_CONFIG = {
    LENGTH: { MIN: 8 },
    LIMIT: 10,
};
exports.CLOUDINARY_CONFIG = {
    NAME: "shoppacc",
    API_KEY: "181389484819227",
    API_SECRET: "X0ps-nMxPbMte_X8EfMI_wG6gCY",
    API_ENV: "CLOUDINARY_URL=cloudinary://181389484819227:X0ps-nMxPbMte_X8EfMI_wG6gCY@shoppacc",
};
exports.DEFAULT_CONFIG = {
    LIMIT: 10,
    OFFSET: 0,
};
exports.TIM_DANG_EMAIL = "dft1711198@gmail.com";
exports.QUILL_LIANG_EMAIL = "lhongquan.1998@gmail.com";
exports.LIMIT_FILE_BANNER = 3;
exports.LIMIT_FILE_ACCOUNT = 10;
exports.DEFAULT_ACCOUNT_IMAGE = "https://static.wikia.nocookie.net/gensin-impact/images/7/76/Enemy_Eye_of_the_Storm.png/revision/latest?cb=20201018111829";
//# sourceMappingURL=config.js.map