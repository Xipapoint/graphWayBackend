import { ICommand } from "@nestjs/cqrs";
import { ImageBlobType } from "../../domain/types/ImageType";

export class CreateSessionAlgorithmCommand implements ICommand {
    constructor(
        readonly title: string,
        readonly description: string,
        readonly image: ImageBlobType
    ){}
}