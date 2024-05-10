import { Priority } from "../schemas/todo.schema";
import {  IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
   
     @IsNotEmpty()
     @IsString()
     readonly title:string;

     @IsNotEmpty()
     @IsString()
     readonly description:string;

     @IsNotEmpty()
     @IsString()
     readonly assigneename:string;

     @IsNotEmpty()
     @IsString()
     readonly recipientname:string;

     @IsNotEmpty()
     @IsNumber()
     readonly time:number;

     @IsNotEmpty()
     @IsEnum(Priority,{message:"Please Enter the correct Priority"})
     readonly priority:Priority;
}