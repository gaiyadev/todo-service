import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = new Todo();
    todo.title = createTodoDto.title;

    const saved = await this.todoRepository.save(todo);
    return {
      message: 'added success',
      data: {
        id: saved.id,
        title: saved.title,
      },
    };
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: any) {
    const todo = await this.todoRepository.findOne({ where: { id: id.id } });
    if (!todo) {
      return new RpcException('Not found');
    }
    return {
      message: 'Fetched',
      todo,
    };
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
