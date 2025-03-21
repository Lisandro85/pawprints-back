import { SetMetadata } from '@nestjs/common';
import { Role } from './enum.role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
