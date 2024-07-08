import { gql } from "@apollo/client"
export const login = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
    }
  }
}
`

export const addUser = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
    }
  }
}
`
export const saveBook = gql`
mutation saveBook($bookInput: bookInput) {
  saveBook(bookInput: $bookInput) {
    _id
    bookCount
  }
}
`

export const deleteBook = gql`
mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
  }
}
`

