import { Injectable, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AllExceptionsFilter } from '@utils/errorFilter.util';
import { JwtPayload } from './interface/auth-payload.interface';


@Injectable()
@UseFilters(new AllExceptionsFilter())
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ){}

  async login({email , password }) {
    
    // get user with the email given
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if(!user) {
      throw new NotFoundException(`User not found in order to this email: ${email}`);
    }

    // Verify password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }

    return {
      accessToken: this.getJwtToken({ id: user.id, email: user.email }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }

  }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwt.sign(payload);

    return token;

  }


}
