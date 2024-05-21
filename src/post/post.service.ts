import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { CreatepostDto, EditpostDto } from './dto';
import { CreateCommentDto, CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getAllPosts() {
    let allPosts = this.prisma.post.findMany();
    return allPosts;
  }
  async upvotePost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    const number_of_upvotes = post.upvotes;
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        upvotes: number_of_upvotes + 1,
      },
    });
  }
  async unvotePost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    const number_of_upvotes = post.upvotes;
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        upvotes: number_of_upvotes - 1,
      },
    });
  }
  getPosts(userId: number) {
    let allposts = this.prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });
    // let requiredData =
    return allposts;
  }

  getPostById(postId: number) {
    return this.prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        ...dto,
      },
    });
    return post;
  }

  async editPostById(userId: number, postId: number, dto: EditPostDto) {
    // get the post by id
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // check if user owns the post
    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }

  

  async deletePostById(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // check if user owns the post
    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
  async createComment(userId: number, postId: number, dto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        userId,
        postId,
        ...dto,
      },
    });
  }
  async getComment(commentId: number,postId:number) {
    return await this.prisma.comment.findUnique({
      where: {
        id: commentId,
        postId : postId
      }
    })
  }
  async replyComment(
    userId: number,
    originalCommentId: number,
    dto: CreateCommentDto,
    postId: number,
  ) {
    return await this.prisma.comment.create({
      data: {
        userId,
        postId,
        replyTo: originalCommentId,
        ...dto,
      },
    });
  }
  async editComment(userId: number, commentId: number, newComment: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    const post = await this.prisma.post.findUnique({
      where: {
        id: comment.postId,
      },
    });
    if (!comment || !post || post.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        comment: newComment,
      },
    });
  }
  async deleteComment(userId: number, commentId: number, newComment: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    const post = await this.prisma.post.findUnique({
      where: {
        id: comment.postId,
      },
    });
    if (!comment || !post || post.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
  async getAllComents(postId: number) {
    const post = await this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
    if (!post) {
      throw new ForbiddenException('no such post');
    }
    return post;
  }
}
let txt = 'My name is John Doe Amadi, I love humanity';
function recurringLetter() {
  let data = [];
  let count = 0;
  let toLowerCase = txt.toLowerCase();
  let toArr = toLowerCase.split('');
  let trimmedArr = [];
  for (let i = 0; i <= toArr.length - 1; i++) {
    if (toArr[i] !== ' ') {
      trimmedArr.push(toArr[i]);
    }
  }
  for (let i = 0; i <= trimmedArr.length - 1; i++) {
    count = 0;
    for (let j = 1; j <= trimmedArr.length - 1; j++) {
      if (trimmedArr[i] === trimmedArr[j]) {
        count++;
        data.push({ letter: trimmedArr[i], count });
      }
    }
  }
  let sortedData = data.sort(
    (firstItem, secondItem) => secondItem.count - firstItem.count,
  );
  let requiredLetter = sortedData[0].letter;
  return requiredLetter;
}
