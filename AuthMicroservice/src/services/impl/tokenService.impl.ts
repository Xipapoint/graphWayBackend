import { JwtPayload } from "jsonwebtoken";
import { IJwtUserRequestDto } from "../../dto/request/JwtUserRequestDTO.dto";
import { IJwtUserResponseDto } from "../../dto/response/JwtUserResponseDTO.dto";
import { Token } from "../../entities/Tokens";

export interface ITokenServiceImpl{
    generateTokens(userId: string) : Promise<IJwtUserResponseDto>
    saveToken(userId: string, refreshToken: string): Promise<Token>
    verifyAccessToken(token: string): Promise<JwtPayload | null>
}