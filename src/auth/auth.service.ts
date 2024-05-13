import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private JwtSErvice: JwtService
    ){}


    async signUp(signUpDto: signUpDto): Promise<{token:string}> {
        const {name, email, password} =signUpDto

        const  hashedPassword = await bcrypt.hash(password,10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.JwtSErvice.sign({id: user._id})
        return  {token}
    }

    async login(LoginDto:LoginDto): Promise<{token:string}> {
        const {email, password} =LoginDto;

        const user = await this.userModel.findOne({email})

        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordMatched =await bcrypt.compare(password,user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.JwtSErvice.sign({id: user._id})
        return  {token}


    }
}
