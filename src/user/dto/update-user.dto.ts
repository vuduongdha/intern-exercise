import { PartialType } from '@nestjs/mapped-types';
import { UserDTO } from './create-user.dto';

export class UpdateDTO extends PartialType(UserDTO) {}
