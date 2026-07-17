import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
 
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    tags: string[];
}