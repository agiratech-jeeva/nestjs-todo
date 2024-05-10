import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';




@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: mongoose.Model<Todo>
    ){}

    async findAll():Promise<Todo[]>{
        const todos = await this.todoModel.find()
        return todos
    }

    async create(todo:Todo):Promise<Todo>{
        const res = await this.todoModel.create(todo)
        return res
    }

    async findById(id:string): Promise<Todo>{
        const isValidId = mongoose.isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException('Please Enter the valid id')
        }

        const todo = await this.todoModel.findById(id) ;

        if(!todo){
            throw new NotFoundException('Task is notFound')
        }
        return todo;
    }

    async updateById(id:string,todo:Todo):Promise<Todo>{
        return await this.todoModel.findByIdAndUpdate(id,todo,{
            new:true,
            runValidators:true
        })
    }

    async deleteById(id:string):Promise<Todo>{
        return await this.todoModel.findByIdAndDelete(id);
    }
}
