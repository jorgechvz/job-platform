import { Role } from 'generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    example: 'clqj9z1x00000u4zpgyqi5k4a',
    description: 'Unique user identifier',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'Jane Doe',
    description: 'User full name',
    required: false,
  })
  name?: string | null;

  @ApiProperty({ example: 'STUDENT', enum: Role, description: 'User role' })
  role: Role;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'User avatar URL',
    required: false,
  })
  avatarUrl?: string | null; // Mapeado desde 'image' en Prisma

  @ApiProperty({
    example: '2025-04-30T10:00:00.000Z',
    description: 'Timestamp of user creation',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-04-30T12:30:00.000Z',
    description: 'Timestamp of last user update',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
