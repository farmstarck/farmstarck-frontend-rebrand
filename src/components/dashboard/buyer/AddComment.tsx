import SuccessModal from '@/components/common/status/SuccessModal';
import ModalLayout from '@/layouts/ModalLayout'
import { ErrorMessage } from '@/utils/PageUtils';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

interface commentProps {
    isOpen: boolean
    onClose: () => void
}

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}
const AddComment = ({ isOpen, onClose }: commentProps) => {
    if (!isOpen) return null
    const [screen, setScreen] = useState<'add' | 'submitted'>('add')
    const [comment, setComment] = useState('')
    const [images, setImages] = useState<ImageFile[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
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


    const handleSubmit = () => {
        if (comment.trim() === '') {
            ErrorMessage('Please enter a description for your comment.')
            return
        }
        setScreen('submitted')
        setSuccess(true)
        console.log('Submitting comment:', comment)
        console.log('With images:', images)
    }

    return (
        <ModalLayout onClose={onClose} >
            {screen === 'add' && (

                <>
                    <div className="w-full mt-5 relative">
                        <div className="w-fit ml-auto">
                            <button
                                onClick={onClose}
                                className="absolute right-4 -top-5 text-gray-500 hover:text-gray-700"
                            >
                                <Image
                                    src={'/assets/images/status/cancel.png'}
                                    alt="cancel img" width={24} height={24} />
                            </button>
                        </div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Comment
                        </label>
                        <div className="relative">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="type your comment here..."
                                className="w-full min-h-24 px-4 py-3.5 border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-primary transition-all rounded-lg"
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
                                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging
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
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mb-3 transition-colors ${isDragging ? 'bg-primary/20' : 'bg-gray-100'
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
                </>
            )}

            <SuccessModal
                isOpen={success}
                onClose={() => { setSuccess(false); onClose(); }}
                description='Comment sent successfully'
            />
        </ModalLayout>
    )
}

export default AddComment