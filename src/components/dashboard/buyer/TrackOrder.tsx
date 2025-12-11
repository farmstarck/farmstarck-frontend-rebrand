"use client";
import ModalLayout from "@/layouts/ModalLayout";
import { Check, Clock, MapIcon, MapPin, PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TrackOrderProps {
    isOpen: boolean;
    onClose: () => void;
}
const TrackOrder = ({ onClose, isOpen }: TrackOrderProps) => {
    if (!isOpen) return null;
    return (
        <ModalLayout onClose={onClose} >
            <div className="max-w-md mx-auto p-6">
                {/* HEADER */}
                <div className="flex items-center gap-3">
                    <div className="w-10 animate-pulse h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="text-primary animate-pulse" size={24} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Track your order</h2>
                        <p className="text-sm text-gray-500 -mt-1">Order Status</p>
                    </div>
                </div>

                <hr className="my-5 bg-dark-green" />

                {/* TIMELINE ITEMS */}
                <div className="space-y-8">

                    {/* ITEM — ORDER RECEIVED */}
                    <div className="relative pl-10">
                        {/* Line */}
                        <div className="absolute left-3 top-7 w-[2px] h-full border border-dashed border-primary/30"></div>

                        {/* Icon */}
                        <div className="absolute left-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            <Check size={14} />
                        </div>

                        <h3 className="font-semibold text-primary">Order Received</h3>

                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Clock size={14} />
                            <span>9:10 AM, 19 Jan 2023</span>
                        </div>
                    </div>

                    {/* ITEM — READY TO SHIP */}
                    <div className="relative pl-10">
                        <div className="absolute left-3 top-7 w-[2px] h-full border border-dashed border-primary/30"></div>

                        <div className="absolute left-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            <Check size={14} />
                        </div>

                        <h3 className="font-semibold  text-primary">Ready to Ship</h3>

                        <div className="flex items-center  gap-2 text-gray-500 text-sm mt-1">
                            <Clock size={14} />
                            <span>9:10 AM, 19 Jan 2023</span>
                        </div>
                    </div>

                    {/* ITEM — ORDER SHIPPED */}
                    <div className="relative pl-10">
                        <div className="absolute left-3 top-7 w-[2px] h-full border border-dashed border-primary/30"></div>

                        <div className="absolute left-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            <Check size={14} />
                        </div>

                        <h3 className="font-semibold text-primary">Order Shipped</h3>

                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Clock size={14} />
                            <span>9:10 AM, 19 Jan 2023</span>
                        </div>
                    </div>

                    {/* ITEM — DELIVERED */}
                    <div className="relative pl-10">
                        {/* Final icon */}
                        <div className="absolute left-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white">
                            <PackageCheck size={14} />
                        </div>

                        <h3 className="font-semibold text-primary">Order Delivered</h3>

                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Clock size={14} />
                            <span>9:10 AM, 19 Jan 2023</span>
                        </div>

                        <p className="text-gray-500 text-sm mt-2">
                            The order has been delivered to the customer
                        </p>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="mt-8">
                    <Link
                        href={'/contact'}
                        className="text-center text-sm  text-gray-500">
                        Have a problem?{" "}
                        <span className="text-primary font-medium cursor-pointer">Contact us</span>
                    </Link>
                </div>
            </div>
        </ModalLayout>
    );
};

export default TrackOrder;
