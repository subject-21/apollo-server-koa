import { Game, authorModel, gameModel, reviewModel } from "./models/index";

export const getGames = async () => await gameModel.find({});
export const getReviews = async () => await reviewModel.find({});
export const getAuthors = async () => await authorModel.find({});

export const getGame = async (gameId: string) => await gameModel.findOne({_id: gameId});
export const getAuthor = async (authorId: string) => await authorModel.findOne({_id: authorId});
export const getReview = async (reviewId: string) => await reviewModel.findOne({_id: reviewId});

export const getReviewByGameId = async (reviewId: string) => await reviewModel.findOne({game_id: reviewId});

export const createGame = async (game: Game) => await gameModel.create(game);
export const updateGame = async (game: Game) => {
    await gameModel.updateOne(game, {})
};
export const deleteGame = async (gameId: string) => {
    const gameDeleted = await gameModel.findOne({_id: gameId});
    await gameModel.deleteOne({_id: gameId})
    return gameDeleted;
};
