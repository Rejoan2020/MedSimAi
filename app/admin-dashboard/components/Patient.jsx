import React from 'react'

export default function Patient({formData, setFormData}) {
    console.log(formData)
    return (
        <div className="mt-10 border-t pt-8">
            <h2 className="text-xl font-semibold mb-6">
                AI Patient Scenario
            </h2>
 
            <div className="mb-8">
                <h3 className="font-medium mb-4">
                    Patient Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        className="border p-3 rounded-lg"
                        placeholder="Patient name"
                        value={formData.aiScenario.patient.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    patient: {
                                        ...formData.aiScenario.patient,
                                        name: e.target.value,
                                    },
                                },
                            })
                        }
                    />

                    <input
                        className="border p-3 rounded-lg"
                        type="number"
                        placeholder="Age"
                        value={formData.aiScenario.patient.age}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    patient: {
                                        ...formData.aiScenario.patient,
                                        age: e.target.value,
                                    },
                                },
                            })
                        }
                    />

                    <select
                        className="border p-3 rounded-lg"
                        value={formData.aiScenario.patient.gender}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    patient: {
                                        ...formData.aiScenario.patient,
                                        gender: e.target.value,
                                    },
                                },
                            })
                        }
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <input
                        className="border p-3 rounded-lg"
                        placeholder="Occupation"
                        value={formData.aiScenario.patient.occupation}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    patient: {
                                        ...formData.aiScenario.patient,
                                        occupation: e.target.value,
                                    },
                                },
                            })
                        }
                    />

                </div>

                <textarea
                    className="border p-3 rounded-lg w-full mt-4"
                    rows={3}
                    placeholder="Patient personality"
                    value={formData.aiScenario.patient.personality}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                patient: {
                                    ...formData.aiScenario.patient,
                                    personality: e.target.value,
                                },
                            },
                        })
                    }
                />
            </div>
        </div>
    )
}
