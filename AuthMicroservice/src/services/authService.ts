import { Repository } from "typeorm";
import { User } from "../entities/User";
import { IAuthServiceImpl } from "./impl/authServiceImpl";
import { ILoginUserRequestDto } from "../dto/request/LoginUserRequestDTO.dto";
import { IRegiterUserRequestDto } from "../dto/request/RegisterUserRequestDTO.dto";
import { IJwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";
import { ISecureRegisterResponseDTO } from "../dto/response/SecureRegisterResponseDTO";
import { ITokenServiceImpl } from "./impl/tokenService.impl";
import { Helpers } from "../utils/helpers";
import { Security } from "../utils/security";
import bcrypt from 'bcrypt';


class AuthService implements IAuthServiceImpl{
    private tokenService: ITokenServiceImpl;
    private userRepository: Repository<User>;
    constructor(tokenService: ITokenServiceImpl, userRepository: Repository<User>){
        this.tokenService = tokenService;
        this.userRepository = userRepository
    }
    //PRIVATE

    private async secureRegisterData(RegisterData: IRegiterUserRequestDto): Promise<ISecureRegisterResponseDTO>{
        const hashedPassword: string = await Security.hash(RegisterData.password);
        const email: string = RegisterData.email;
        const addFriendLink: string= "http:/localhost:3000/addfriend/" + await Security.generateRandomUUID();
        const age: number = RegisterData.age;
        const username: string = RegisterData.username;

        return { hashedPassword, age, username, email }
    }



    // PUBLIC 
   async registrationService(RegisterData: IRegiterUserRequestDto) : Promise<IJwtUserResponseDto> {
        const existingUser = await this.userRepository.findOne({ where: { email: RegisterData.email } });
        if(existingUser){
            throw new Error("User already exists");
        }
        const secureData: ISecureRegisterResponseDTO = await this.secureRegisterData(RegisterData);
        const user: User = this.userRepository.create({...secureData})

        await this.userRepository.save(user)
        const rememberMe: boolean = true;
        const tokens: IJwtUserResponseDto = this.tokenService.generateTokens(user.id, user.age, rememberMe);
        return tokens
    }

    async login(LoginData: ILoginUserRequestDto): Promise<IJwtUserResponseDto> {
        const existingUser: User | null = await this.userRepository.findOne({
            where: [
              { email: LoginData.email },
              { username: LoginData.username }
            ]
          });
        if(existingUser === null){
            throw new Error("User doesnt exist");
        }
        const password: string = LoginData.password;
        const isPassEquals: boolean = await bcrypt.compare(password, existingUser.hashedPassword);
        if (!isPassEquals) {
            throw Error('Неверный пароль');
        }
        const tokens: IJwtUserResponseDto = this.tokenService.generateTokens(existingUser.id, existingUser.age, LoginData.rememberMe);
        await this.tokenService.saveToken(existingUser.id, tokens.refreshToken);
        return tokens;
    }
}