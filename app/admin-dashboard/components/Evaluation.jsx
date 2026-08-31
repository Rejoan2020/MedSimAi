import React from 'react'

export default function Evaluation({formData, setFormData}) {
    return (
        <div className="mb-8">
            <h3 className="font-medium mb-4">
                Diagnosis & Evaluation
            </h3>

            <input
                className="border p-3 rounded-lg w-full"
                placeholder="Primary diagnosis"
                value={formData.aiScenario.diagnosis.primary}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            diagnosis: {
                                ...formData.aiScenario.diagnosis,
                                primary: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={3}
                placeholder="Differential diagnoses (comma separated)"
                value={formData.aiScenario.diagnosis.differentials}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            diagnosis: {
                                ...formData.aiScenario.diagnosis,
                                differentials: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={4}
                placeholder="Expected questions (comma separated)"
                value={formData.aiScenario.evaluation.expectedQuestions}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            evaluation: {
                                ...formData.aiScenario.evaluation,
                                expectedQuestions: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={4}
                placeholder="Critical findings (comma separated)"
                value={formData.aiScenario.evaluation.criticalFindings}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            evaluation: {
                                ...formData.aiScenario.evaluation,
                                criticalFindings: e.target.value,
                            },
                        },
                    })
                }
            />
        </div>
    )
}
