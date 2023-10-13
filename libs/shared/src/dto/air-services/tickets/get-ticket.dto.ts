import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { PaginationDto } from "../../common";

export class GetTicketByIdDto {
    @ApiProperty({
        type: String,
        required: true,
        example: "651d72b06c9932a97b031a34"
    })
    @IsMongoId()
    @IsNotEmpty()
    ticketId: string
}


export class GetAssociateAssetsDto extends PaginationDto {
    @ApiProperty({
        type: String,
        required: true,
        example: "651d72b06c9932a97b031a34"
    })
    @IsString()
    @IsNotEmpty()
    ticketId: string
}
