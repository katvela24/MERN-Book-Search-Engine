const { gql } = require('apollo-server-express');
const User = require("./models/User");
const Book = require("./models/Book");
const { getSingleUser, createUser, login, saveBook, deleteBook } = require("./controllers/user-controller");

// Declaring the Schema
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int!
        savedBooks: [Book]
    }

    type Book {
     bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }
    
    type Mutation {
        addUser(username:String!, email:String!, password:String!): Auth
        login(email:String!, password: String!): Auth
        saveBook(bookInput: bookInput): User
        deleteBook(bookId: ID!): User    
    }

    input bookInput {
        description: String!
        title: String!
        bookId: ID!
        image: String
        link: String
    }
`
// Logic here
const resolvers = {
    Query: {
        me: async (_, __, context) => { return getSingleUser({context}) }
    },
    Mutation: {
        addUser: async (_, { username, email, password }) => { return createUser({ username, email, password }) },
        login: async (_, { email, password }) => { return login({ email, password }) },
        saveBook: async (_, { bookInput}, context) => { 
            console.log(context);
            return saveBook({ bookInput, context})},
        deleteBook: async (_, { bookId }, context) => { return deleteBook({ bookId, context }) },
    }


}

module.exports = { typeDefs, resolvers }