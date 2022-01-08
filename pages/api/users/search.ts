// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { UsersResponse, ErrorResponse } from '../../../types/User';
import usersDB from '../../../db/users.json';

const handler = (
    request: NextApiRequest,
    response: NextApiResponse<UsersResponse | ErrorResponse>
): void => {
    const { method, query } = request;
    const { status } = response;

    switch (method) {
        case 'GET': {
            const searchTerm = Array.isArray(query.term)
                ? query.term.join('')
                : query.term;
            if (query.term === null) {
                status(400).send('Bad Request');
            } else {
                let term = searchTerm.trim().toLowerCase();
                let foundUsers = [];

                if (term !== '') {
                    foundUsers = usersDB.filter((user) => {
                        return user.name.trim().toLowerCase().includes(term);
                    });
                } else {
                    foundUsers = usersDB.slice(0, 9);
                }

                status(200).json({
                    totalCount: usersDB.length,
                    matchCount: foundUsers.length,
                    term: searchTerm,
                    results: foundUsers,
                });
            }
            break;
        }

        default:
            status(405).send('Method Not Allowed');
            break;
    }
};

export default handler;
