import {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

interface CodeInputProps {
  length: number;
  onComplete: (code: string) => void;
  setIsDisabled: (disabled: boolean) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  length,
  onComplete,
  setIsDisabled,
}) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newCode = [...code];

    newCode[index] = value;
    setCode(newCode);

    // Move to next input field if value is entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger onComplete if all fields are filled
    if (newCode.every((char) => char !== "")) {
      onComplete(newCode.join(""));
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newCode = pasteData.split("").slice(0, length);
    setCode(newCode);

    newCode.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
        if (index === length - 1) {
          inputRefs.current[index]!.focus();
        }
      }
    });

    if (newCode.length === length) {
      onComplete(newCode.join(""));
      setIsDisabled(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2 justify-between">
      {code.map((_, index) => (
        <input
          key={index}
          ref={(el) => {inputRefs.current[index] = el}}
          type="text"
          maxLength={1}
          className="w-8 h-8 sm:w-12 sm:h-12 text-center text-gray-800  bg-gray-200 border rounded focus:outline-none focus:border-secondary-dark focus:ring-1 focus:ring-border-secondary-dark focus:bg-white focus:text-secondary-dark"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined} // Handle paste only on the first input
        />
      ))}
    </div>
  );
};

export default CodeInput;
