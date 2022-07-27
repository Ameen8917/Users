import React, { createContext, useReducer } from 'react'

const initialState = [
    { id: 1, firstName: 'Joe', lastName: 'Harper', dob: "8/2/1959", isMarried: false, profileUrl: 'https://randomuser.me/api/portraits/men/80.jpg' },
    { id: 2, firstName: 'Michelle ', lastName: 'Ortiz', dob: "7/1/1960", isMarried: false, profileUrl: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: 3, firstName: 'Charlene', lastName: 'Kennedy', dob: "3/3/1945", isMarried: true, profileUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
];

export const UserContext = createContext(null);

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.payload];
        case 'UPDATE_USER':
            return state.map((user) => (user.id === action.payload.id ? action.payload.user : user))
        case 'DELETE_USER':
            return state.filter(user => user.id !== action.payload.id);
    }
}


export const UsersProvider = ({ children }) => {
    const [users, dispatch] = useReducer(usersReducer, initialState);

    const addUser = (user) => {
        dispatch({ type: 'ADD_USER', payload: user })
    }

    const updateUser = (id, user) => {
        dispatch({ type: 'UPDATE_USER', payload: { id, user } })
    }

    const deleteUser = (id) => {
        dispatch({ type: 'DELETE_USER', payload: { id: id } })
    }

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    )
}

