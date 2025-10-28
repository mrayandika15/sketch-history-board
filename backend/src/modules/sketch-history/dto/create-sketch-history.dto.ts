import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSketchHistoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  data!: any;

  @IsOptional()
  @IsString()
  image?: string;
}
