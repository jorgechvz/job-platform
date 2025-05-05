import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { QueryJobOfferDto } from './dto/query-job-offer.dto';
import {
  Prisma,
  JobOffer,
  User,
  Role,
  Skill,
  JobOfferStatus,
} from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createJobOfferDto: CreateJobOfferDto,
    user: User,
  ): Promise<JobOffer> {
    const isRecruiter = user.role === Role.RECRUITER;
    const isAdmin = user.role === Role.ADMIN;

    if (!isAdmin && !(isRecruiter && user.companyId)) {
      throw new ForbiddenException(
        'Only ADMIN users or RECRUITERS associated with a company can post job offers.',
      );
    }

    const {
      requiredSkillIds,
      companyId: dtoCompanyId,
      ...jobOfferData
    } = createJobOfferDto;
    let targetCompanyId: string;

    if (isAdmin) {
      if (!dtoCompanyId) {
        throw new BadRequestException(
          'Admin must provide a companyId to create a job offer.',
        );
      }
      const companyExists = await this.prisma.company.findUnique({
        where: { id: dtoCompanyId },
        select: { id: true },
      });
      if (!companyExists) {
        throw new NotFoundException(
          `Company with ID ${dtoCompanyId} not found.`,
        );
      }
      targetCompanyId = dtoCompanyId;
    } else {
      targetCompanyId = user.companyId!;
    }

    if (requiredSkillIds && requiredSkillIds.length > 0) {
      const skillsExist = await this.prisma.skill.findMany({
        where: { id: { in: requiredSkillIds } },
        select: { id: true },
      });
      if (skillsExist.length !== requiredSkillIds.length) {
        throw new BadRequestException(
          'One or more required skill IDs are invalid.',
        );
      }
    }

    try {
      return await this.prisma.jobOffer.create({
        data: {
          ...jobOfferData,
          company: { connect: { id: targetCompanyId } },
          postedBy: { connect: { id: user.id } },
          requiredSkills: requiredSkillIds
            ? { connect: requiredSkillIds.map((id) => ({ id })) }
            : undefined,
        },
        include: {
          company: true,
          requiredSkills: true,
          postedBy: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      });
    } catch (error) {
      console.error('Error creating job offer:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Database error: ${error.code}`);
      }
      throw new InternalServerErrorException('Could not create job offer.');
    }
  }

  async findAll(
    queryDto: QueryJobOfferDto,
  ): Promise<{ data: JobOffer[]; count: number }> {
    const {
      skip = 0,
      take = 10,
      title,
      companyId,
      jobType,
      location,
      isRemote,
      minSalary,
      status,
      isFeatured,
      skillIds,
      orderBy,
    } = queryDto;

    const where: Prisma.JobOfferWhereInput = {
      status: status ?? JobOfferStatus.ACTIVE,
      title: title ? { contains: title, mode: 'insensitive' } : undefined,
      companyId: companyId,
      jobType: jobType,
      location: location
        ? { contains: location, mode: 'insensitive' }
        : undefined,
      isRemote: isRemote,
      salaryMin: minSalary ? { gte: minSalary } : undefined,
      isFeatured: isFeatured,
      requiredSkills:
        skillIds && skillIds.length > 0
          ? { every: { id: { in: skillIds } } }
          : undefined,
    };

    let orderByCondition: Prisma.JobOfferOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (orderBy) {
      const [field, direction] = orderBy.split(':');
      if (field && (direction === 'asc' || direction === 'desc')) {
        if (['createdAt', 'title', 'location', 'salaryMin'].includes(field)) {
          orderByCondition = { [field]: direction };
        }
      }
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.jobOffer.findMany({
        where,
        include: {
          company: {
            select: { id: true, name: true, logoUrl: true, location: true },
          },
          requiredSkills: { select: { id: true, name: true } },
        },
        skip: skip,
        take: take,
        orderBy: orderByCondition,
      }),
      this.prisma.jobOffer.count({ where }),
    ]);

    return { data, count };
  }

  async findOne(id: string): Promise<JobOffer | null> {
    const jobOffer = await this.prisma.jobOffer.findUnique({
      where: { id },
      include: {
        company: true,
        requiredSkills: true,
        postedBy: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });
    if (!jobOffer) {
      throw new NotFoundException(`Job Offer with ID ${id} not found.`);
    }
    return jobOffer;
  }

  async findMyOffers(
    user: User,
    queryDto: QueryJobOfferDto,
  ): Promise<{ data: JobOffer[]; count: number }> {
    if (user.role !== Role.RECRUITER) {
      throw new ForbiddenException(
        'Only recruiters can access their job offers.',
      );
    }

    const {
      skip = 0,
      take = 10,
      title,
      jobType,
      location,
      isRemote,
      minSalary,
      status,
      isFeatured,
      skillIds,
      orderBy,
    } = queryDto;

    const where: Prisma.JobOfferWhereInput = {
      postedById: user.id,
      status: status,
      title: title ? { contains: title, mode: 'insensitive' } : undefined,
      jobType: jobType,
      location: location
        ? { contains: location, mode: 'insensitive' }
        : undefined,
      isRemote: isRemote,
      salaryMin: minSalary ? { gte: minSalary } : undefined,
      isFeatured: isFeatured,
      requiredSkills:
        skillIds && skillIds.length > 0
          ? { every: { id: { in: skillIds } } }
          : undefined,
    };

    let orderByCondition: Prisma.JobOfferOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (orderBy) {
      const [field, direction] = orderBy.split(':');
      if (field && (direction === 'asc' || direction === 'desc')) {
        if (
          ['createdAt', 'title', 'location', 'salaryMin', 'status'].includes(
            field,
          )
        ) {
          orderByCondition = { [field]: direction };
        }
      }
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.jobOffer.findMany({
        where,
        include: {
          company: {
            select: { id: true, name: true },
          },
          requiredSkills: { select: { id: true, name: true } },
          _count: {
            select: { applications: true },
          },
        },
        skip: skip,
        take: take,
        orderBy: orderByCondition,
      }),
      this.prisma.jobOffer.count({ where }),
    ]);

    return { data, count };
  }

  async findAllForAdmin(
    user: User,
    queryDto: QueryJobOfferDto,
  ): Promise<{ data: JobOffer[]; count: number }> {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Only ADMIN users can access this resource.',
      );
    }

    const {
      skip = 0,
      take = 10,
      title,
      companyId,
      jobType,
      location,
      isRemote,
      minSalary,
      status,
      isFeatured,
      skillIds,
      orderBy,
    } = queryDto;

    const where: Prisma.JobOfferWhereInput = {
      status: status,
      title: title ? { contains: title, mode: 'insensitive' } : undefined,
      companyId: companyId,
      jobType: jobType,
      location: location
        ? { contains: location, mode: 'insensitive' }
        : undefined,
      isRemote: isRemote,
      salaryMin: minSalary ? { gte: minSalary } : undefined,
      isFeatured: isFeatured,
      requiredSkills:
        skillIds && skillIds.length > 0
          ? { every: { id: { in: skillIds } } }
          : undefined,
    };

    let orderByCondition: Prisma.JobOfferOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (orderBy) {
      const [field, direction] = orderBy.split(':');
      if (field && (direction === 'asc' || direction === 'desc')) {
        if (
          [
            'createdAt',
            'updatedAt',
            'title',
            'company.name',
            'status',
            'location',
            'salaryMin',
          ].includes(field)
        ) {
          if (field.includes('.')) {
            const [relation, relationField] = field.split('.');
            orderByCondition = { [relation]: { [relationField]: direction } };
          } else {
            orderByCondition = { [field]: direction };
          }
        }
      }
    }

    // Ejecutamos la consulta y el conteo
    const [data, count] = await this.prisma.$transaction([
      this.prisma.jobOffer.findMany({
        where,
        include: {
          company: { select: { id: true, name: true } },
          requiredSkills: { select: { id: true, name: true } },
          postedBy: { select: { id: true, name: true, role: true } },
          _count: {
            select: { applications: true },
          },
        },
        skip: skip,
        take: take,
        orderBy: orderByCondition,
      }),
      this.prisma.jobOffer.count({ where }),
    ]);

    return { data, count };
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
    user: User,
  ): Promise<JobOffer> {
    const jobOffer = await this.prisma.jobOffer.findUnique({
      where: { id },
      select: { postedById: true, companyId: true },
    });

    if (!jobOffer) {
      throw new NotFoundException(`Job Offer with ID ${id} not found.`);
    }

    const isOwner = jobOffer.postedById === user.id;
    const isAdmin = user.role === Role.ADMIN;
    // Aqui podemos añadir lógica para permitir a Admins editar cualquier oferta,
    // o solo las que ellos crearon, o las de cualquier compañía.
    // Ejemplo: Aqui solo se permite al Admin o al Recruiter propietario editar.
    if (!isAdmin && !isOwner) {
      throw new ForbiddenException(
        'You do not have permission to update this job offer.',
      );
    }

    const {
      requiredSkillIds,
      companyId: dtoCompanyId,
      ...jobOfferData
    } = updateJobOfferDto;
    let dataToUpdate: Prisma.JobOfferUpdateInput = { ...jobOfferData };

    // Si un Admin puede cambiar la compañía de una oferta existente
    if (isAdmin && dtoCompanyId && dtoCompanyId !== jobOffer.companyId) {
      const companyExists = await this.prisma.company.findUnique({
        where: { id: dtoCompanyId },
        select: { id: true },
      });
      if (!companyExists) {
        throw new NotFoundException(
          `Company with ID ${dtoCompanyId} not found.`,
        );
      }
      dataToUpdate.company = { connect: { id: dtoCompanyId } };
    } else if (isAdmin && dtoCompanyId === null) {
      throw new BadRequestException('Cannot remove company association.');
    } else if (!isAdmin && dtoCompanyId !== undefined) {
      throw new ForbiddenException(
        'Recruiters cannot change the company of a job offer.',
      );
    }

    if (requiredSkillIds && requiredSkillIds.length > 0) {
      const skillsExist = await this.prisma.skill.findMany({
        where: { id: { in: requiredSkillIds } },
        select: { id: true },
      });
      if (skillsExist.length !== requiredSkillIds.length) {
        throw new BadRequestException(
          'One or more required skill IDs are invalid.',
        );
      }
    }

    if (requiredSkillIds !== undefined) {
      dataToUpdate.requiredSkills = {
        set: requiredSkillIds.map((id) => ({ id })),
      };
    }

    try {
      return await this.prisma.jobOffer.update({
        where: { id },
        data: dataToUpdate, 
        include: {
          company: true,
          requiredSkills: true,
          postedBy: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      });
    } catch (error) {
      console.error('Error updating job offer:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Database error: ${error.code}`);
      }
      throw new InternalServerErrorException('Could not update job offer.');
    }
  }

  async remove(id: string, user: User): Promise<JobOffer> {
    const jobOffer = await this.prisma.jobOffer.findUnique({
      where: { id },
      select: { postedById: true, companyId: true },
    });

    if (!jobOffer) {
      throw new NotFoundException(`Job Offer with ID ${id} not found.`);
    }

    const isOwner = jobOffer.postedById === user.id;
    const isAdmin = user.role === Role.ADMIN;
    // Aqui igual que en el update podemos hacer que el Admin pueda eliminar cualquier oferta,
    // Ejemplo: Permitir al Admin o al Recruiter propietario eliminar.
    if (!isAdmin && !isOwner) {
      throw new ForbiddenException(
        'You do not have permission to delete this job offer.',
      );
    }

    try {
      return await this.prisma.jobOffer.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting job offer:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Job Offer with ID ${id} not found for deletion.`,
          );
        }
        throw new InternalServerErrorException(`Database error: ${error.code}`);
      }
      throw new InternalServerErrorException('Could not delete job offer.');
    }
  }
}
