import { AuthInput } from '@/components/common/auth/AuthInput'
import FormInput from '@/components/common/auth/FormInput'
import RouteBack from '@/components/common/auth/RouteBack'
import { CustomDropDown } from '@/components/common/CustomDropDown'
import { Upload, X } from 'lucide-react'
import React, { useState } from 'react'
import { ErrorMessage, SuccessMessage } from '@/utils/PageUtils'
import SuccessModal from '@/components/common/status/SuccessModal'
import FailureModal from '@/components/common/status/FaillureModal'

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}

const RaiseTicket = () => {
    const ticketCategory = [
        { label: 'Order Issue', value: 'Order Issue' },
        { label: 'Payment Issue', value: 'Payment Issue' },
        { label: 'Delivery Issue', value: 'Delivery Issue' },
        { label: 'Product Quality Issue', value: 'Product Quality Issue' },
        { label: 'Account / Login Issue', value: 'Account / Login Issue' },
        { label: 'Verification / KYC Issue', value: 'Verification / KYC Issue' },
        { label: 'Refund Request', value: 'Refund Request' },
        { label: 'Technical Issue (App/Web)', value: 'Technical Issue (App/Web)' },
        { label: 'Merchant Dispute', value: 'Merchant Dispute' },
        { label: 'Farmer Dispute', value: 'Farmer Dispute' },
        { label: 'Investment Dispute', value: 'Investment Dispute' },
        { label: 'Other', value: 'Other' },
    ]

    const ticketLevel = [
        { label: 'Urgent', value: "urgent" },
        { label: 'High', value: "high" },
        { label: 'Medium', value: "medium" },
        { label: 'Low', value: "low" },
    ]

    const [ticketData, setTicketData] = useState({
        category: '', 
        level: '', 
        title: '', 
        orderId: "", 
        product_name: '', 
        description: ""
    })

    const [images, setImages] = useState<ImageFile[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const MAX_IMAGES = 5
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

    const validateAndAddFiles = (files: FileList | File[]) => {
        const fileArray = Array.from(files)
        
        const remainingSlots = MAX_IMAGES - images.length
        if (remainingSlots <= 0) {
            ErrorMessage('Maximum 5 images allowed')
            return
        }

        const filesToAdd = fileArray.slice(0, remainingSlots)
        
        // Validate files
        for (const file of filesToAdd) {
            // Check file type
            if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                ErrorMessage('Only image files (jpeg, png, jpg) and PDFs are allowed')
                return
            }

            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                ErrorMessage('File size should not exceed 10MB')
                return
            }
        }

        const newImages: ImageFile[] = filesToAdd.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file)
        }))

        setImages(prev => [...prev, ...newImages])
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        validateAndAddFiles(files)
        
        // Reset input
        e.target.value = ''
    }

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            validateAndAddFiles(files)
        }
    }

    const removeImage = (id: string) => {
        setImages(prev => {
            const updated = prev.filter(img => img.id !== id)
            // Clean up URL
            const removed = prev.find(img => img.id === id)
            if (removed) {
                URL.revokeObjectURL(removed.preview)
            }
            return updated
        })
    }

    const handleSubmit = async () => {
        return setLoading(true)
        // Validation
        // if (!ticketData.category) {
        //     ErrorMessage('Please select an issue category')
        //     return
        // }
        // if (!ticketData.level) {
        //     ErrorMessage('Please select a priority level')
        //     return
        // }
        // if (!ticketData.title.trim()) {
        //     ErrorMessage('Please enter a ticket title')
        //     return
        // }
        // if (!ticketData.description.trim()) {
        //     ErrorMessage('Please describe your issue')
        //     return
        // }

        
        // setIsSubmitting(true)

        // try {
        //     // Create FormData for file upload
        //     const formData = new FormData()
        //     formData.append('category', ticketData.category)
        //     formData.append('level', ticketData.level)
        //     formData.append('title', ticketData.title)
        //     formData.append('orderId', ticketData.orderId)
        //     formData.append('product_name', ticketData.product_name)
        //     formData.append('description', ticketData.description)
            
        //     // Append images
        //     images.forEach((img, index) => {
        //         formData.append(`image_${index}`, img.file)
        //     })

        //     // Your API call here
        //     // await submitTicket(formData)

        //     SuccessMessage('Ticket submitted successfully!')
            
        //     // Reset form
        //     setTicketData({
        //         category: '', 
        //         level: '', 
        //         title: '', 
        //         orderId: "", 
        //         product_name: '', 
        //         description: ""
        //     })
        //     setImages([])

        // } catch (error) {
        //     ErrorMessage('Failed to submit ticket. Please try again.')
        // } finally {
        //     setIsSubmitting(false)
        // }
    }

    return (
        <RouteBack label='Raise a Ticket'>
            <div className="mb-4 font-bold text-lg lg:text-xl">Ticket Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className='w-full'>
                    <label className="block text-sm font-semibold mb-2">
                        Issue Category
                    </label>
                    <div className="w-full">
                        <CustomDropDown
                            textclass='!py-3'
                            width='full'
                            value={ticketData.category}
                            options={ticketCategory}
                            onChange={(e) => setTicketData({ ...ticketData, category: e })}
                            placeholder="Select Category"
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <label className="block text-sm font-semibold mb-2">
                        Priority Level
                    </label>
                    <div className="w-full">
                        <CustomDropDown
                            textclass='!py-3'
                            width='full'
                            value={ticketData.level}
                            options={ticketLevel}
                            onChange={(e) => setTicketData({ ...ticketData, level: e })}
                            placeholder="Select Level"
                        />
                    </div>
                </div>
                <AuthInput
                    label="Ticket Title"
                    type="text"
                    rounded='rounded-lg'
                    placeholder="Enter title"
                    value={ticketData.title}
                    onChange={(value) => setTicketData({ ...ticketData, title: value })}
                    auth={false}
                    colored={true}
                />
                <AuthInput
                    label="Order ID (If there is any order issue)"
                    type="text"
                    rounded='rounded-lg'
                    placeholder="Enter order id"
                    value={ticketData.orderId}
                    onChange={(value) => setTicketData({ ...ticketData, orderId: value })}
                    auth={false}
                    colored={true}
                />
                <AuthInput
                    label="Product Name (If there is any product issue)"
                    type="text"
                    rounded='rounded-lg'
                    placeholder="Enter product name"
                    value={ticketData.product_name}
                    onChange={(value) => setTicketData({ ...ticketData, product_name: value })}
                    auth={false}
                    colored={true}
                />
            </div>

            {/* Description */}
            <div className="w-full mt-5">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                </label>
                <div className="relative">
                    <textarea
                        value={ticketData.description}
                        onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                        placeholder="Describe your issue in detail"
                        className="w-full h-32 px-4 py-3.5 border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-all rounded-lg"
                    />
                </div>
            </div>

            {/* Image Upload Section */}
            <div className="w-full mt-5">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Attach Files (If necessary)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    Max 5 uploads. max size per file 10MB (jpeg, png, pdf)
                </p>

                <div className="space-y-4">
                    {/* Upload Button - Only show if less than 5 images */}
                    {images.length < MAX_IMAGES && (
                        <label 
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                                isDragging 
                                    ? 'border-primary bg-primary/10 scale-105' 
                                    : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                            }`}
                        >
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,application/pdf"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={isSubmitting}
                            />
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                                isDragging ? 'bg-primary/20' : 'bg-gray-100'
                            }`}>
                                <Upload className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
                            </p>
                        </label>
                    )}

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-5  gap-3">
                            {images.map((image) => (
                                <div key={image.id} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                                        <img
                                            src={image.preview}
                                            alt="Upload preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(image.id)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            <SuccessModal
             isOpen={loading}
             onClose={()=> setLoading(false)}
             back_cta={true}
             back_cta_title='Continue'
             back_cta_url='/auth/buyer/support/manage-tickets'
             description='Ticket created successfully'
            />
            {/* <FailureModal
             isOpen={loading}
             onClose={()=> setLoading(false)}
             description='Oops! an error occurred. Kindly check the information and try again '
            /> */}
        </RouteBack>
    )
}

export default RaiseTicket