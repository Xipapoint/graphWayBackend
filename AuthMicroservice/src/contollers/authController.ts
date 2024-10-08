import { NextFunction, Request, Response } from "express";
import { IRegiterUserRequestDto } from "../dto/request/RegisterUserRequestDTO.dto";
import {IAuthServiceImpl} from "../services/impl/authServiceImpl";
import authService from "../services/authService";
import { ILoginUserRequestDto } from "../dto/request/LoginUserRequestDTO.dto";
import { IJwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";

class AuthController{
    private authService: IAuthServiceImpl;
    constructor( authService: IAuthServiceImpl){
        this.authService = authService;
    }
    async registration(req: Request<{}, {}, IRegiterUserRequestDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: IRegiterUserRequestDto = req.body;
            const tokens = await this.authService.registrationService(userData);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(tokens);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const userData: ILoginUserRequestDto = req.body;
            const tokens_id: IJwtUserResponseDto = await this.authService.login(userData)
            res.cookie('refreshToken', tokens_id.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController(authService);