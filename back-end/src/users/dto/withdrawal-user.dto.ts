import { IsEthereumAddress, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class WithdrawalUserDto {

    @IsNotEmpty()
    @IsEthereumAddress()
    address:string

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    value:string

}
