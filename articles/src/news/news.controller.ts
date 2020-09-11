import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDTO } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) { }

  // add a news
  @Post('/')
  async addNews(@Res() res, @Body() createNewsDTO: NewsDTO) {
      const news = await this.newsService.addNews(createNewsDTO);
      return res.status(HttpStatus.OK).json({
          message: "News has been created successfully",
          news
      })
  }

  // Retrieve news list
  @Get('/')
  async getAllNews(@Res() res) {
      const news = await this.newsService.getAllNews();
      return res.status(HttpStatus.OK).json(news);
  }

  // Fetch a particular news using ID
  @Get('/:newsID')
  async getNews(@Res() res, @Param('newsID') newsID) {
      const news = await this.newsService.getNews(newsID);
      if (!news) throw new NotFoundException('News does not exist!');
      return res.status(HttpStatus.OK).json(news);
  }

  @Put('/update')
    async updateNews(@Res() res, @Query('newsID') newsID, @Body() createNewsDTO: NewsDTO) {
        const news = await this.newsService.updateNews(newsID, createNewsDTO);
        if (!news) throw new NotFoundException('News does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'News has been successfully updated',
            news
        });
    }

    // Delete a news
    @Delete('/delete')
    async deleteNews(@Res() res, @Query('newsID') newsID) {
        const news = await this.newsService.deleteNews(newsID);
        if (!news) throw new NotFoundException('News does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'News has been deleted',
            news
        })
    }
}
