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
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { PostService } from './post.service';
import { CreateCommentDto, CreatePostDto, EditPostDto } from './dto';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('news')
  getAllPosts() {
    return this.postService.getAllPosts();
  }
  // The one below is to get all posts that the user has created
  @Get()
  getposts(@GetUser('id') userId: number) {
    return this.postService.getPosts(userId);
  }

  @Get('item')
  getpostById(
    // @GetUser('id') userId: number,
    @Query('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.getPostById(postId);
  }

  @UseGuards(JwtGuard)
  @Post('submit')
  createpost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Patch('edit')
  editpostById(
    @GetUser('id') userId: number,
    @Query('id', ParseIntPipe) postId: number,
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

  @UseGuards(JwtGuard)
  @Post('item')
  comment(
    @GetUser('id') userId: number,
    @Query('id', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ) {
    console.log(userId);
    return this.postService.createComment(userId, postId, dto);
  }

  @Get('reply')
  getComment(
    // @GetUser('id') userId: number,
    @Query('comment', ParseIntPipe) commentId: number,
    @Query('post', ParseIntPipe) postId: number,o,
  ) {
    return this.postService.getComment(commentId,postId);
  }

  @UseGuards(JwtGuard)
  @Post('reply')
  replyComment(
    @GetUser('id') userId: number,
    @Query('comment', ParseIntPipe) commentId: number,
    @Query('post', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.postService.replyComment(userId, commentId, dto, postId);
  }
}
