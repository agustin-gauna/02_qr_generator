
type ButtonProps = {
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode
  };

const Button: React.FC<ButtonProps> = ({handleOnClick, children}) => {
  return (
    <button className="relative p-0.5 g5 rounded-2xl shadow-500 group" onClick={handleOnClick}>
        <span className="relative flex items-center justify-center min-h-[60px] px-4 g4 rounded-2xl         inner-before group-hover:before:opacity-100 overflow-hidden">
            <span className="relative z-2 font-black text-p3 uppercase flex gap-2">{children}</span>
        </span>
        <span className="glow-before glow-after" />
    </button>
  )
}

export default Button