import React from 'react'

export default function Examination({formData, setFormData}) {
    return (
        <div className="mb-8">
            <h3 className="font-medium mb-4">
                Examination
            </h3>

            <textarea
                className="border p-3 rounded-lg w-full mb-4"
                rows={3}
                placeholder="General appearance"
                value={formData.aiScenario.examination.generalAppearance}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            examination: {
                                ...formData.aiScenario.examination,
                                generalAppearance: e.target.value,
                            },
                        },
                    })
                }
            />

            <div className="grid md:grid-cols-3 gap-4">

                <input
                    className="border p-3 rounded-lg"
                    placeholder="Temperature"
                    value={formData.aiScenario.examination.vitals.temperature}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                examination: {
                                    ...formData.aiScenario.examination,
                                    vitals: {
                                        ...formData.aiScenario.examination.vitals,
                                        temperature: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

                <input
                    className="border p-3 rounded-lg"
                    placeholder="Heart rate"
                    value={formData.aiScenario.examination.vitals.heartRate}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                examination: {
                                    ...formData.aiScenario.examination,
                                    vitals: {
                                        ...formData.aiScenario.examination.vitals,
                                        heartRate: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

                <input
                    className="border p-3 rounded-lg"
                    placeholder="Respiratory rate"
                    value={
                        formData.aiScenario.examination.vitals
                            .respiratoryRate
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                examination: {
                                    ...formData.aiScenario.examination,
                                    vitals: {
                                        ...formData.aiScenario.examination.vitals,
                                        respiratoryRate: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

                <input
                    className="border p-3 rounded-lg"
                    placeholder="Blood pressure"
                    value={
                        formData.aiScenario.examination.vitals
                            .bloodPressure
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                examination: {
                                    ...formData.aiScenario.examination,
                                    vitals: {
                                        ...formData.aiScenario.examination.vitals,
                                        bloodPressure: e.target.value,
                                    },
                                },
                            },
                        })
                    }
                />

                <input
                    className="border p-3 rounded-lg"
                    placeholder="Oxygen saturation"
                    value={
                        formData.aiScenario.examination.vitals
                            .oxygenSaturation
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            aiScenario: {
                                ...formData.aiScenario,
                                examination: {
                                    ...formData.aiScenario.examination,
                                    vitals: {
                                        ...formData.aiScenario.examination.vitals,
                                        oxygenSaturation: e.target.value,
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
                placeholder="Physical examination findings (comma separated)"
                value={formData.aiScenario.examination.findings}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            examination: {
                                ...formData.aiScenario.examination,
                                findings: e.target.value,
                            },
                        },
                    })
                }
            />
        </div>
    )
}
