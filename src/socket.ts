"use client"

import { io } from 'socket.io-client'
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? process.env.WEBSITE_URL_DOMAIN! : 'http://localhost:3500';
const PATH = "/socket.io"

export const socket = io(URL, {
    autoConnect: false,
    path: PATH
})
