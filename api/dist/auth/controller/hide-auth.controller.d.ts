import { PageOptionsDto } from "@/core";
import { AuthService } from "../service";
export declare class HideAuthController {
    private authService;
    constructor(authService: AuthService);
    getAllUser(): Promise<import("../../entity").User[]>;
    getAllUserList(queryUserDto: PageOptionsDto): Promise<import("@/core").BaseQueryResponse<import("../../entity").User>>;
}
