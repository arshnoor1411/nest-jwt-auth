import { MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @MinLength(1)
    @MaxLength(300)
    postContent: string
}
