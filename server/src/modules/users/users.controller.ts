/**
 * user controller.
 *
 */
import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(req, res) {
    console.log(req, res);
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getUser(req, res, next) {
    // this.usersService.getUser()
  }

  @Post()
  addUser(req, res, next) { }
}
