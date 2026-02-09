"use client";
import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

// Multi-select Dropdown Component
export const MultiSelectDropdown = ({ label, options, selected, onChange, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherValue, setOtherValue] = useState('');

    const handleToggle = (option, e) => {
        // Prevent event from bubbling up to parent elements
        if (e) {
            e.stopPropagation();
        }

        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];

        onChange(newSelected);

        // Show/hide "Other" text input
        if (option === 'Other') {
            setShowOtherInput(!selected.includes(option));
        }
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all"
                >
                    <span className="text-gray-900 dark:text-white truncate">
                        {selected.length > 0 ? `${selected.length} selected` : 'Select options...'}
                    </span>
                    <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                        {options.map((option, index) => (
                            <label
                                key={index}
                                className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={(e) => handleToggle(option, e)}
                                    className="w-4 h-4 text-[#6B46E5] border-gray-300 rounded focus:ring-[#6B46E5]"
                                />
                                <span className="ml-3 text-gray-900 dark:text-white text-sm">{option}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Show selected items */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((item, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#6B46E5]/10 text-[#6B46E5] rounded-full text-xs font-medium"
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => handleToggle(item)}
                                className="hover:bg-[#6B46E5]/20 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Other Track/Cert input */}
            {showOtherInput && selected.includes('Other') && (
                <input
                    type="text"
                    placeholder="Please specify other track/certification"
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    className="w-full mt-2 px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                />
            )}
        </div>
    );
};

// Deployment Form Component
export const DeploymentForm = ({ formType, onClose }) => {
    const trackOptions = [
        'SOC L1',
        'SOC L2',
        'SOC L3',
        'DFIR',
        'Cloud Security',
        'Purple Team',
        'Custom Track',
        'Cisco CCNA',
        'CEH',
        'CompTIA Security+',
        'CompTIA CySA+',
        'MITRE ATT&CK',
        'Other'
    ];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        workEmail: '',
        phone: '',
        city: '',
        country: '',
        timezone: '',
        companyName: '',
        jobTitle: '',
        teamSize: '',
        deliveryMode: '',
        timeline: '',
        batchPreference: '',
        preferredSchedule: '',
        tracksInterested: [],
        message: '',
        onsiteLocation: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formType, formData);
        // Add your form submission logic here
        alert('Form submitted successfully!');
        onClose();
    };

    const getFormTitle = () => {
        switch (formType) {
            case 'JOIN_CLASSROOM':
                return 'Join Classroom Training';
            case 'START_UPLINK':
                return 'Start Online Access';
            case 'DEPLOY_TEAM':
                return 'Deploy Team Training';
            default:
                return 'Contact Form';
        }
    };

    const renderFormFields = () => {
        switch (formType) {
            case 'JOIN_CLASSROOM':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone/WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Preferred City/Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter your city"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Batch Preference <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="batchPreference"
                                required
                                value={formData.batchPreference}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select batch preference</option>
                                <option value="Weekdays">Weekdays</option>
                                <option value="Weekends">Weekends</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Timeline <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="timeline"
                                required
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select timeline</option>
                                <option value="Immediately">Immediately</option>
                                <option value="2–4 weeks">2–4 weeks</option>
                                <option value="Next month">Next month</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Track/Certification Interested In"
                                options={trackOptions}
                                selected={formData.tracksInterested}
                                onChange={(selected) => setFormData(prev => ({ ...prev, tracksInterested: selected }))}
                                required={true}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message/Requirement <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white resize-none"
                                placeholder="Tell us about your requirements..."
                            />
                        </div>
                    </>
                );

            case 'START_UPLINK':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone/WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                required
                                value={formData.country}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter your country"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Timezone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="timezone"
                                required
                                value={formData.timezone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="e.g., UTC+5:30, EST, PST"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Preferred Schedule <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="preferredSchedule"
                                required
                                value={formData.preferredSchedule}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select schedule</option>
                                <option value="Morning">Morning</option>
                                <option value="Evening">Evening</option>
                                <option value="Weekend">Weekend</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Track/Certification Interested In"
                                options={trackOptions}
                                selected={formData.tracksInterested}
                                onChange={(selected) => setFormData(prev => ({ ...prev, tracksInterested: selected }))}
                                required={true}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message/Requirement <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white resize-none"
                                placeholder="Tell us about your requirements..."
                            />
                        </div>
                    </>
                );

            case 'DEPLOY_TEAM':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Work Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="workEmail"
                                required
                                value={formData.workEmail}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="your.email@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone/WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                required
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Your company name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Job Title/Designation <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                required
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                placeholder="Your job title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Team Size <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="teamSize"
                                required
                                value={formData.teamSize}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select team size</option>
                                <option value="5–10">5–10</option>
                                <option value="10–25">10–25</option>
                                <option value="25–50">25–50</option>
                                <option value="50+">50+</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Delivery Mode <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="deliveryMode"
                                required
                                value={formData.deliveryMode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select delivery mode</option>
                                <option value="Onsite">Onsite</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Timeline <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="timeline"
                                required
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                            >
                                <option value="">Select timeline</option>
                                <option value="Immediate">Immediate</option>
                                <option value="This month">This month</option>
                                <option value="Next month">Next month</option>
                                <option value="This quarter">This quarter</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <MultiSelectDropdown
                                label="Track/Certification Interested In"
                                options={trackOptions}
                                selected={formData.tracksInterested}
                                onChange={(selected) => setFormData(prev => ({ ...prev, tracksInterested: selected }))}
                                required={true}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message/Requirement <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white resize-none"
                                placeholder="Tell us about your requirements..."
                            />
                        </div>

                        {/* Conditional Onsite Location field */}
                        {(formData.deliveryMode === 'Onsite' || formData.deliveryMode === 'Hybrid') && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Onsite Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="onsiteLocation"
                                    required
                                    value={formData.onsiteLocation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-[#0B0420] border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46E5] focus:border-transparent transition-all text-gray-900 dark:text-white"
                                    placeholder="Enter onsite location"
                                />
                            </div>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B0420] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-[#0B0420] border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getFormTitle()}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFormFields()}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#6B46E5] text-white rounded-lg font-semibold hover:bg-[#5a38c7] transition-all shadow-lg shadow-[#6B46E5]/20"
                        >
                            Submit Request
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
