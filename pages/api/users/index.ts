// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UsersResponse, ErrorResponse } from '../../../types/User';
import usersData from '../../../db/users.json';

type GetPage = (page: number) => User[];

const getPage: GetPage = (page) => {
    if (page < 1) return [];
    const SIZE = 9;
    const startIndex = page * SIZE - SIZE;
    const endIndex = startIndex + SIZE;
    return usersData.slice(startIndex, endIndex);
};

const handler = (
    request: NextApiRequest,
    response: NextApiResponse<UsersResponse | ErrorResponse>
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
                    count: usersData.length,
                    page: pageNum,
                    results: getPage(pageNum),
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
