///  crate a type definition  ///

//import the gql tagged template function
//All of our type definitions will go into the typeDefs "tagged template function".
const { gql } = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`
type Query {
    helloWorld: String
}
`;


//export the typeDefs
module.exports = typeDefs;
