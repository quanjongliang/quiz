import { BaseQueryResponse, PageOptionsDto } from "@/core/";
import { User, UserWithOutPassword } from "@/entity";
import { MailerService } from "@/mailer";
import { UserRepository } from "@/repository";
import { JwtService } from "@nestjs/jwt";
import { ChangePasswordDto, CreateUserDto, ForgetPasswordDto, UpdateUserRoleDto } from "../dto";
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailerService;
    constructor(userRepository: UserRepository, jwtService: JwtService, mailerService: MailerService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(user: UserWithOutPassword): Promise<string>;
    createNewUser(createUserDto: CreateUserDto): Promise<void>;
    submitCreateNewUser(token: string): Promise<string>;
    changeUserPassword(changePasswordDto: ChangePasswordDto, username: string): Promise<string>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<any>;
    verifyResetPassword(tokenResetPassword: string): Promise<string>;
    createAdminUser(createUserDto: CreateUserDto): Promise<User>;
    updateUserRole(user: User, updateUserRoleDto: UpdateUserRoleDto): Promise<[User]>;
    getAllUser(): Promise<User[]>;
    getAllUserList(queryUserDto: PageOptionsDto): Promise<BaseQueryResponse<User>>;
    updateAvatarUser(user: User, avatar: number): Promise<number>;
    validateUserWithRefreshToken(refreshToken: string, payload: UserWithOutPassword): Promise<User>;
}
