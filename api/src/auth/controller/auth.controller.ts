import { User, UserWithOutPassword, USER_ROLE } from "@/entity";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,ParseIntPipe
} from "@nestjs/common";

import { CurrentUser, Roles } from "../decorator";
import {
  ChangePasswordDto,
  CreateUserDto,
  ForgetPasswordDto,
  LoginUserDto,
  UpdateUserRoleDto,
} from "../dto";
import { JwtAuthGuard, LocalAuthGuard, RolesGuard } from "../guard";
import { AuthService } from "../service";
import { ApiTags, ApiBearerAuth, ApiParam, ApiBody } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ type: LoginUserDto })
  async login(@CurrentUser() currentUser: User) {
    return this.authService.login(currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@CurrentUser() currentUser: User) {
    const { password, ...userInformation } = currentUser;
    return userInformation;
  }

  @Post("sign-up")
  async signUpUser(@Body() newUserDto: CreateUserDto) {
    return this.authService.createNewUser(newUserDto);
  }

  @Post("sign-up/:token")
  @ApiParam({
    name: "token",
  })
  async submitSignUpUser(@Param("token") token: string) {
    return this.authService.submitCreateNewUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("change-password")
  changePassword(
    @CurrentUser() currentUser: UserWithOutPassword,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changeUserPassword(
      changePasswordDto,
      currentUser.username
    );
  }

  @Post("forget-password")
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Patch("forget-password/:token")
  resetPassword(@Param("token") token: string) {
    return this.authService.verifyResetPassword(token);
  }

  @Patch("update-role")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  updateRoleUser(
    @CurrentUser() user: User,
    @Body() updateUserRole: UpdateUserRoleDto
  ) {
    return this.authService.updateUserRole(user, updateUserRole);
  }

  @Patch("change-avatar/:avatar")
  @UseGuards(JwtAuthGuard)
  updateUserAvatar(
    @CurrentUser() user: User,
    @Param("avatar", ParseIntPipe) avatar: number
  ) {
    return this.authService.updateAvatarUser(user, avatar);
  }
}
