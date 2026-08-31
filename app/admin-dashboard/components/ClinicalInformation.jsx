import React from 'react'

export default function ClinicalInformation({formData, setFormData}) {
    return (
        <div className="mb-8">
            <h3 className="font-medium mb-4">
                Clinical Information
            </h3>

            <textarea
                className="border p-3 rounded-lg w-full"
                rows={4}
                placeholder="History of present illness"
                value={formData.aiScenario.clinicalData.historyOfPresentIllness}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            clinicalData: {
                                ...formData.aiScenario.clinicalData,
                                historyOfPresentIllness: e.target.value,
                            },
                        },
                    })
                }
            />

            <div className="grid md:grid-cols-2 gap-4 mt-4">

                <textarea
                    className="border p-3 rounded-lg"
                    rows={4}
                    placeholder="Present symptoms (comma separated)"
                    value={formData.aiScenario.clinicalData.symptoms.present}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                clinicalData: {
                                    ...formData.aiScenario.clinicalData,
                                    symptoms: {
                                        ...formData.aiScenario.clinicalData.symptoms,
                                        present: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

                <textarea
                    className="border p-3 rounded-lg"
                    rows={4}
                    placeholder="Absent symptoms (comma separated)"
                    value={formData.aiScenario.clinicalData.symptoms.absent}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                clinicalData: {
                                    ...formData.aiScenario.clinicalData,
                                    symptoms: {
                                        ...formData.aiScenario.clinicalData.symptoms,
                                        absent: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

            </div>

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={3}
                placeholder="Past medical history"
                value={formData.aiScenario.clinicalData.pastMedicalHistory}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            clinicalData: {
                                ...formData.aiScenario.clinicalData,
                                pastMedicalHistory: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={3}
                placeholder="Current medications"
                value={formData.aiScenario.clinicalData.medications}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            clinicalData: {
                                ...formData.aiScenario.clinicalData,
                                medications: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={3}
                placeholder="Allergies"
                value={formData.aiScenario.clinicalData.allergies}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            clinicalData: {
                                ...formData.aiScenario.clinicalData,
                                allergies: e.target.value,
                            },
                        },
                    })
                }
            />
        </div>
    )
}
