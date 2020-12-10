import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(
        @InjectModel('Player') private readonly playerModel: Model<Player>
    ) { }

    private readonly logger = new Logger(PlayersService.name);

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {

        const { email } = createPlayerDto;

        const playerExists = await this.playerModel.findOne({ email }).exec();

        if (playerExists) {
            throw new BadRequestException('Player already registered!');
        }

        const playerCreated = new this.playerModel(createPlayerDto);
        return await playerCreated.save();
    }

    async updatePlayer(_id: string, createPlayerDto: CreatePlayerDto): Promise<void> {

        const playerExists = await this.playerModel.findOne({ _id }).exec();

        if (!playerExists) {
            throw new NotFoundException('Player not found');
        }

        this.playerModel.findOneAndUpdate({ _id }, { $set: createPlayerDto });
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

}
