interface ButtonProps {
  value: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: (e: any) => void;
}

export const Button = ({ type, value, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="border border-slate-100 rounded-md bg-blue-500 text-white px-2 py-1 w-full cursor-pointer"
    >
      {value}
    </button>
  );
};
