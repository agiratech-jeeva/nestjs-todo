import { Schema,Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export enum Priority{
    LOW = "Low",
    MEDIUM ="Medium",
    HIGH = "High"

}

@Schema({
    timestamps:true
})

export class Todo{
   @Prop()
   title:string;

   @Prop()
   description:string;

   @Prop()
   assigneename:string;

   @Prop()
   recipientname:string;

   @Prop()
   time:number;

   @Prop()
   priority:Priority;

}

export const TodoSchema = SchemaFactory.createForClass(Todo)