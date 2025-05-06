"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTasksControllerUpdate } from "@/hooks/backend/useTasksControllerUpdate";
import { useTasksControllerFindOne } from "@/hooks/backend/useTasksControllerFindOne";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Avatar } from "@/ui/components/Avatar";
import { CreateTaskDto } from "@/lib/api/backend/models/CreateTaskDto";
import { useQueryClient } from "@tanstack/react-query";
import { useClerkData } from "@/hooks/useClerkData";
import { AppLayout } from "@/components/AppLayout";

interface StepData {
  description: string;
  usually_takes?: string;
  tutorial_video?: string;
}

interface TaskEditViewProps {
  taskId: string;
}

export function TaskEditView({ taskId }: TaskEditViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = useTasksControllerUpdate();
  const { data: taskData, isLoading } = useTasksControllerFindOne(taskId);
  const { isLoaded: isClerkLoaded, user, organization } = useClerkData();

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

  useEffect(() => {
    if (taskData) {
      setFormData({
        name: taskData.name,
        description: taskData.description,
        type: taskData.type,
        urgency: taskData.urgency,
        usually_takes: taskData.usually_takes,
        steps: taskData.steps,
        created_by: taskData.created_by,
        organization_id: taskData.organization_id,
      });
    }
  }, [taskData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    updateTask(
      {
        id: taskId,
        data: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          router.push("/tasks");
        },
      }
    );
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

  if (isLoading || !isClerkLoaded) {
    return (
      <AppLayout>
        <div className="h-screen flex flex-col">
          {"loading.."}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="h-screen flex flex-col">
        <div className="flex-1 bg-gray-50">
          <div className="flex w-full h-full py-8 px-4">
            <div className="flex flex-col flex-1 w-full h-full p-8 bg-white rounded-lg shadow overflow-auto">
              <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Created By"
                    helpText="The user who created this task"
                  >
                    <div className="flex items-center h-full gap-2">
                      <Avatar
                        image={user?.imageUrl}
                        size="small"
                      />
                      <div className="text-sm text-gray-600">
                        {user?.fullName || "User"}
                      </div>
                    </div>
                  </TextField>

                  {organization && (
                    <TextField
                      label="Organization"
                      helpText="The organization this task belongs to"
                    >
                      <div className="flex items-center h-full gap-2">
                        <Avatar
                          image={organization?.imageUrl}
                          size="small"
                        />
                        <div className="text-sm text-gray-600">
                          {organization?.name || "Organization"}
                        </div>
                      </div>
                    </TextField>
                  )}
                </div>

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
                  <h2 className="text-lg font-semibold">Steps</h2>
                  {formData.steps.map((step, index) => {
                    const stepKey = Object.keys(step)[0];
                    const stepData = step[stepKey];
                    return (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{stepKey}</h3>
                          <Button
                            variant="destructive-primary"
                            size="small"
                            onClick={() => handleRemoveStep(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <p>{stepData.description}</p>
                        {stepData.usually_takes && (
                          <p className="text-sm text-gray-500">
                            Duration: {stepData.usually_takes}
                          </p>
                        )}
                        {stepData.tutorial_video && (
                          <p className="text-sm text-gray-500">
                            Tutorial Video: {stepData.tutorial_video}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className="space-y-4 p-4 border rounded-lg">
                    <TextField
                      label="Step Name"
                      helpText="Enter a name for the new step"
                    >
                      <TextField.Input
                        value={currentStep}
                        onChange={(e) => setCurrentStep(e.target.value)}
                        placeholder="e.g., Schedule Appointment"
                      />
                    </TextField>

                    <TextArea
                      label="Step Description"
                      helpText="Describe what needs to be done in this step"
                    >
                      <TextArea.Input
                        value={currentStepDescription}
                        onChange={(e) => setCurrentStepDescription(e.target.value)}
                        placeholder="e.g., Call the clinic to schedule an appointment"
                      />
                    </TextArea>

                    <TextField
                      label="Step Duration"
                      helpText="How long this step usually takes"
                    >
                      <TextField.Input
                        value={currentStepDuration}
                        onChange={(e) => setCurrentStepDuration(e.target.value)}
                        placeholder="e.g., 15 minutes"
                      />
                    </TextField>

                    <TextField
                      label="Tutorial Video URL"
                      helpText="Optional: Add a URL to a tutorial video for this step"
                    >
                      <TextField.Input
                        value={currentStepVideo}
                        onChange={(e) => setCurrentStepVideo(e.target.value)}
                        placeholder="e.g., https://youtube.com/watch?v=..."
                      />
                    </TextField>

                    <Button
                      variant="brand-secondary"
                      onClick={handleAddStep}
                      disabled={!currentStep || !currentStepDescription}
                    >
                      Add Step
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="brand-secondary"
                    onClick={() => router.push("/tasks")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="brand-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 