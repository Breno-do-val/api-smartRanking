import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto) {
        const { email } = createPlayerDto;
        return JSON.stringify(`{
            "nome": ${createPlayerDto.email} 
        }`);
    }
}
