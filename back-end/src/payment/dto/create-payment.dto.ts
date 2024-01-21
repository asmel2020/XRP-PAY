import { IsEmpty, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    value:string

    @IsString()
    @IsNotEmpty()
    concepto:string
}
