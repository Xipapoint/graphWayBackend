import { IJwtUserResponseDto } from "../../dto/response/JwtUserResponseDTO.dto";
import { IRegiterUserRequestDto } from '../../dto/request/RegisterUserRequestDTO.dto';
import { ILoginUserRequestDto } from "../../dto/request/LoginUserRequestDTO.dto";

export interface IAuthServiceImpl{
    registrationService(RegisterData : IRegiterUserRequestDto) : Promise<IJwtUserResponseDto>,
    login(LoginData: ILoginUserRequestDto) : Promise<IJwtUserResponseDto> 
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        id: string;
    }>
    logout(refreshToken: string): Promise<void>
}