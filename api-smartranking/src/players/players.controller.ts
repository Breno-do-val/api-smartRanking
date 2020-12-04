import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Post()
    async createUpdatePlayer(

        @Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);

    }

    @Get()
    async retrievePlayers(
        @Query('email') email: string
    ): Promise<Player[] | Player> {
        if (email) {
            return await this.playersService.findOne(email);
        }
        else {
            return await this.playersService.retrieveAll();
        }
    }

    @Delete()
    async remove(
        @Query('email') email: string): Promise<void> {
        await this.playersService.delete(email);
    }

}
