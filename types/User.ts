export interface User {
    id: string;
    name: string;
    address: string;
    description: string;
    photoUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

// The response type of /api/users
export type UsersResponse = {
    totalCount?: number;
    matchCount?: number;
    term?: string;
    count?: number;
    page?: number;
    results: User[] | any;
};

// The response type of /api/users/[id]
export type UserResponse = User | any;

// The response type of errors from /api/
export type ErrorResponse = string;
