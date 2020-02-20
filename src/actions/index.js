import {makeActionCreator} from '../helpers/makeActionCreator';

const CHANGE_DIRECTION = 'CHANGE_DIRECTION';

export const changeDirection = makeActionCreator(CHANGE_DIRECTION);