import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/common/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    return this.dbService.query('SELECT * FROM users');
  }

  async findOne(id: number) {
    const result = await this.dbService.query('SELECT * FROM users WHERE id = ?', [id]);
    return result[0] || null;
  }

  async create(data: CreateUserDto) {
    const { name, email } = data;
    const result = await this.dbService.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

    return { id: result.insertId, ...data };
  }

  async update(id: number, data: UpdateUserDto) {
    const { name, email } = data;
    await this.dbService.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.dbService.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
