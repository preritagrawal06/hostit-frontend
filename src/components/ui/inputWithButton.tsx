import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"



export const InputWithButton = () => {
    const [visible, setVisible] = useState(false)
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type={visible ? "text" : "password"} placeholder="Password"/>
      <Button variant="outline" size="icon" onClick={()=>{setVisible(!visible)}}>
        {
            visible ?
            <img src="/openEye.svg" width={16} height={16}/>
            :
            <img src="/closeEye.svg" width={16} height={16}/>
        }
      </Button>
    </div>
  )
}
