"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFileFs = exports.getFileMediaDrive = exports.getFileMetaDataDrive = void 0;
const core_1 = require("../../core");
const fs = require("fs");
const getFileMetaDataDrive = (fileName) => ({
    name: fileName,
    parents: [core_1.GOOGLE_API_FOLDER_ID],
});
exports.getFileMetaDataDrive = getFileMetaDataDrive;
const getFileMediaDrive = (mimeType, filePath) => ({
    mimeType,
    body: fs.createReadStream(filePath),
});
exports.getFileMediaDrive = getFileMediaDrive;
const removeFileFs = (filePath) => fs.unlinkSync(filePath);
exports.removeFileFs = removeFileFs;
//# sourceMappingURL=common.js.map