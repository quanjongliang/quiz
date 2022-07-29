import * as hbs from "nodemailer-express-handlebars";
import { SendTokenMailInterface, SendWelcomeMailInterface } from "../interface";
export declare const handlerbarOptions: hbs.NodemailerExpressHandlebarsOptions;
export declare class MailerService {
    private transporter;
    constructor();
    sendWelcomeMail(information: SendWelcomeMailInterface): Promise<any>;
    sendResetPasswordMail(information: SendTokenMailInterface): Promise<any>;
    sendSubmitMail(information: SendTokenMailInterface): Promise<any>;
}
