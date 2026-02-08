const ButtonSpinner = () => {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <div className=" inset-0  h-[25px] w-[25px] animate-spin rounded-full border-4 border-transparent border-t-white" />
    </div>
  );
};

export default ButtonSpinner;
