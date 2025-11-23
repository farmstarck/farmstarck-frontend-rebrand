import toast from "react-hot-toast";



export const ErrorMessage = (message: string, bg: "red" | "blue" | "orange" = "red") => {
    return toast.error(message, {
        position: "top-right",
        duration: 4000,
        style: {
            backgroundColor: bg === 'red' ? "#dc2626" : bg === 'orange' ? "#ea580c" : "#dc2626",
            color: "#ffffff",
            fontSize: '14px'
        }
    });
};


export const SuccessMessage = (message: string) => {
    return toast.success(message, {
        position: "top-right",
        duration: 4000,
        style: {
            backgroundColor: 'white',
            color: '#00c700',
            fontSize: '14px'
        }

    })
}