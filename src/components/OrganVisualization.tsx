import { useState, useEffect } from "react";
import { AnalysisResult } from "@/types/blood-test";
import { 
  Heart, 
  Brain, 
  ActivitySquare,
  Activity,
  Pill,
  Sandwich,
  CircleDashed,
  Droplets,
  Bone,
  Dumbbell,
  Network
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface OrganVisualizationProps {
  analysisResult: AnalysisResult;
}

interface OrganInfo {
  name: string;
  icon: React.ReactNode;
  relatedTests: string[];
  position?: {
    top: string;
    left: string;
  };
}

const OrganVisualization = ({ analysisResult }: OrganVisualizationProps) => {
  const [animatedOrgans, setAnimatedOrgans] = useState<string[]>([]);
  const { affectedOrgans } = analysisResult;
  const [activeTab, setActiveTab] = useState<'grid' | 'anatomy'>('anatomy');

  // Map the organs to their respective icons, related tests, and positions on the anatomy diagram
  const organs: OrganInfo[] = [
    { 
      name: "Heart", 
      icon: <Heart className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Hematocrit", "Potassium", "LDL", "HDL", "Triglycerides", "Total Cholesterol"],
      position: { top: '30%', left: '50%' }
    },
    { 
      name: "Brain", 
      icon: <Brain className="h-10 w-10" />, 
      relatedTests: ["Sodium", "Glucose", "TSH"],
      position: { top: '10%', left: '50%' }
    },
    { 
      name: "Liver", 
      icon: <ActivitySquare className="h-10 w-10" />, 
      relatedTests: ["ALT", "AST", "ALP", "GGT", "Bilirubin", "Albumin", "Total Protein"],
      position: { top: '35%', left: '40%' }
    },
    { 
      name: "Lungs", 
      icon: <Activity className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Bicarbonate", "Oxygen Saturation"],
      position: { top: '28%', left: '60%' }
    },
    { 
      name: "Kidneys", 
      icon: <ActivitySquare className="h-10 w-10" />, 
      relatedTests: ["Creatinine", "BUN", "eGFR", "Sodium", "Potassium", "Uric Acid"],
      position: { top: '40%', left: '63%' }
    },
    { 
      name: "Stomach", 
      icon: <Sandwich className="h-10 w-10" />, 
      relatedTests: ["Vitamin B12", "Intrinsic Factor"],
      position: { top: '38%', left: '50%' }
    },
    { 
      name: "Bone Marrow", 
      icon: <Bone className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Red Blood Cells", "White Blood Cells", "Platelets", "MCV", "MCH", "MCHC"],
      position: { top: '55%', left: '45%' }
    },
    { 
      name: "Blood", 
      icon: <Droplets className="h-10 w-10" />,
      relatedTests: ["Hemoglobin", "Hematocrit", "Red Blood Cells", "White Blood Cells", "Platelets"],
      position: { top: '50%', left: '53%' }
    },
    { 
      name: "Muscles", 
      icon: <Dumbbell className="h-10 w-10" />, 
      relatedTests: ["Creatinine", "AST", "Creatine Kinase"],
      position: { top: '60%', left: '63%' }
    },
    { 
      name: "Intestines", 
      icon: <CircleDashed className="h-10 w-10" />, 
      relatedTests: ["Iron", "Vitamin B12", "Folate"],
      position: { top: '50%', left: '50%' }
    },
    { 
      name: "Large Intestine", 
      icon: <Pill className="h-10 w-10" />, 
      relatedTests: ["Fecal Occult Blood", "Calprotectin"],
      position: { top: '57%', left: '50%' }
    },
    { 
      name: "Immune System", 
      icon: <Network className="h-10 w-10" />, 
      relatedTests: ["White Blood Cells", "CRP", "ESR"],
      position: { top: '45%', left: '40%' }
    },
  ];

  // Animation effect for affected organs
  useEffect(() => {
    setAnimatedOrgans([]);
    
    if (affectedOrgans.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedOrgans(affectedOrgans);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [affectedOrgans]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Organ Visualization</h3>
        <div className="flex space-x-2 mb-4">
          <button
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeTab === 'anatomy'
                ? "bg-medical-blue text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setActiveTab('anatomy')}
          >
            Anatomy View
          </button>
          <button
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeTab === 'grid'
                ? "bg-medical-blue text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => setActiveTab('grid')}
          >
            Grid View
          </button>
        </div>
      </div>

      {activeTab === 'anatomy' ? (
        <div className="relative h-[500px] w-full bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
          {/* Human Anatomy Illustration */}
          <div className="absolute inset-0 flex justify-center">
            <img 
              src="/lovable-uploads/af49a1c9-d7a6-492a-b24c-887292738874.png" 
              alt="Human Anatomy Illustration" 
              className="h-full object-contain opacity-80"
              style={{ maxHeight: '500px' }}
            />
          </div>

          {/* Organ Indicators */}
          {organs.filter(organ => organ.position).map((organ) => {
            const isAffected = affectedOrgans.includes(organ.name);
            const isAnimated = animatedOrgans.includes(organ.name);

            return (
              <TooltipProvider key={organ.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 z-10 cursor-pointer transition-all duration-300",
                        isAffected ? "w-8 h-8 border-medical-red" : "w-6 h-6 border-gray-400",
                        isAnimated && isAffected && "animate-pulse"
                      )}
                      style={{
                        top: organ.position?.top,
                        left: organ.position?.left,
                        backgroundColor: isAffected ? 'rgba(234, 56, 76, 0.2)' : 'rgba(229, 231, 235, 0.6)',
                      }}
                    >
                      <div
                        className={cn(
                          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-500",
                          isAffected ? "text-medical-red" : "text-gray-500"
                        )}
                      >
                        <span className="sr-only">{organ.name}</span>
                        <div className="scale-75">
                          {organ.icon}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs">
                      <p className="font-semibold">{organ.name}</p>
                      {isAffected && (
                        <>
                          <p className="text-medical-red text-sm mt-1">Potentially affected</p>
                          <div className="mt-1">
                            <p className="text-xs font-medium">Related tests:</p>
                            <ul className="text-xs list-disc list-inside mt-1">
                              {organ.relatedTests.map(test => (
                                <li key={test}>{test}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
          {organs.map((organ) => {
            const isAffected = affectedOrgans.includes(organ.name);
            const isAnimated = animatedOrgans.includes(organ.name);
            
            return (
              <TooltipProvider key={organ.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-300",
                        isAffected ? "border-medical-red" : "border-gray-200",
                        isAnimated && isAffected && "animate-pulse"
                      )}
                    >
                      <div
                        className={cn(
                          "transition-colors duration-500",
                          isAffected 
                            ? isAnimated 
                              ? "text-medical-red" 
                              : "text-medical-red"
                            : "text-gray-500"
                        )}
                      >
                        {organ.icon}
                      </div>
                      <span className="mt-2 text-sm font-medium">{organ.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs">
                      <p className="font-semibold">{organ.name}</p>
                      {isAffected && (
                        <>
                          <p className="text-medical-red text-sm mt-1">Potentially affected</p>
                          <div className="mt-1">
                            <p className="text-xs font-medium">Related tests:</p>
                            <ul className="text-xs list-disc list-inside mt-1">
                              {organ.relatedTests.map(test => (
                                <li key={test}>{test}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-2 border-t border-gray-100 text-xs text-gray-500">
        <p>Click on organs to view related test information. Highlighted organs may be affected based on abnormal test results.</p>
      </div>
    </div>
  );
};

export default OrganVisualization;
