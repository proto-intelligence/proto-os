"use client";

import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { useSettingsData } from "./hooks/useSettingsData";
import { Loader } from "@/ui/components/Loader";
import { Tabs } from "@/ui/components/Tabs";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";

export default function SettingsPage() {
  const { formData, memberships, isLoading, membershipsError } = useSettingsData();
  const [activeTab, setActiveTab] = React.useState("profile");

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 flex justify-center items-center h-64">
          <Loader size="large" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Breadcrumbs className="mb-4">
          <Breadcrumbs.Item>Home</Breadcrumbs.Item>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active>Settings</Breadcrumbs.Item>
        </Breadcrumbs>
        
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="mb-6">
          <Tabs className="flex space-x-4 border-b">
            <Tabs.Item 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </Tabs.Item>
            <Tabs.Item 
              active={activeTab === "organizations"} 
              onClick={() => setActiveTab("organizations")}
            >
              Organizations
            </Tabs.Item>
            <Tabs.Item 
              active={activeTab === "logins"} 
              onClick={() => setActiveTab("logins")}
            >
              Logins
            </Tabs.Item>
          </Tabs>
        </div>
        
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-2 border rounded bg-gray-50">{formData.firstName}</div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="p-2 border rounded bg-gray-50">{formData.lastName}</div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="p-2 border rounded bg-gray-50">{formData.email}</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "organizations" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Organizations</h2>
              <Button>Join Organization</Button>
            </div>
            
            {membershipsError ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                Error loading organizations: {membershipsError.message}
              </div>
            ) : memberships && memberships.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {memberships.map((membership) => (
                      <tr key={membership.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {membership.organization_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            membership.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {membership.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(membership.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Leave
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You are not a member of any organizations yet.</p>
                <Button>Join Your First Organization</Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "logins" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Login Credentials</h2>
            <p>Login credential settings will be added here.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
