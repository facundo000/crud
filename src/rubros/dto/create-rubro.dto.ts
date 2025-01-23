import { IsString, MinLength } from "class-validator";


export class CreateRubroDto {
    @IsString()
    @MinLength(1)
    name: string
}
