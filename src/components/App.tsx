import type { Context } from 'react'
import { createContext, useState } from 'react'

import type { AppState } from '@/types'
import defaultExecutionState from '@/utilities/defaultState'
import Befunge from '@/components/Befunge'
import { gridInit } from '@/grid'

const AppContext: Context<any> = createContext(null)

const initialAppState: AppState = {
  execution: defaultExecutionState,
  mode: 'edit',
  editMode: 'cell',
  programs: [
    { name: 'Factorial', code: ['&>:1-:v v *_$.@', ' ^    _$>\\:^'] },
    { name: 'Quine', code: ['01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@'] },
  ],
}

export default function App() {
  const [state, updateState] = useState(initialAppState)
  return (
    <AppContext.Provider value={{ state, updateState }}>
      <Befunge />
    </AppContext.Provider>
  )
}
