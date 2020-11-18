const axios = require('axios');
const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => {
        return {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            users: {
                type: GraphQLList(UserType),
                resolve: (parentValue, args) => {
                    return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                        .then(res => res.data);
                }
            }
        };
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve: (parentValue, args) => {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { 
                id: { type: GraphQLString } 
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data);
            }
        },
        company: {
            type: CompanyType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parentValue, args) => {
                return axios.get(`http://localhost:3000/companies/${args.id}`)  
                    .then(res => res.data);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLString },
                companyId: { type: GraphQLString }
            },
            resolve: (parentValue, { firstName, age }) => {
                return axios.post('http://localhost:3000/users', {
                    firstName,
                    age
                }).then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parentValue, { id }) => {
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(res => {console.log(res.data); res.data});
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLString },
                companyId: { type: GraphQLString }
            },
            resolve: (parentValue, args) => {
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
