/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dto/update-player.dto';

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

    async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {

        const playerExists = await this.playerModel.findOne({ _id }).exec();

        if (!playerExists) {
            throw new NotFoundException('Player not found');
        }

        await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto });
    }

    async retrieveAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async findOne(_id: string): Promise<any> {

        try {
            const foundPlayer = await this.playerModel.findOne({ _id }).exec();
            return foundPlayer;
        } catch (error) {
            throw new NotFoundException(`Player with email ${_id} not found!`);
        }
    }

    async delete(_id: string): Promise<any> {
        try {
            return this.playerModel.deleteOne({ _id }).exec();
        } catch (error) {
            throw new NotFoundException(`Player with email ${_id} not found`);
        }
    }

}
