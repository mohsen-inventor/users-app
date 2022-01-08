// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import {
    UsersResponse,
    ErrorResponse,
    UserResponse,
} from '../../../types/User';
import usersDB from '../../../db/users.json';

// type GetPage = (page: number) => User[];

const getPage = (page: number) => {
    if (page < 1) return [];
    const SIZE = 9;
    const startIndex = page * SIZE - SIZE;
    const endIndex = startIndex + SIZE;
    return usersDB.slice(startIndex, endIndex);
};

const handler = (
    request: NextApiRequest,
    response: NextApiResponse<UsersResponse | UserResponse | ErrorResponse>
): void => {
    const { method, query } = request;
    const { status } = response;

    switch (method) {
        case 'GET': {
            const stringifiedPage = Array.isArray(query.page)
                ? query.page.join('')
                : query.page;
            const pageNum = Number(stringifiedPage ?? 1);
            if (isNaN(pageNum) || pageNum < 1) {
                status(400).send('Bad Request');
            } else {
                status(200).json({
                    count: usersDB.length,
                    page: pageNum,
                    results: getPage(pageNum),
                });
            }
            break;
        }
        case 'POST': {
            let updatedUsersDB = usersDB;
            const userToSave = request.body;

            const existingUser = usersDB.find(
                (user) => user.id === userToSave.id
            );

            // Update DB with existing user new data
            if (existingUser) {
                updatedUsersDB = usersDB.map((user) => {
                    return user.id === existingUser.id
                        ? { ...existingUser, ...userToSave }
                        : user;
                });
            }
            // Add new user
            else {
                updatedUsersDB.push(userToSave);
            }

            fs.writeFile(
                './db/users.json',
                JSON.stringify(updatedUsersDB),
                (err) => {
                    if (err) {
                        status(500).send('Server side error');
                    } else {
                        status(201).json(userToSave);
                    }
                }
            );
            break;
        }
        case 'DELETE': {
            const userId = request.body;

            console.log(request.body);

            const foundUser = usersDB.find((user) => user.id === userId);

            if (foundUser) {
                const updatedUsers = usersDB.filter(
                    (user) => user.id !== foundUser.id
                );
                fs.writeFile(
                    './db/users.json',
                    JSON.stringify(updatedUsers),
                    (err) => {
                        if (err) {
                            status(500).send('Server side error');
                        } else {
                            status(200).json(foundUser);
                        }
                    }
                );
            }

            break;
        }
        default:
            status(405).send('Method Not Allowed');
            break;
    }
};

export default handler;
