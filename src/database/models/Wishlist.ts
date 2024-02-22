import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Movie from './Movie';
import User from './User';

class Wishlist extends Model<InferAttributes<Wishlist>,
InferCreationAttributes<Wishlist>>{
  declare id: CreationOptional<number>;

  declare movieId: number;

  declare userId: number;

}

Wishlist.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  movieId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'movie_id'
  },

}, {
  sequelize: db,
  underscored: true,
  modelName: 'wishlists',
  timestamps: false,
});

User.belongsToMany(Movie, {
  foreignKey: 'userId',
  otherKey: 'movieId',
  as: 'movies',
  through: Wishlist
});
Movie.belongsToMany(User, { 
  foreignKey: 'movieId',
  otherKey: 'userId',
  as: 'users',
  through: Wishlist
});

export default Wishlist;
  