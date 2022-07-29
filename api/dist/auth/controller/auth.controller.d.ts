import { User, UserWithOutPassword, USER_ROLE } from "@/entity";
import { ChangePasswordDto, CreateUserDto, ForgetPasswordDto, UpdateUserRoleDto } from "../dto";
import { AuthService } from "../service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(currentUser: User): Promise<string>;
    getProfile(currentUser: User): {
        username: string;
        email: string;
        role: USER_ROLE;
        confirmedEmail: boolean;
        phone: string;
        currentHashedRefreshToken: string;
        quizs: import("@/entity").Quiz[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    };
    signUpUser(newUserDto: CreateUserDto): Promise<void>;
    submitSignUpUser(token: string): Promise<string>;
    changePassword(currentUser: UserWithOutPassword, changePasswordDto: ChangePasswordDto): Promise<string>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<any>;
    resetPassword(token: string): Promise<string>;
    updateRoleUser(user: User, updateUserRole: UpdateUserRoleDto): Promise<[User]>;
    updateUserAvatar(user: User, avatar: number): Promise<number>;
}
