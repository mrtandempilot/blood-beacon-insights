
import { useState, useEffect } from "react";
import { BloodTestResult } from "@/types/blood-test";
import { bloodTestCategories, bloodTestProfiles } from "@/data/sample-blood-tests";
import { analyzeBloodTests } from "@/utils/blood-test-analyzer";
import BloodTestCategory from "@/components/BloodTestCategory";
import AbnormalValuesPanel from "@/components/AbnormalValuesPanel";
import TestProfileSelector from "@/components/TestProfileSelector";
import OrganVisualization from "@/components/OrganVisualization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState("Normal Sample");
  const [bloodTests, setBloodTests] = useState<BloodTestResult[]>([]);
  const analysisResult = analyzeBloodTests(bloodTests);

  // Update blood tests when profile changes
  useEffect(() => {
    const profile = bloodTestProfiles.find(p => p.name === selectedProfile);
    if (profile) {
      setBloodTests(profile.data);
    }
  }, [selectedProfile]);

  // Group tests by category
  const testsByCategory = bloodTestCategories.map(category => ({
    category,
    tests: bloodTests.filter(test => test.categoryId === category.id)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-medical-blue text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Blood Beacon Insights</h1>
          <p className="text-sm opacity-90">Blood Test Analysis Dashboard</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="md:w-2/3 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Blood Test Results</h2>
                <TestProfileSelector 
                  selectedProfile={selectedProfile}
                  onProfileChange={setSelectedProfile}
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All Tests</TabsTrigger>
                  <TabsTrigger value="abnormal">Abnormal Only</TabsTrigger>
                  <TabsTrigger value="categories">By Category</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <BloodTestCategory 
                    category={{ id: "all", name: "All Blood Tests" }} 
                    tests={bloodTests} 
                  />
                </TabsContent>
                
                <TabsContent value="abnormal" className="space-y-4">
                  <BloodTestCategory 
                    category={{ id: "abnormal", name: "Abnormal Results" }}
                    tests={bloodTests.filter(test => 
                      test.value < test.referenceRange.min || 
                      test.value > test.referenceRange.max
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="categories" className="space-y-4">
                  {testsByCategory.map(({ category, tests }) => (
                    <BloodTestCategory 
                      key={category.id}
                      category={category} 
                      tests={tests} 
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Side panel */}
          <div className="md:w-1/3 space-y-6">
            <AbnormalValuesPanel analysisResult={analysisResult} />
            
            {/* Add the Organ Visualization component */}
            <OrganVisualization analysisResult={analysisResult} />
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">About This Tool</h3>
              <p className="text-gray-700 text-sm">
                Blood Beacon Insights helps analyze blood test results by identifying abnormal values 
                and determining which organs might be affected. The analysis is based on medical knowledge 
                of how different biomarkers relate to organ function.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Color Guide:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-medical-green rounded-full mr-2"></span>
                    <span className="text-gray-700">Normal Value</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-medical-amber rounded-full mr-2"></span>
                    <span className="text-gray-700">Low Value</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-medical-red rounded-full mr-2"></span>
                    <span className="text-gray-700">High Value</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          Blood Beacon Insights © 2025 - Medical Visualization Tool
          <p className="mt-1 text-xs">For educational purposes only. Not intended for medical diagnosis.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
