import * as mongoose from 'mongoose';
import { PlayersController } from '../players.controller';

export const PlayerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    name: String,
    ranking: String,
    rankingPosition: Number,
    urlPhotoPlayer: String
}, { timestamps: true, collection: 'players' });