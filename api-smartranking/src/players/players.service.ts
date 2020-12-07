import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>
    ) { }

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {

        const { email } = createPlayerDto;
        const playerExists = await this.playerModel.findOne({ email }).exec();

        if (playerExists) {
            this.update(createPlayerDto);
            return;
        }

        this.create(createPlayerDto);

    }

    async retrieveAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async findOne(email: string): Promise<any> {

        try {
            const foundPlayer = await this.playerModel.findOne({ email }).exec();
            return foundPlayer;
        } catch (error) {
            throw new NotFoundException(`Player with email ${email} not found!`);
        }

    }

    async delete(email: string): Promise<any> {
        try {
            return this.playerModel.deleteOne({ email }).exec();
        } catch (error) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {

        const playerCreated = new this.playerModel(createPlayerDto);
        return playerCreated.save();

    }

    private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {

        return this.playerModel.findOneAndUpdate({ email: createPlayerDto.name }, { $set: createPlayerDto })
    }

}
