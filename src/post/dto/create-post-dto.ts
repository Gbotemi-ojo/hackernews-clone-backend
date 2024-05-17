import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  upvotes?: number;

  @IsString()
  url: string;

  @IsOptional()
  uploaded_At?: Date;
}
