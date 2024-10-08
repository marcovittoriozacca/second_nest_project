import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<{ access_token: string }> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
        },
      });
      const access_token = await this.signToken({
        sub: user.id,
        username: user.username,
      });
      return { access_token };
    } catch (err) {
      throw err;
    }
  }

  async signin(dto: SigninDto): Promise<{ access_token: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      const isPasswordCorrect = await argon.verify(user.password, dto.password);

      if (!isPasswordCorrect) {
        throw new BadRequestException('Email or Password incorrect');
      }

      const token = await this.signToken(
        { sub: user.id, username: user.username },
        '5h',
      );
      return { access_token: token };
    } catch (err) {
      throw err;
    }
  }

  async signToken(
    payload: { sub: string; username: string },
    expiresIn?: string,
  ): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: expiresIn ? expiresIn : '5h',
    });
  }
}
