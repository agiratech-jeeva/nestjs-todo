
import {  IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class signUpDto {
   
     @IsNotEmpty()
     @IsEmail({},{message: 'Please enter correct email'})
     readonly name:string;

     @IsNotEmpty()
     @IsString()
     readonly email:string;

     @IsNotEmpty()
     @IsString()
     @MinLength(6)
     readonly password:string;

}