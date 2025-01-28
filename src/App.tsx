import Button from "./components/Button"
import { useState } from "react"

const App = () => {

  const [input, setInput] = useState('')
  const [qrCode, setQrCode] = useState('')


  const generateQrCode = async() => {
    if (!input) return; 
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(input)}`);
    
    if (response.ok) {
      const qrCodeUrl = response.url; 
      setQrCode(qrCodeUrl);
    } else {
      console.error("Error al generar el código QR");
    }
    
  }

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    generateQrCode()
  }

  const downloadQr = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qr-code.png'; 
    link.click();

    URL.revokeObjectURL(link.href);
};


  return (
    <main className="my-16 flex justify-center px-5 pb-20">
      <div className="flex flex-col gap-8 justify-center">
        <div className='flex flex-col gap-1'>
          <h4 className='caption text-p3 uppercase small-2'>Instant Creation</h4>
          <h1 className="font-black text-4xl md:h1 text-p4 uppercase">QR Code</h1>
          <h1 className="font-black text-4xl md:h1 text-p4 uppercase">Generator</h1>
        </div>
        
        <div className='flex flex-col gap-3'>

          <div className="flex flex-col md:flex-row gap-3">
            <input value={input}
              type="text" 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter you text or URL" 
              className='rounded-2xl px-4 py-[18px] bg-[#16213d] text-white flex-grow focus:outline-none focus:ring-2 focus:ring-p3'
            />
            <Button handleOnClick={handleOnClick}>Generate</Button> 
          </div>

          <div
            className={`bg-[#16213d] w-full rounded-2xl flex flex-col gap-6  justify-center transition-opacity duration-300 items-center p-4 py-10 ${
              qrCode ? "opacity-100" : "opacity-0"
            }`}
          >
      
            {qrCode && <img src={qrCode} alt="Generated QR Code" />}
            
          </div>

          {qrCode && (
            <Button
            handleOnClick={()=>downloadQr(qrCode)}
            > Download Qr Code
            </Button>
          )}
          
        </div>
          
          
          
        </div>
        
      
      
    </main>
  )
}

export default App