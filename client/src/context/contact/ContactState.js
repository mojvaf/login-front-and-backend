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
    const { v4: uuidv4 } = require('uuid');

    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'sosan',
                email: 'ss@gmail.com',
                phone: '111-222-111',
                type: 'personal'
            },

            {
                id: 2,
                name: 'john',
                email: 'kk@gmail.com',
                phone: '222-222-111',
                type: 'personal'
            },

            {
                id: 3,
                name: 'jully',
                email: 'nn@gmail.com',
                phone: '333-222-111',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState)
    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4()
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // Delete contact
    const deleteContact = id => {

        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    // set current Contact

    const setCurrent = contact => {

        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // clear current contact

    const clearCurrent = () => {

        dispatch({ type: CLEAR_CURRENT })
    }

    // update contact
    const updateContact = contact => {

        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    // filter contacts
    const filterContacts = text => {

        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // clear filter

    const clearFilter = () => {

        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,

            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            filterContacts
        }}>
            {props.children}
        </ContactContext.Provider>

    )
}
export default ContactState