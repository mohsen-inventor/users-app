export interface User {
    id: string;
    name: string;
    address: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

// The response type of /api/users
export type UsersResponse = {
    count: number;
    page: number;
    results: User[];
};

// The response type of /api/users/[id]
export type UserResponse = User;

// The response type of errors from /api/
export type ErrorResponse = string;
