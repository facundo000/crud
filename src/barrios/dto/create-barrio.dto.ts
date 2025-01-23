import { IsString, MinLength } from "class-validator";


export class CreateBarrioDto {

    @IsString()
    @MinLength(3)
    name: string;
    
}
