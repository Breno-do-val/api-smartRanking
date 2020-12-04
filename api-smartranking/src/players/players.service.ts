import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {

        const { email } = createPlayerDto;
        const playerExists = this.players.find(player => player.email === email);

        if (playerExists) {
            this.update(playerExists, createPlayerDto);
            return;
        }

        this.create(createPlayerDto);

    }

    async retrieveAll(): Promise<Player[]> {
        return await this.players;
    }

    async findOne(email: string): Promise<Player> {

        try {
            const foundPlayer = await this.players.find(player => player.email === email);
            return foundPlayer;
        } catch (error) {
            throw new NotFoundException(`Player with email ${email} not found!`);
        }

    }

    async delete(email: string): Promise<void> {
        try {
            const player = await this.players.findIndex(player => player.email === email);
            this.players.splice(player, 1);
        } catch (error) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }
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

    private update(playerExists: Player, createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;
        playerExists.name = name;
    }

}
