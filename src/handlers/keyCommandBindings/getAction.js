import { pipe } from '@nifi/helpers/pipe.js'

export const getAction = action => {
    return pipe(action)
}