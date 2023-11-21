import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";



export class CreateTaskDto {

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString({ message: 'Description must be valid text' })
  @IsNotEmpty({ message: 'Description is required!' })
  @MinLength(8,{ message: `task's description should have at least 8 characters ` })
  description: string;

}
