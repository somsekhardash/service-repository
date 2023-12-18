export interface IUserCreateDto {
    password: string;
    username: string;
    mobile: number;
    role?: string;
}

export interface IUserUpdateDto {
    password: string;
    username: string;
    role?: string;
}
