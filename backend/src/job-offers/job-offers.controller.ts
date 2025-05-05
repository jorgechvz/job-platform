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
  ValidationPipe,
} from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { QueryJobOfferDto } from './dto/query-job-offer.dto';
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
import { Roles } from 'src/auth/guards/roles.decorator';
import { JobOfferStatus, Role } from 'generated/prisma';

@ApiTags('Job Offers')
@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job offer (Admin or Recruiter)' })
  @ApiBody({ type: CreateJobOfferDto })
  @ApiResponse({ status: 201, description: 'Job offer created successfully.' })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request (Validation failed or missing companyId for Admin).',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden (User role not allowed or Recruiter not associated with a company).',
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found (if creating as Admin).',
  })
  create(@Body() createJobOfferDto: CreateJobOfferDto, @Request() req) {
    return this.jobOffersService.create(createJobOfferDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of job offers (public, filterable)' })
  @ApiResponse({
    status: 200,
    description: 'List of job offers and total count.',
  })
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    queryDto: QueryJobOfferDto,
  ) {
    return this.jobOffersService.findAll(queryDto);
  }

  @Get('my-offers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECRUITER) // Solo para Recruiters
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get job offers created by the authenticated recruiter',
  })
  @ApiResponse({
    status: 200,
    description: 'List of own job offers and total count.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (User is not a Recruiter).',
  })
  // Documenta los query params heredados del DTO
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: JobOfferStatus })
  @ApiQuery({ name: 'title', required: false, type: String })
  // ... otros filtros relevantes de QueryJobOfferDto ...
  findMyOffers(
    @Request() req,
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    queryDto: QueryJobOfferDto,
  ) {
    return this.jobOffersService.findMyOffers(req.user, queryDto);
  }

  @Get('admin/all') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Solo para Admins
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all job offers (Admin access)' })
  @ApiResponse({
    status: 200,
    description: 'List of all job offers and total count.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (User is not an Admin).',
  })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: JobOfferStatus })
  @ApiQuery({
    name: 'companyId',
    required: false,
    type: String,
    description: 'Company UUID',
  })
  @ApiQuery({ name: 'title', required: false, type: String })
  findAllForAdmin(
    @Request() req,
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    queryDto: QueryJobOfferDto,
  ) {
    return this.jobOffersService.findAllForAdmin(req.user, queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific job offer by ID (public)' })
  @ApiParam({ name: 'id', type: String, description: 'Job Offer UUID' })
  @ApiResponse({ status: 200, description: 'Job offer details.' })
  @ApiResponse({ status: 404, description: 'Job offer not found.' })
  findOne(@Param('id') id: string) {
    return this.jobOffersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) // Solo Admin o Recruiter propietario
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a job offer' })
  @ApiParam({ name: 'id', type: String, description: 'Job Offer UUID' })
  @ApiBody({ type: UpdateJobOfferDto })
  @ApiResponse({ status: 200, description: 'Job offer updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden (Permission Denied).' })
  @ApiResponse({ status: 404, description: 'Job offer not found.' })
  update(
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
    @Request() req,
  ) {
    return this.jobOffersService.update(id, updateJobOfferDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RECRUITER) // Solo Admin o Recruiter propietario
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a job offer' })
  @ApiParam({ name: 'id', type: String, description: 'Job Offer UUID' })
  @ApiResponse({ status: 204, description: 'Job offer deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden (Permission Denied).' })
  @ApiResponse({ status: 404, description: 'Job offer not found.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.jobOffersService.remove(id, req.user);
  }
}
