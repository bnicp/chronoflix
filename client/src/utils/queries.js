import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
        }
    }
`;

export const GET_ALLUSERS = gql`
    query allUsers {
        allUsers {
            _id
            username
            email
        }
    }
`;