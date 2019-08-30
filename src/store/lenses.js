import * as R from 'ramda'

export const gridLens = ({ x, y }) => R.lensPath(['grid', `${x}-${y}`]);
