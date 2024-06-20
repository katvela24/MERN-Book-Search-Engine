const { gql } = require('apollo-server-express');
const User = require("./models/User");
const Book = require("./models/Book");
const { getSingleUser, createUser, login, saveBook, deleteBook } = require("./controllers/user-controller");

// Declaring the Schema
const typeDefs = gql`
    type User {
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookID: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        getSingleUser(id:String): User
    }
    
    type Mutation {
        createUser(body:String): User
        login(body:String): User
        saveBook(user:String,body:String): Book
        deleteBook(user:String,params:String): Book    
    }
`
// Logic here
const resolvers = {
    Query: {
        getSingleUser: async (_, { user, id }) => 
            { return getSingleUser({user,id}) }
    },
    Mutation: {
        createUser: async (_,{body}) =>
            {return createUser({body})},
        login: async (_,{body}) =>
            { return login({body})},
        saveBook: async (_,{user,body}) =>
            { return saveBook({user,body})},
        deleteBook: async (_,{user,params}) =>
            { return deleteBook({user,params})},
    }


}

module.exports = {typeDefs,resolvers}