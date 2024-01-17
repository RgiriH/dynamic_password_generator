import { useState , useCallback,useEffect , useRef} from 'react'




function App() {
 
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charectorAllowed,setCharectorAllowed] = useState(false)
  const [password,setPassword] = useState("")

 //creating password generating function
  const  PasswordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charectorAllowed) str += "!@#$%^&*-=_+~"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charectorAllowed])

//coping the password
function copyPass(){
   reff.current.select()
   window.navigator.clipboard.writeText(password) 
}
  
 
 // appdating password 
useEffect(() => {PasswordGenrator()},[length,numberAllowed,charectorAllowed])

// using useRef to get the refrence
const reff = useRef(null)

  return (
    <>
     
      <div className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 mx-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value = {password}
          placeholder='Password'
          readOnly
          className='outline-none w-full py-1 px-3'
          ref = {reff}
           />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5
          shrink-0'
          onClick={copyPass}>copy</button>
          <button className='outline-none bg-red-700 text-white px-3 py-0.5
          shrink-0'
          onClick = {()=>{PasswordGenrator()}}>reload</button>
        </div>
        <div className='flex text-sum gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min = {6}
            max = {12}
            value = {length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)
              }} />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id = "numberInput"
            onChange={() =>{
              setNumberAllowed((pre) => !pre)
              
            }} />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {charectorAllowed}
            id = "charInput"
            onChange={() =>{
              setCharectorAllowed((pre) => !pre)
              }} />
            <label htmlFor="charInput">charector</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
