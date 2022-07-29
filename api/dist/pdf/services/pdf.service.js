"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const data_1 = require("../data");
const axios_1 = require("@nestjs/axios");
let PdfService = class PdfService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createFilePdf(name, res) {
        const pdfDoc = new PDFDocument();
        const date = new Date();
        pdfDoc.text("From Mon-Sat we will have a 10% discount on selected items!", 150, 150);
        pdfDoc.fillColor("red").fontSize(17).text("20%", 305, 150);
        pdfDoc.pipe(res);
        pdfDoc.end();
    }
    async createResumePdf(res) {
        const image = await this.httpService.axiosRef.get("https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/289823588_1250891838780994_5228189453786981952_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IC9fHvLjppkAX-usULd&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-jS-mkrFuuY7Wz_O28UgTCtp5F3ehZDde36JDjSCEcPQ&oe=62E46A97", {
            responseType: "arraybuffer",
        });
        const data = data_1.dataCv;
        const date = new Date();
        const pdfDoc = new PDFDocument();
        pdfDoc.image(image.data, 400, 0, { width: 200, height: 200 });
        pdfDoc
            .text("This is a link", { link: 'https://pdfkit.org/docs/guide.pdf', underline: true });
        pdfDoc.text(data.name);
        pdfDoc.text(data.dateOfBirth);
        pdfDoc.text(data.address);
        pdfDoc.text(data.phone);
        data_1.dataCv.content.forEach((data) => {
            pdfDoc.text(data.title);
            data.data.forEach((d) => {
                pdfDoc.text(d.companyName);
                pdfDoc.text(`${d.startTime} - ${d.endTime ? d.endTime : "present"}`);
                pdfDoc.text(d.companyName);
                pdfDoc.text(d.role);
                pdfDoc.text("Projects: ");
                d.projects.forEach((p) => {
                    pdfDoc.text(p.name);
                    pdfDoc.text(p.technology.join(", "));
                    pdfDoc.text(p.description);
                    p.contribute.forEach((c) => {
                        pdfDoc.text(`* ${c}`);
                    });
                });
            });
        });
        pdfDoc.pipe(res);
        pdfDoc.end();
    }
};
PdfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=pdf.service.js.map