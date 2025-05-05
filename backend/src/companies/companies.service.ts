import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Prisma, Company, User, Role } from 'generated/prisma'; 
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      return await this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Company with this email already exists.',
          );
        }
      }
      throw error; 
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput; 
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<{ data: Company[]; count: number }> {
    const { skip, take, cursor, where, orderBy } = params;

    const [companies, totalCount] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        skip,
        take,
        cursor,
        where, 
        orderBy,
        include: {
          _count: {
            select: { jobOffers: true },
          },
        },
      }),
      this.prisma.company.count(),
    ]);

    const dataWithCount = companies.map((company) => ({
      ...company,
      jobOffersCount: company._count?.jobOffers ?? 0, 
      _count: undefined, 
    }));

    return {
      data: dataWithCount,
      count: totalCount,
    };
  }

  async findOne(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: { jobOffers: true },
        },
        jobOffers: true, 
        recruiters: true, 
      }
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    user: User,
  ): Promise<Company> {
    const company = await this.findOne(id); 

    if (
      user.role !== Role.ADMIN &&
      (user.role !== Role.RECRUITER || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this company.',
      );
    }

    try {
      return await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Company with this email already exists.',
          );
        }
      }
      throw error;
    }
  }

  async remove(id: string, user: User): Promise<Company> {
    const company = await this.findOne(id);

    if (
      user.role !== Role.ADMIN &&
      (user.role !== Role.RECRUITER || user.companyId !== id)
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this company.',
      );
    }

    return this.prisma.company.delete({
      where: { id },
    });
  }
}
