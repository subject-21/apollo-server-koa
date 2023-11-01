export const typeDefs = `#graphql
    type Game {
        title: String!
        platform: [String]!
        reviews: [Review!]
    }

    type Review {
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        games: [Game]
        authors: [Author]
        game(id: ID!): Game
        author(id: ID!): Author
        review(id: ID!): Review
    }


    type Mutation {
        deleteGame(id: ID!): Game
        addGame(game: AddGameInput!): Game
        updateGame(game: updateGameInput): Game
    }

    type Subscription {
        newGame: Game!
    }

    input AddGameInput {
        platform: [String]!
        title: String!
    }

    input updateGameInput {
        platform: [String!]
        title: String
    }
    
`