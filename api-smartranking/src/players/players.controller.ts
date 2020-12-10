import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto: CreatePlayerDto): Promise<void> {
        await this.playersService.createPlayer(createPlayerDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() createPlayerDto: CreatePlayerDto,
        @Param('_id', PlayersValidationParamsPipe) _id: string): Promise<void> {
        await this.playersService.updatePlayer(_id, createPlayerDto);
    }

    @Get()
    async retrievePlayers(): Promise<Player[]> {
        return await this.playersService.retrieveAll();
    }

    @Get('/:_id')
    async retrievePlayerById(
        @Param('_id', PlayersValidationParamsPipe) _id: string): Promise<Player> {
        return await this.playersService.findOne(_id);
    }

    @Delete('/:_id')
    async remove(
        @Param('_idl', PlayersValidationParamsPipe) _id: string): Promise<void> {
        await this.playersService.delete(_id);
    }

}
