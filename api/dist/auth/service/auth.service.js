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
exports.AuthService = void 0;
const core_1 = require("../../core");
const entity_1 = require("../../entity");
const mailer_1 = require("../../mailer");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_decode_1 = require("jwt-decode");
const typeorm_1 = require("typeorm");
const util_1 = require("../util");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user)
            throw new common_1.NotFoundException(core_1.AUTH_MESSAGE.USER.NOT_FOUND);
        const isMatch = await (0, core_1.checkIsMatchPassword)(password, user.password);
        if (isMatch)
            return user;
        return null;
    }
    async login(user) {
        const { id, email, username, phone, role } = user;
        const payload = {
            id,
            email,
            username,
            phone,
            role,
        };
        return this.jwtService.sign(payload);
    }
    async createNewUser(createUserDto) {
        const { username, email, password: rawPassword } = createUserDto;
        const queryEmail = email ? { email } : {};
        const checkUserInfor = await this.userRepository.findOne({
            where: [{ username }, queryEmail],
        });
        if (checkUserInfor)
            throw new common_1.ConflictException(core_1.AUTH_MESSAGE.USER.EXIST);
        const password = await (0, core_1.hashedPassword)(rawPassword);
        const rawNewUser = Object.assign(Object.assign({}, createUserDto), { password });
        const expiredTime = (0, mailer_1.getExpiredTime)(core_1.EXPIRES_IN_MINUTE.THIRTY_MINUTE);
        const token = this.jwtService.sign({ rawNewUser, expiredTime });
        return this.mailerService.sendSubmitMail({ to: email, username, token });
    }
    async submitCreateNewUser(token) {
        const { rawNewUser, expiredTime } = (0, jwt_decode_1.default)(token);
        if ((0, util_1.isTokenExpired)(expiredTime)) {
            throw new common_1.HttpException(core_1.AUTH_MESSAGE.TOKEN.EXPIRED, common_1.HttpStatus.REQUEST_TIMEOUT);
        }
        const checkExistUser = await this.userRepository.findOne({
            where: {
                username: rawNewUser.username,
            }
        });
        if (checkExistUser)
            throw new common_1.HttpException(core_1.AUTH_MESSAGE.USER.SUBMITTED, common_1.HttpStatus.ACCEPTED);
        const newUser = await this.userRepository.save(Object.assign(Object.assign({}, rawNewUser), { confirmedEmail: true }));
        await this.mailerService.sendWelcomeMail({
            to: newUser.email,
            username: newUser.username,
        });
        return this.login(newUser);
    }
    async changeUserPassword(changePasswordDto, username) {
        const { oldPassword, newPassword, confirmNewPassword } = changePasswordDto;
        if (newPassword !== confirmNewPassword)
            throw new common_1.ConflictException(core_1.AUTH_MESSAGE.USER.CONFIRM_PASSWORD);
        const checkValidateUser = await this.validateUser(username, oldPassword);
        if (!checkValidateUser)
            throw new common_1.NotFoundException(core_1.AUTH_MESSAGE.USER.WRONG_PASSWORD);
        const password = await (0, core_1.hashedPassword)(newPassword);
        const changedPasswordUser = await this.userRepository.save(Object.assign(Object.assign({}, checkValidateUser), { password }));
        return this.login(changedPasswordUser);
    }
    async forgetPassword(forgetPasswordDto) {
        const { username, newPassword, confirmNewPassword } = forgetPasswordDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user)
            throw new common_1.NotFoundException(core_1.AUTH_MESSAGE.USER.NOT_FOUND);
        if (newPassword !== confirmNewPassword)
            throw new common_1.ConflictException(core_1.AUTH_MESSAGE.USER.CONFIRM_PASSWORD);
        const password = await (0, core_1.hashedPassword)(newPassword);
        const expiredTime = (0, mailer_1.getExpiredTime)(core_1.EXPIRES_IN_MINUTE.FIVE_MINUTE);
        const payload = {
            username,
            password,
            expiredTime,
        };
        const tokenResetPassword = this.jwtService.sign(payload);
        return this.mailerService.sendResetPasswordMail({
            to: user.email,
            token: tokenResetPassword,
            username,
        });
    }
    async verifyResetPassword(tokenResetPassword) {
        const payload = (0, jwt_decode_1.default)(tokenResetPassword);
        const { username, password, expiredTime } = payload;
        if ((0, util_1.isTokenExpired)(expiredTime)) {
            throw new common_1.HttpException(core_1.AUTH_MESSAGE.TOKEN.EXPIRED, common_1.HttpStatus.REQUEST_TIMEOUT);
        }
        const user = await this.userRepository.findOne({ where: { username } });
        const changedPasswordUser = await this.userRepository.save(Object.assign(Object.assign({}, user), { password }));
        return this.login(changedPasswordUser);
    }
    async createAdminUser(createUserDto) {
        const password = await (0, core_1.hashedPassword)(createUserDto.password);
        const newAdmin = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password, role: entity_1.USER_ROLE.ADMIN, confirmedEmail: true }));
        return this.userRepository.save(newAdmin);
    }
    async updateUserRole(user, updateUserRoleDto) {
        const { username, role } = updateUserRoleDto;
        const checkUser = await this.userRepository.findOne({ where: { username } });
        if (!checkUser)
            throw new common_1.HttpException(core_1.AUTH_MESSAGE.USER.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        return Promise.all([this.userRepository.save(Object.assign(Object.assign({}, checkUser), { role }))]);
    }
    async getAllUser() {
        return this.userRepository.find();
    }
    async getAllUserList(queryUserDto) {
        const { skip = core_1.DEFAULT_CONFIG.OFFSET, take = core_1.DEFAULT_CONFIG.OFFSET, sortColumn, query, order, } = queryUserDto;
        const [data, total] = await this.userRepository.findAndCount({
            where: [
                { username: (0, typeorm_1.ILike)(query) },
                {
                    email: (0, typeorm_1.ILike)(query),
                },
            ],
            take,
            skip,
            order: {
                [sortColumn || "id"]: order,
            },
        });
        return {
            data,
            total,
        };
    }
    async updateAvatarUser(user, avatar) {
        const checkUser = await this.userRepository.checkExistUser(user.id);
        await this.userRepository.save(Object.assign(Object.assign({}, checkUser), { avatar }));
        return avatar;
    }
    async validateUserWithRefreshToken(refreshToken, payload) {
        const { id } = payload;
        const user = await this.userRepository.checkExistUser(id);
        const isMatchingRefreshToken = refreshToken === user.currentHashedRefreshToken;
        if (!isMatchingRefreshToken) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UserRepository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map