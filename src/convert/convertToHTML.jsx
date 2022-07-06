import React from 'react'

import PosterContent from '@components/Poster/PosterContent.jsx'
import { renderToString } from 'react-dom/server'
export const convertToHTML = (content) => {
    return renderToString(<PosterContent  content={content}/>)
}