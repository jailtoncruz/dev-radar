import axios from 'axios';
import { Request, Response } from 'express';
import { Dev } from '../../domain/Dev';
import { parseStringAsArray } from '../../../core/utils/parseStringAsArray';
import { findConnections, sendMessage } from '../../../ws';

export class DevController {
    static async store(req: Request, res: Response) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name, avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, techsArray)

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    };

    static async index(req: Request, res: Response) {
        const devs = await Dev.find();

        return res.json(devs);
    }
}