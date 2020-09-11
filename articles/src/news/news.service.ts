import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './interfaces/news.interface';
import { NewsDTO } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private newsModel: Model<News>) { }

  async getAllNews(): Promise<News[]> {
      const newss = await this.newsModel.find().exec();
      return newss;
  }

  async getNews(newsID): Promise<News> {
      const news = await this.newsModel
          .findById(newsID)
          .exec();
      return news;
  }

  async addNews(createNewsDTO: NewsDTO): Promise<News> {
      const newNews = await new this.newsModel(createNewsDTO);
      return newNews.save();
  }

  async updateNews(newsID, createNewsDTO: NewsDTO): Promise<News> {
      const editedNews = await this.newsModel
          .findByIdAndUpdate(newsID, createNewsDTO, { new: true });
      return editedNews;
  }

  async deleteNews(newsID): Promise<any> {
      const deletedNews = await this.newsModel
          .findByIdAndRemove(newsID);
      return deletedNews;
  }

}
