import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Prisma, Role } from 'generated/prisma';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) // Solo Admin o Recruiter pueden crear
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: 'Company created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (Role not allowed or constraint violation).',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    // Nota: Un RECRUITER debería asociarse a esta empresa después, o el ADMIN asignarlo.
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of companies with optional filters' })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Records to skip (pagination)',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Records to take (pagination)',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by company name (case-insensitive, partial match)',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    type: String,
    description: 'Filter by company location (case-insensitive, partial match)',
  })
  @ApiQuery({
    name: 'isVerified',
    required: false,
    type: Boolean,
    description: 'Filter by verification status',
  })
  @ApiResponse({ status: 200, description: 'List of companies.' })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('name') name?: string,
    @Query('location') location?: string,
  ) {
    const where: Prisma.CompanyWhereInput = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    const params = {
      skip: skip ? parseInt(skip, 10) : undefined,
      take: take ? parseInt(take, 10) : undefined,
      where,
      orderBy: { createdAt: Prisma.SortOrder.desc },
    };
    return this.companiesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific company by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Company UUID' })
  @ApiResponse({ status: 200, description: 'Company details.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) // Solo Admin o Recruiter asociado
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({ name: 'id', type: String, description: 'Company UUID' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden (Permission Denied).' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Request() req, // Para obtener el usuario autenticado
  ) {
    return this.companiesService.update(id, updateCompanyDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) // Solo Admin o Recruiter asociado
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content para delete exitoso
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({ name: 'id', type: String, description: 'Company UUID' })
  @ApiResponse({ status: 204, description: 'Company deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden (Permission Denied).' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.companiesService.remove(id, req.user);
  }
}
