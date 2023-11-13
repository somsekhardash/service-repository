export interface IUserCreateDto {
    displayName: string;
    password: string;
    username: string;
    mobileNumber: number;
    role?: string;
}

export interface IUserUpdateDto {
    displayName: string;
    password: string;
    username: string;
    role?: string;
}
