import './App.css'
import { useState, useCallback, useEffect, useRef} from 'react'






function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [char, setChars] = useState(false);
  const [pwd,setpwd] = useState("");
  const pwdgenerator = useCallback(() => {
    let pass = ""; // Initialize with an empty string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    if (numberAllowed) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&-_+=[]{}~`";
    }
  
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
  
    setpwd(pass);
  }, [length, numberAllowed, char]);

  const pwdRef = useRef(null);
  const copyPwdToClip = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(pwd);
  }, [pwd]);
  useEffect(() => {
    pwdgenerator()
  },[length,numberAllowed, char, pwdgenerator])

  return (
    <>  
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-gray-700'>
        Password Generator
        <div className='flex shadow rounded-lg overflow-hidden m-4'>
          <input 
          type="text"
          value={pwd}
          className='outline-none w-full py-1 px-3 text-black'
          placeholder='password'
          readOnly
          ref = {pwdRef}
          />
          <button onClick={copyPwdToClip}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}} 
            />
            <label>Length : {length} </label>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }} 
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={char}
              id='characterInput'
              onChange={() => {
                setChars((prev) => !prev);
              }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default App
