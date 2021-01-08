import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get
    async consultCategory(): Promise<Array<Category>> {
        return await this.categoriesService.consultAllCategories();
    }

    @Get('/:category')
    async consultCategoryById(
        @Param('category') category: string): Promise<Category> {
            return await this.categoriesService.consultCategoryById(category);
    }
}