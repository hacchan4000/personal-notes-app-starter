import React, { useState } from 'react'

const useInput = (defaultVal:string) => {
  const [value, setValue] = useState(defaultVal)
  const handleVal = (e:any) => setValue(e.target.value)

  return [value, handleVal]
}

export default useInput