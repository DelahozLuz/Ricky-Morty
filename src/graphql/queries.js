import { gql } from '@apollo/client';

export const GET_CHARACTER = gql`
  query GetCharacter($page: Int!) {
    characters(page: $page) {
      info {
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;
