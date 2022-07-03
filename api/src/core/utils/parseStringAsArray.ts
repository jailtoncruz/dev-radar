export const parseStringAsArray = (arrayAsString: string) => {
    return arrayAsString.split(',').map(tech => tech.trim());
}