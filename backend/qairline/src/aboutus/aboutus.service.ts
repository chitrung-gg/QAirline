import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAboutusDto } from './dto/createAboutus.dto';
import { UpdateAboutusDto } from './dto/updateAboutus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aboutus } from './entity/aboutus.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AboutusService {
  constructor(
    @InjectRepository(Aboutus)
    private readonly aboutusRepository: Repository<Aboutus>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async createAboutus(aboutus: CreateAboutusDto) {
    await this.cacheManager.reset()
    const newAboutus = await this.aboutusRepository.create(aboutus)
    await this.aboutusRepository.save(newAboutus)
    return newAboutus
  }

  getAllAboutus() {
    return this.aboutusRepository.find()
  }

  async getAboutusById(id: number) {
    // TODO: may change to find with string for real case purposes
    const aboutus = await this.aboutusRepository.findOne({
      where: {
        id: id
      }
    });
    if (aboutus) {
      return aboutus;
    }
    throw new HttpException('Exception found in AboutusService: getAboutusById', HttpStatus.BAD_REQUEST)
  }

  async getAboutusByTitle(title: string) {
    // TODO: may change to find with string for real case purposes
    const aboutus = await this.aboutusRepository.find({
      where: {
        title: title 
      }
    });
    if (aboutus) {
      return aboutus;
    } else {
      return []
      throw new HttpException('Exception found in AboutusService: getAboutusByTitle', HttpStatus.BAD_REQUEST)
    }
  }

  async updateAboutus(id: number, aboutus: UpdateAboutusDto) {
    await this.cacheManager.reset()
    try {
      await this.getAboutusById(id)
      await this.aboutusRepository.update(id, aboutus)
    } catch (error) {
      throw new HttpException('Exception found in AboutusService: updateAboutus', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteAboutus(id: number) {
    await this.cacheManager.reset()
    const deleteResponse = await this.aboutusRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in AboutusService: deleteAboutus', HttpStatus.NOT_FOUND);
    }
  }
}
