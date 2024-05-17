import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment: string;

  @IsOptional()
  uploaded_At?: Date;
}
