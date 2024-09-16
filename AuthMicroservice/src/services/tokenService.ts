import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtUserRequestDto } from "../dto/request/JwtUserRequestDTO.dto";
import { Token } from "../entities/Tokens";
import { AppDataSource } from "../dataSource";
import { ITokenServiceImpl } from "./impl/tokenService.impl";
import { IJwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";
import { Repository } from "typeorm";

class tokenService implements ITokenServiceImpl{
    private jwt: typeof jwt;
    private tokenRepository: Repository<Token>;

    constructor(tokenRepository: Repository<Token>) {
        this.tokenRepository = tokenRepository
        this.jwt = jwt;
    }
    public async generateTokens(userId: string) : Promise<IJwtUserResponseDto> {
        const payload = {userId}
        const refreshTokenExpiry = '7d';
        const accessToken = this.jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '15m' }
        );
        const refreshToken = this.jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: refreshTokenExpiry }
        );
        const existingToken = await this.tokenRepository.findOne({ where: { userId } });
        console.log("is token existing:", existingToken);
        
        if (existingToken) {
            existingToken.refreshToken = refreshToken;
            await this.tokenRepository.save(existingToken);
        } else {
            const refreshTokenEntity: Token = this.tokenRepository.create({ userId, refreshToken });
            await this.tokenRepository.save(refreshTokenEntity);
        }
        return {
            accessToken,
            refreshToken,
            id: userId
        };
    }

    public async saveToken(userId: string, refreshToken: string): Promise<Token> {
        const tokenRepository = AppDataSource.getRepository(Token);
        const tokenData: Token | null = await tokenRepository.findOneBy({userId: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenRepository.save(tokenData);
        }
        const token = await tokenRepository.create({userId: userId, refreshToken})
        return token;
    }

    public async verifyAccessToken(token: string): Promise<JwtPayload | null> {
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
            return userData
        } catch(e){
            return null
        }

    }

    public async verifyRefreshToken(token: string): Promise<JwtPayload> {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    }

    public async findToken(refreshToken: string) {
        return await this.tokenRepository.findOneBy({refreshToken})
    }

    public async removeToken(refreshToken: string){
        await this.tokenRepository.delete({refreshToken})
        console.log("deleting");
        
    }

}

export default new tokenService(AppDataSource.getRepository(Token));
