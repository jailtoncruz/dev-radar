export const SERVER_PORT: number = Number(process.env.SERVER_PORT ?? 3333)

export const MONGODB_URL: string = process.env.MONGODB_URL ?? 'localhost'
export const MONGODB_PORT: number = Number(process.env.MONGODB_PORT ?? 27017);
export const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE ?? 'test'