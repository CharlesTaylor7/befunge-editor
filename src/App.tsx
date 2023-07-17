import Befunge from '@/components/Befunge'
import { gridInit } from '@/grid'

export default function App() {
  return (
    <>
      <Befunge
        initialState={{
          //...gridInit(['&>:1-:v v *_$.@', ' ^    _$>\\:^']),
          ...gridInit(['01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@']),
        }}
      />
    </>
  )
}
