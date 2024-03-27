import {
  Body,
  Controller,
  Post
  // ,Get,
  //  Post,
  //  Body,
  // Patch,
  // Param,
  // Delete
} from '@nestjs/common'
import { CompaniesService } from './companies.service'

import { CreateCompanyDto } from './dto/create-company.dto'
import { User } from 'src/decorator/customize'
import { UserInterface } from 'src/users/users.interface'
// import { UpdateCompanyDto } from './dto/update-company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: UserInterface) {
    return this.companiesService.create(createCompanyDto, user)
  }
}
