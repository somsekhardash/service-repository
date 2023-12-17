export interface IUserCreateDto {
    password: string;
    username: string;
    mobileNumber: number;
    role?: string;
}

export interface IUserUpdateDto {
    password: string;
    username: string;
    role?: string;
}
