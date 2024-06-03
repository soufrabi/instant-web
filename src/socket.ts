"use client"

import { io } from 'socket.io-client'
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? "https://domain.tld" : 'http://localhost:3500';

export const socket = io(URL, {
    autoConnect: false
})
