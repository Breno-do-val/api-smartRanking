import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidationParamsPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        if (!value) {
            throw new BadRequestException(`Value of parameter ${value} must be informed!`);
        }

        return value;
    }
}