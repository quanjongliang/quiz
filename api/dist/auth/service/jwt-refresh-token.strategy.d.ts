import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { UserWithOutPassword } from "@/entity";
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    readonly configService: ConfigService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(request: Request, payload: UserWithOutPassword): Promise<import("@/entity").User>;
}
export {};
