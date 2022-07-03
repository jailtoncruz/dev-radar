import mongoose from 'mongoose';
import { PointSchema } from '../../core/domain/PointSchema';

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

export const Dev = mongoose.model('Dev', DevSchema);