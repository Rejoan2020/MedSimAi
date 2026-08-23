'use client'

import { slugify } from '@/utils/slugify'
import React, { useState } from 'react'

export default function CreateCase() {
    const [formData, setFormData] = useState({
        title: '',
        slug:'',
        image: '',
        specialty: '',
        difficulty: 'Beginner',
        duration: 10,
        patient: {
            age: '',
            gender: 'Male',
        },
        chiefComplaint: '',
        description: '',
        tags: '',
        status: 'Not Started',
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePatientChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            patient: {
                ...prev.patient,
                [name]: value,
            },
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const caseData = {
            ...formData,
            slug: slugify(formData.title),
            duration: formData.duration+" minutes",
            patient: {
                age: Number(formData.patient.age),
                gender: formData.patient.gender,
            },
            tags: formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean),
        }

        const response = await fetch("/api/cases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(caseData)
        });
        
        const data = await response.json();
        if (data?.success) {
            setFormData({
                title: '',
                image: '',
                specialty: '',
                difficulty: 'Beginner',
                duration: 10,
                patient: {
                    age: '',
                    gender: 'Male',
                },
                chiefComplaint: '',
                description: '',
                tags: '',
                status: 'Not Started',
            })
        }

    }


    return (
        <div className=" m-10 rounded-xl border border-gray-200 bg-white p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Create New Case
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Create a clinical case for students to practice.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <section>
                    <h2 className="mb-4 text-lg font-semibold">
                        Basic Information
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2"> 
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Case title
                            </label>

                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Shortness of Breath"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20"
                                required
                            />
                        </div>  
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Specialty
                            </label>

                            <select
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                                required
                            >
                                <option value="">Select specialty</option>
                                <option value="Respiratory">Respiratory</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Difficulty
                            </label>

                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Duration (minutes)
                            </label>

                            <input
                                type="number"
                                name="duration"
                                min="1"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Image URL
                            </label>

                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="/cases/lungs.png"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                            />
                        </div>

                    </div>
                </section>
                <section>
                    <h2 className="mb-4 text-lg font-semibold">
                        Patient Information
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Patient age
                            </label>

                            <input
                                type="number"
                                name="age"
                                min="0"
                                max="120"
                                value={formData.patient.age}
                                onChange={handlePatientChange}
                                placeholder="45"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={formData.patient.gender}
                                onChange={handlePatientChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold">
                        Clinical Information
                    </h2>

                    <div className="flex flex-col gap-5">

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Chief complaint
                            </label>

                            <input
                                name="chiefComplaint"
                                value={formData.chiefComplaint}
                                onChange={handleChange}
                                placeholder="Progressive shortness of breath for 3 days."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Case description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Describe the patient's presentation..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Tags
                            </label>

                            <input
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="History Taking, Respiratory, Diagnosis"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                            />

                            <p className="mt-1 text-xs text-gray-500">
                                Separate tags with commas.
                            </p>
                        </div>

                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold">
                        Case Status
                    </h2>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue"
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="Active">Active</option>
                        <option value="Archived">Archived</option>
                    </select>
                </section>


                <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50"
                        onClick={() => setFormData({
                            title: '',
                            image: '',
                            specialty: '',
                            difficulty: 'Beginner',
                            duration: 10,
                            patient: {
                                age: '',
                                gender: 'Male',
                            },
                            chiefComplaint: '',
                            description: '',
                            tags: '',
                            status: 'Not Started',
                        })}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-light-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-500" 
                    >
                        Create Case
                    </button>

                </div>

            </form>
        </div>
    )
}