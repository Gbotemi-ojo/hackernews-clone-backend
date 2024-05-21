import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  url: string;
}
