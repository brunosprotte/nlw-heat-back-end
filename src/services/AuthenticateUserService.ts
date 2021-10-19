import axios from "axios";
import prismaClient from '../prisma';
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
    access_token: string;
}

interface IUsereResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {

        const url = "https://github.com/login/oauth/access_token";
        const client_id = process.env.GITHUB_CLIENT_ID;
        const client_secret = process.env.GITHUB_CLIENT_SECRET;

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params:{
                client_id,
                client_secret,
                code
            },
            headers:{
                "Accept": "application/json"
            }
        });

        const { access_token } = accessTokenResponse;

        const response = await axios.get<IUsereResponse>("https://api.github.com/user", {
            headers:{
                authorization: `Bearer ${access_token}`
            }
        });

        const {login, id, avatar_url, name} = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name: name ?  name : login
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );
        
        return {token, user};

    }
}

export { AuthenticateUserService };