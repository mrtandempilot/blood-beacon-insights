
import { BloodTestResult } from "@/types/blood-test";
import { cn } from "@/lib/utils";

interface BloodTestResultRowProps {
  test: BloodTestResult;
}

const BloodTestResultRow = ({ test }: BloodTestResultRowProps) => {
  // Determine if the value is low, normal, or high
  const isLow = test.value < test.referenceRange.min;
  const isHigh = test.value > test.referenceRange.max;
  const status = isLow ? "low" : isHigh ? "high" : "normal";
  
  // Calculate percentage within or beyond reference range
  const range = test.referenceRange.max - test.referenceRange.min;
  const normalizedPosition = ((test.value - test.referenceRange.min) / range) * 100;
  const boundedPosition = Math.max(0, Math.min(100, normalizedPosition));
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100">
      <div className="w-1/3">
        <span className="font-medium">{test.name}</span>
      </div>
      <div className="w-1/4">
        <span 
          className={cn(
            "font-semibold",
            status === "low" && "text-medical-amber",
            status === "high" && "text-medical-red",
            status === "normal" && "text-medical-green"
          )}
        >
          {test.value} {test.unit}
        </span>
      </div>
      <div className="w-1/4">
        <span className="text-gray-600 text-sm">
          {test.referenceRange.min} - {test.referenceRange.max} {test.unit}
        </span>
      </div>
      <div className="w-1/6">
        <div className="h-2 bg-gray-200 rounded-full w-full relative">
          {/* Reference range indicator */}
          <div className="absolute h-2 bg-gray-100 border border-gray-300 rounded-full" 
               style={{ 
                 left: '0%', 
                 width: '100%' 
               }}>
          </div>
          
          {/* Value marker */}
          <div 
            className={cn(
              "absolute w-2 h-4 -mt-1 rounded-full transform -translate-x-1/2",
              status === "low" && "bg-medical-amber",
              status === "high" && "bg-medical-red",
              status === "normal" && "bg-medical-green"
            )}
            style={{ left: `${boundedPosition}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BloodTestResultRow;
