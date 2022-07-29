import { CloundinaryService } from "@/cloudinary";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class UploadFileInterceptor implements NestInterceptor {
    protected cloundinaryService: CloundinaryService;
    constructor(cloundinaryService: CloundinaryService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
