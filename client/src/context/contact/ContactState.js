import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'ss',
                email: 'ss@gmail.com',
                phone: '111-222-111',
                type: 'personal'
            },

            {
                id: 2,
                name: 'kk',
                email: 'kk@gmail.com',
                phone: '222-222-111',
                type: 'personal'
            },

            {
                id: 3,
                name: 'nn',
                email: 'nn@gmail.com',
                phone: '333-222-111',
                type: 'personal'
            }
        ]
    }
    const [state, dispatch] = useReducer(contactReducer, initialState)

    return (
        <ContactContext.Provider value={{ contacts: state.contacts }}>
            {props.children}
        </ContactContext.Provider>

    )
}
export default ContactState