import { IsString, MinLength } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  @MinLength(1)
  path!: string; // can be full or relative; basename used for deletion
}