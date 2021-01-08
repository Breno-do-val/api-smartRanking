import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './interfaces/dtos/create-category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = createCategoryDto;

        const categoryFound = await this.categoryModel.findOne({ category }).exec();

        if (categoryFound) {
            throw new BadRequestException(`Category ${categoryFound} already registered`);
        }

        const categoryCreated = new this.categoryModel(createCategoryDto);
        return await categoryCreated.save();
    }

    async consultAllCategories(): Promise<Array<Category>> {
        return await this.categoryModel.find().exec();
    }

    async consultCategoryById(category: string): Promise<Category> {
        const categoryfound = await this.categoryModel.findOne({category}).exec();

        if (!categoryfound) {
            throw new NotFoundException(`Category S{category} not found!`);
        }

        return categoryfound;
    }
}
