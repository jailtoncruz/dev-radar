import { Request, Response } from "express";
import { Dev } from '../../domain/Dev';

import { parseStringAsArray } from '../../../core/utils/parseStringAsArray';

export class SearchController {
    static async index(req: Request, res: Response) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(String(techs));

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json({ devs });
    }
}