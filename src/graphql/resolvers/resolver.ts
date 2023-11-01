import { authors, games, reviews } from "../../../data";
import {
    getGames,
    getAuthors,
    getReviews,
    getGame,
    getAuthor,
    getReview,
    createGame,
    deleteGame,
    updateGame
} from "../../dal/app.repository";
import { pubsub } from "../server";


export const resolvers = {
    Query: {
        games: () => getGames(),
        authors: () => getAuthors(),
        reviews: () => getReviews(),
        game: (_: any, { id }: any) => getGame(id),
        author: (_: any, { id }: any) => getAuthor(id),
        review: (_: any, { id }: any) => getReview(id),
    },
    Game: {
        reviews: (par: any) => reviews.filter(rev => rev.game_id === par.id)
    },
    Review: {
        author: (par: any) => authors.find(author => author.id == par.id),
        game: (par: any) => games.find(game => game.id == par.id)
    },
    Mutation: {
        deleteGame: (par: any, { id }: any) => deleteGame(id),
        addGame: (par: any, args: any) => {
            pubsub.publish("GAME_CREATED", {newGame: {...args.game}});
            return createGame({ ...args.game });
        },
        updateGame: (par: any, args: any) => updateGame({ ...args.game })
    },
    Subscription: {
        newGame: {
            subscribe: () => pubsub.asyncIterator("GAME_CREATED")
        }
    }
}