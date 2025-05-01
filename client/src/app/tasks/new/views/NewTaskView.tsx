"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasksControllerCreate } from "@/hooks/backend/useTasksControllerCreate";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { CreateTaskDto } from "@/lib/api/backend/models/CreateTaskDto";
import { useQueryClient } from "@tanstack/react-query";

interface StepData {
  description: string;
  usually_takes?: string;
  tutorial_video?: string;
}

export function NewTaskView() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useTasksControllerCreate();
  
  const [formData, setFormData] = useState<CreateTaskDto>({
    name: "",
    description: "",
    type: "administrative",
    urgency: "medium",
    usually_takes: "1 hour",
    steps: [],
    created_by: "",
    organization_id: "",
  });

  const [currentStep, setCurrentStep] = useState("");
  const [currentStepDescription, setCurrentStepDescription] = useState("");
  const [currentStepDuration, setCurrentStepDuration] = useState("");
  const [currentStepVideo, setCurrentStepVideo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createTask(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        router.push("/tasks");
      },
    });
  };

  const handleAddStep = () => {
    if (currentStep && currentStepDescription) {
      const stepData: StepData = {
        description: currentStepDescription,
      };

      if (currentStepDuration) {
        stepData.usually_takes = currentStepDuration;
      }

      if (currentStepVideo) {
        stepData.tutorial_video = currentStepVideo;
      }

      setFormData((prev) => ({
        ...prev,
        steps: [...prev.steps, { [currentStep]: stepData }],
      }));

      setCurrentStep("");
      setCurrentStepDescription("");
      setCurrentStepDuration("");
      setCurrentStepVideo("");
    }
  };

  const handleRemoveStep = (stepIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, index) => index !== stepIndex),
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-gray-50">
        <div className="flex w-full h-full py-8 px-4">
          <div
            className="flex flex-col flex-1 w-full h-full
              p-8 bg-white rounded-lg shadow
              overflow-auto"
          >
        <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
                <TextField
                  label="Task Name"
                  helpText="Enter a descriptive name for the task"
                >
              <TextField.Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., Schedule Initial Consultation"
                required
              />
            </TextField>
          </div>

          <div className="space-y-2">
                <TextArea
                  label="Description"
                  helpText="Provide a detailed description of the task"
                >
              <TextArea.Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="e.g., Schedule the first consultation with the cardiologist"
                required
              />
            </TextArea>
          </div>

              <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Select
                    label="Task Type"
                    helpText="Select the type of task"
                    value={formData.type}
                    onValueChange={(value: string) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: value,
                      }))
                    }
              placeholder="Select task type"
            >
                    <Select.Item value="administrative">
                      Administrative
                    </Select.Item>
                    <Select.Item value="clinical">
                      Clinical
                    </Select.Item>
                    <Select.Item value="technical">
                      Technical
                    </Select.Item>
            </Select>
          </div>

          <div className="space-y-2">
            <Select
                    label="Urgency Level"
                    helpText="Select how urgent this task is"
                    value={formData.urgency}
                    onValueChange={(value: string) =>
                      setFormData((prev) => ({
                        ...prev,
                        urgency: value,
                      }))
                    }
              placeholder="Select urgency level"
            >
                    <Select.Item value="low">
                      Low
                    </Select.Item>
                    <Select.Item value="medium">
                      Medium
                    </Select.Item>
                    <Select.Item value="high">
                      High
                    </Select.Item>
                    <Select.Item value="critical">
                      Critical
                    </Select.Item>
            </Select>
          </div>
              </div>

              <div className="space-y-2">
                <TextField
                  label="Estimated Duration"
                  helpText="How long this task usually takes to complete"
                >
                  <TextField.Input
                    value={formData.usually_takes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        usually_takes: e.target.value,
                      }))
                    }
                    placeholder="e.g., 1 hour, 2 days, 1 week"
                    required
                  />
                </TextField>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Task Steps</h3>
                  <p className="text-sm text-gray-500">
                    Add the steps required to complete this task
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <TextField label="Step Name">
                        <TextField.Input
                          value={currentStep}
                          onChange={(e) => setCurrentStep(e.target.value)}
                          placeholder="e.g., Step 1: Initial Contact"
                        />
                      </TextField>
                    </div>

                    <div className="space-y-2">
                      <TextArea label="Step Description">
                        <TextArea.Input
                          value={currentStepDescription}
                          onChange={(e) =>
                            setCurrentStepDescription(e.target.value)
                          }
                          placeholder="e.g., Call the patient to schedule"
                        />
                      </TextArea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <TextField
                          label="Step Duration (Optional)"
                          helpText="How long this step usually takes"
                        >
                          <TextField.Input
                            value={currentStepDuration}
                            onChange={(e) => setCurrentStepDuration(e.target.value)}
                            placeholder="e.g., 15 minutes"
                          />
                        </TextField>
                      </div>

                      <div className="space-y-2">
                        <TextField
                          label="Tutorial Video Link (Optional)"
                          helpText="URL to a tutorial video for this step"
                        >
                          <TextField.Input
                            value={currentStepVideo}
                            onChange={(e) => setCurrentStepVideo(e.target.value)}
                            placeholder="e.g., https://youtube.com/watch?v=..."
                          />
                        </TextField>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="brand-secondary"
                        onClick={handleAddStep}
                        disabled={!currentStep || !currentStepDescription}
                      >
                        Add Step
                      </Button>
                    </div>
                  </div>
                </div>

                {formData.steps.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Added Steps</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {formData.steps.map((step, index) => {
                        const [stepName, stepData] = Object.entries(step)[0];
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 p-4 bg-gray-50 rounded"
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{stepName}</div>
                              <Button
                                type="button"
                                variant="neutral-secondary"
                                size="small"
                                onClick={() => handleRemoveStep(index)}
                              >
                                Remove
                              </Button>
                            </div>
                            <div className="text-sm text-gray-500">
                              {stepData.description}
                            </div>
                            {(stepData.usually_takes || stepData.tutorial_video) && (
                              <div className="flex flex-col gap-1 text-sm text-gray-500">
                                {stepData.usually_takes && (
                                  <div>
                                    <span className="font-medium">Duration:</span>{" "}
                                    {stepData.usually_takes}
                                  </div>
                                )}
                                {stepData.tutorial_video && (
                                  <div>
                                    <span className="font-medium">Tutorial:</span>{" "}
                                    <a
                                      href={stepData.tutorial_video}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:underline"
                                    >
                                      Watch Video
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="neutral-secondary"
              onClick={() => router.push("/tasks")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
