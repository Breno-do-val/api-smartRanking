import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './interfaces/dtos/create-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto)
    }
}