"use client"
import Image from 'next/image'

const ApiLoader = ({ loading }: { loading: boolean }) => {
    if (!loading) return null
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            {/* <div className="bg-white rounded-full h-72 w-72"> */}
                <div className="relative loader_img w-60 lg:w-72 h-60 lg:h-72  bg-white rounded-full flex justify-center items-center">
                    <Image
                        height={64}
                        width={64}
                        src={'/assets/svg/auth-midlogo.svg'}
                        alt="logo"
                        className="w-10 animate-bounce sm:w-16" />
                </div>
            {/* </div7 */}
        </div>
    )
}

export default ApiLoader