import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {

        await this.create(createPlayerDto);

    }

    private create(createPlayerDto: CreatePlayerDto): void {

        const { name, phoneNumber, email } = createPlayerDto;
        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlPhotoPlayer: 'www.google.com.br/foto123.jpg'
        };

        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`)
        this.players.push(player);
    }

}