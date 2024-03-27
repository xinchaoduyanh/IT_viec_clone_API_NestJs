import { BadRequestException, Injectable } from '@nestjs/common'
import { Company, CompanyDocument } from './schemas/company.schema'
import { InjectModel } from '@nestjs/mongoose'
// import { CreateCompanyDto } from './dto/create-company.dto'
// import { UpdateCompanyDto } from './dto/update-company.dto'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UserInterface } from 'src/users/users.interface'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Types } from 'mongoose'
@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}
  create(createCompanyDto: CreateCompanyDto, user: UserInterface) {
    const { name, address, description } = createCompanyDto
    const company = this.companyModel.create({
      name,
      address,
      description,
      createdBy: {
        _id: user._id,
        enmail: user.email
      }
    })
    return company
  }

  async update(updateCompanyDto: UpdateCompanyDto, _id: string, user: UserInterface) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid company ID')
    }
    const company = await this.companyModel.findOneAndUpdate(
      {
        _id
      },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        },
        updatedAt: Date.now()
      },
      {
        new: true
      }
    )
    return company
  }
}
