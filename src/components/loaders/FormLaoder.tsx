const FormSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative w-16 h-16 flex justify-center items-center">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-6 h-6 bg-secondary-dark rounded-full"
            style={{
              transform: `rotate(${index * 30}deg) translateY(-120%)`,
              animation: `fade 1.2s linear infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
      <style>
        {`
          @keyframes fade {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default FormSpinner;
