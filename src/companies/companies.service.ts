import { Injectable } from '@nestjs/common'
import { Company, CompanyDocument } from './schemas/company.schema'
import { InjectModel } from '@nestjs/mongoose'
// import { CreateCompanyDto } from './dto/create-company.dto'
// import { UpdateCompanyDto } from './dto/update-company.dto'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { CreateCompanyDto } from './dto/create-company.dto'
@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}
  create(createCompanyDto: CreateCompanyDto) {
    const { name, address, description } = createCompanyDto
    const company = this.companyModel.create({ name, address, description })
    return company
  }
}
