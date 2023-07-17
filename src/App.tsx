import Befunge from '@/components/Befunge'
import { gridInit } from '@/grid'

export default function App() {
  return (
    <>
      <Befunge
        initialState={{
          ...gridInit(['&>:1-:v v *_$.@', ' ^    _$>\\:^']),
        }}
      />
    </>
  )
}
