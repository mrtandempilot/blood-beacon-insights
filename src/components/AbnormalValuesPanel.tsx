
import { AnalysisResult, AbnormalResult } from "@/types/blood-test";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AbnormalValuesPanelProps {
  analysisResult: AnalysisResult;
}

const AbnormalValuesPanel = ({ analysisResult }: AbnormalValuesPanelProps) => {
  const { abnormalValues, affectedOrgans, explanation } = analysisResult;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Analysis Summary</h3>
      
      {abnormalValues.length > 0 ? (
        <>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Abnormal Values:</h4>
            <div className="flex flex-wrap gap-2">
              {abnormalValues.map((value, index) => (
                <Badge 
                  key={index} 
                  className={cn(
                    "font-medium text-white",
                    value.status === "high" ? "bg-medical-red hover:bg-medical-red/90" : "bg-medical-amber hover:bg-medical-amber/90"
                  )}
                >
                  {value.testName}: {value.value} {value.unit} 
                  {value.status === "high" ? " (High)" : " (Low)"}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Potentially Affected:</h4>
            <div className="flex flex-wrap gap-1">
              {affectedOrgans.map((organ, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-medical-blue border-medical-blue">
                  {organ}
                </Badge>
              ))}
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="explanation">
              <AccordionTrigger className="font-medium">
                Explanation
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{explanation}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="text-medical-green font-medium">
          All blood test values are within normal reference ranges. No abnormalities detected.
        </div>
      )}
    </div>
  );
};

export default AbnormalValuesPanel;
