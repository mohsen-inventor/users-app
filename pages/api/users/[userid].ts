import type { NextApiRequest, NextApiResponse } from 'next';

import { User, UserResponse, ErrorResponse } from '../../../types/User';
import usersData from '../../../db/users.json';

// type GetUser = (userid: string) => User | undefined;

const getUser = (userid: string) => {
    return usersData.find((user) => user.id === userid);
};

const handler = (
    request: NextApiRequest,
    response: NextApiResponse<UserResponse | ErrorResponse>
): void => {
    const { method, query } = request;
    const { status } = response;

    switch (method) {
        case 'GET': {
            const stringifiedUserQuery = Array.isArray(query.userid)
                ? query.userid.join('')
                : query.userid;
            const user = getUser(stringifiedUserQuery);
            if (user) {
                status(200).json(user);
            } else {
                status(404).send('Not Found');
            }
            break;
        }

        default:
            status(405).send('Method Not Allowed');
            break;
    }
};

export default handler;
