import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://breno:m1cr0s3rv1c3s@cluster0.fxdie.mongodb.net/microservices?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    ),
    PlayersModule,
    CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
