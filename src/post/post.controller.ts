import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}


  @Get('all')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get()
  getposts(@GetUser('id') userId: number) {
    return this.postService.getPosts(userId);
  }

  @Get(':id')
  getpostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.getPostById(userId, postId);
  }

  @Post()
  createpost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Patch(':id')
  editpostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: EditPostDto,
  ) {
    return this.postService.editPostById(userId, postId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletepostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePostById(userId, postId);
  }
}
