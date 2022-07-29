import {
  AUTH_MESSAGE,
  BaseQueryResponse,
  checkIsMatchPassword,
  DEFAULT_CONFIG,
  EXPIRES_IN_MINUTE,
  hashedPassword,
  PageOptionsDto,
} from "@/core/";
import {
  PayloadTokenUser,
  User,
  UserWithOutPassword,
  USER_ROLE,
} from "@/entity";
import { getExpiredTime, MailerService } from "@/mailer";
import { UserRepository } from "@/repository";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { default as jwtDecode, default as jwt_decode } from "jwt-decode";
import { ILike, Like } from "typeorm";
import {
  ChangePasswordDto,
  CreateUserDto,
  ForgetPasswordDto,
  QueryUserDto,
  UpdateUserRoleDto,
} from "../dto";
import { ResetPasswordPayload, SubmitUserPayload } from "../interface";
import { isTokenExpired } from "../util";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where:{username} });
    if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
    const isMatch = await checkIsMatchPassword(password, user.password);
    if (isMatch) return user;
    return null;
  }

  async login(user: UserWithOutPassword) {
    const { id, email, username, phone, role } = user;
    const payload: PayloadTokenUser = {
      id,
      email,
      username,
      phone,
      role,
    };
    return this.jwtService.sign(payload);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, email, password: rawPassword } = createUserDto;
    const queryEmail = email ? { email } : {};
    const checkUserInfor = await this.userRepository.findOne({
      where: [{ username }, queryEmail],
    });
    if (checkUserInfor) throw new ConflictException(AUTH_MESSAGE.USER.EXIST);
    const password = await hashedPassword(rawPassword);

    const rawNewUser = {
      ...createUserDto,
      password,
    };

    const expiredTime = getExpiredTime(EXPIRES_IN_MINUTE.THIRTY_MINUTE);
    const token = this.jwtService.sign({ rawNewUser, expiredTime });
    return this.mailerService.sendSubmitMail({ to: email, username, token });
  }

  async submitCreateNewUser(token: string): Promise<string> {
    const { rawNewUser, expiredTime } = jwtDecode<SubmitUserPayload>(token);
    if (isTokenExpired(expiredTime)) {
      throw new HttpException(
        AUTH_MESSAGE.TOKEN.EXPIRED,
        HttpStatus.REQUEST_TIMEOUT
      );
    }
    const checkExistUser = await this.userRepository.findOne({
where:{
  username: rawNewUser.username,

}
    });
    if (checkExistUser)
      throw new HttpException(AUTH_MESSAGE.USER.SUBMITTED, HttpStatus.ACCEPTED);
    const newUser = await this.userRepository.save({
      ...rawNewUser,
      confirmedEmail: true,
    });
    await this.mailerService.sendWelcomeMail({
      to: newUser.email,
      username: newUser.username,
    });
    return this.login(newUser);
  }

  async changeUserPassword(
    changePasswordDto: ChangePasswordDto,
    username: string
  ): Promise<string> {
    const { oldPassword, newPassword, confirmNewPassword } = changePasswordDto;
    if (newPassword !== confirmNewPassword)
      throw new ConflictException(AUTH_MESSAGE.USER.CONFIRM_PASSWORD);

    const checkValidateUser = await this.validateUser(username, oldPassword);
    if (!checkValidateUser)
      throw new NotFoundException(AUTH_MESSAGE.USER.WRONG_PASSWORD);
    const password = await hashedPassword(newPassword);
    const changedPasswordUser = await this.userRepository.save({
      ...checkValidateUser,
      password,
    });
    return this.login(changedPasswordUser);
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { username, newPassword, confirmNewPassword } = forgetPasswordDto;
    const user = await this.userRepository.findOne({ where:{username} });
    if (!user) throw new NotFoundException(AUTH_MESSAGE.USER.NOT_FOUND);
    if (newPassword !== confirmNewPassword)
      throw new ConflictException(AUTH_MESSAGE.USER.CONFIRM_PASSWORD);
    const password = await hashedPassword(newPassword);
    const expiredTime = getExpiredTime(EXPIRES_IN_MINUTE.FIVE_MINUTE);
    const payload: ResetPasswordPayload = {
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

  async verifyResetPassword(tokenResetPassword: string) {
    const payload: ResetPasswordPayload = jwt_decode(tokenResetPassword);
    const { username, password, expiredTime } = payload;
    if (isTokenExpired(expiredTime)) {
      throw new HttpException(
        AUTH_MESSAGE.TOKEN.EXPIRED,
        HttpStatus.REQUEST_TIMEOUT
      );
    }
    const user = await this.userRepository.findOne({ where:{username} });
    const changedPasswordUser = await this.userRepository.save({
      ...user,
      password,
    });
    return this.login(changedPasswordUser);
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    const password = await hashedPassword(createUserDto.password);
    const newAdmin = this.userRepository.create({
      ...createUserDto,
      password,
      role: USER_ROLE.ADMIN,
      confirmedEmail: true,
    });
    return this.userRepository.save(newAdmin);
  }

  async updateUserRole(
    user: User,
    updateUserRoleDto: UpdateUserRoleDto
  ): Promise<[User]> {
    const { username, role } = updateUserRoleDto;
    const checkUser = await this.userRepository.findOne({ where:{username} });
    if (!checkUser)
      throw new HttpException(
        AUTH_MESSAGE.USER.NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    return Promise.all([this.userRepository.save({ ...checkUser, role })]);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getAllUserList(
    queryUserDto: PageOptionsDto
  ): Promise<BaseQueryResponse<User>> {
    const {
      skip = DEFAULT_CONFIG.OFFSET,
      take = DEFAULT_CONFIG.OFFSET,
      sortColumn,
      query,
      order,
    } = queryUserDto;
    // const [total, data] = await Promise.all([
    //   this.userRepository.count({ where }),
    // //   this.userRepository.find({
    // //     take: limit,
    // //     skip: offset,
    // //     select: ["id", "username", "email", "money", "role"],
    // //     where,
    // //     order: {
    // //       role: "ASC",
    // //       username: "ASC",
    // //     },
    // //   }),
    // // ]);
    const [data, total] = await this.userRepository.findAndCount({
      where: [
        { username: ILike(query) },
        {
          email: ILike(query),
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

  async updateAvatarUser(user: User, avatar: number): Promise<number> {
    const checkUser = await this.userRepository.checkExistUser(user.id);
    await this.userRepository.save({ ...checkUser, avatar });
    return avatar;
  }

  //ok
  async validateUserWithRefreshToken(
    refreshToken: string,
    payload: UserWithOutPassword
  ) {
    const { id } = payload;
    const user = await this.userRepository.checkExistUser(id);

    const isMatchingRefreshToken =
      refreshToken === user.currentHashedRefreshToken;

    if (!isMatchingRefreshToken) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
