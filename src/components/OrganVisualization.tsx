
import { useState, useEffect } from "react";
import { AnalysisResult } from "@/types/blood-test";
import { 
  Heart, 
  Brain, 
  Liver, 
  Lungs, 
  Kidneys, 
  Stomach,
  LargeIntestine,
  SmallIntestine,
  BloodVessels,
  Bone,
  Muscle,
  Nerve
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OrganVisualizationProps {
  analysisResult: AnalysisResult;
}

interface OrganInfo {
  name: string;
  icon: React.ReactNode;
  relatedTests: string[];
}

const OrganVisualization = ({ analysisResult }: OrganVisualizationProps) => {
  const [animatedOrgans, setAnimatedOrgans] = useState<string[]>([]);
  const { affectedOrgans } = analysisResult;

  // Map the organs to their respective icons and related tests
  const organs: OrganInfo[] = [
    { 
      name: "Heart", 
      icon: <Heart className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Hematocrit", "Potassium", "LDL", "HDL", "Triglycerides", "Total Cholesterol"]
    },
    { 
      name: "Brain", 
      icon: <Brain className="h-10 w-10" />, 
      relatedTests: ["Sodium", "Glucose", "TSH"]
    },
    { 
      name: "Liver", 
      icon: <Liver className="h-10 w-10" />, 
      relatedTests: ["ALT", "AST", "ALP", "GGT", "Bilirubin", "Albumin", "Total Protein"]
    },
    { 
      name: "Lungs", 
      icon: <Lungs className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Bicarbonate", "Oxygen Saturation"]
    },
    { 
      name: "Kidneys", 
      icon: <Kidneys className="h-10 w-10" />, 
      relatedTests: ["Creatinine", "BUN", "eGFR", "Sodium", "Potassium", "Uric Acid"]
    },
    { 
      name: "Stomach", 
      icon: <Stomach className="h-10 w-10" />, 
      relatedTests: ["Vitamin B12", "Intrinsic Factor"]
    },
    { 
      name: "Bone Marrow", 
      icon: <Bone className="h-10 w-10" />, 
      relatedTests: ["Hemoglobin", "Red Blood Cells", "White Blood Cells", "Platelets", "MCV", "MCH", "MCHC"] 
    },
    { 
      name: "Blood", 
      icon: <BloodVessels className="h-10 w-10" />,
      relatedTests: ["Hemoglobin", "Hematocrit", "Red Blood Cells", "White Blood Cells", "Platelets"] 
    },
    { 
      name: "Muscles", 
      icon: <Muscle className="h-10 w-10" />, 
      relatedTests: ["Creatinine", "AST", "Creatine Kinase"] 
    },
    { 
      name: "Intestines", 
      icon: <SmallIntestine className="h-10 w-10" />, 
      relatedTests: ["Iron", "Vitamin B12", "Folate"] 
    },
    { 
      name: "Large Intestine", 
      icon: <LargeIntestine className="h-10 w-10" />, 
      relatedTests: ["Fecal Occult Blood", "Calprotectin"] 
    },
    { 
      name: "Immune System", 
      icon: <Nerve className="h-10 w-10" />, 
      relatedTests: ["White Blood Cells", "CRP", "ESR"] 
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
      <h3 className="text-xl font-bold mb-4 text-gray-800">Organ Visualization</h3>
      
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
    </div>
  );
};

export default OrganVisualization;
