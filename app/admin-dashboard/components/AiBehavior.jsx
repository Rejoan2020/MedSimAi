import React from 'react'

export default function AiBehavior({formData, setFormData}) {
    return (
        <div className="mb-8">
            <h3 className="font-medium mb-4">
                AI Patient Behavior
            </h3>

            <textarea
                className="border p-3 rounded-lg w-full"
                rows={3}
                placeholder="Communication style"
                value={formData.aiScenario.behavior.communicationStyle}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            behavior: {
                                ...formData.aiScenario.behavior,
                                communicationStyle: e.target.value,
                            },
                        },
                    })
                }
            />

            <textarea
                className="border p-3 rounded-lg w-full mt-4"
                rows={3}
                placeholder="Emotional state"
                value={formData.aiScenario.behavior.emotionalState}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        aiScenario: {
                            ...formData.aiScenario,
                            behavior: {
                                ...formData.aiScenario.behavior,
                                emotionalState: e.target.value,
                            },
                        },
                    })
                }
            />

            <div className="flex flex-col gap-3 mt-4">

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={
                            formData.aiScenario.behavior
                                .revealInformationOnlyWhenAsked
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    behavior: {
                                        ...formData.aiScenario.behavior,
                                        revealInformationOnlyWhenAsked:
                                            e.target.checked,
                                    },
                                },
                            })
                        }
                    />
                    Reveal information only when asked
                </label>

                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        checked={
                            formData.aiScenario.behavior.revealDiagnosis
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                aiScenario: {
                                    ...formData.aiScenario,
                                    behavior: {
                                        ...formData.aiScenario.behavior,
                                        revealDiagnosis:
                                            e.target.checked,
                                    },
                                },
                            })
                        }
                    />
                    Allow patient to reveal diagnosis
                </label>

            </div>
        </div>
    )
}
