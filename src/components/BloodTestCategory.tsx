
import { BloodTestCategory as BloodTestCategoryType, BloodTestResult } from "@/types/blood-test";
import BloodTestResultRow from "./BloodTestResultRow";

interface BloodTestCategoryProps {
  category: BloodTestCategoryType;
  tests: BloodTestResult[];
}

const BloodTestCategory = ({ category, tests }: BloodTestCategoryProps) => {
  if (tests.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">
        {category.name}
      </h3>
      
      <div className="bg-white rounded-md">
        {/* Header */}
        <div className="flex items-center pb-2 text-sm text-gray-600">
          <div className="w-1/3">Test</div>
          <div className="w-1/4">Result</div>
          <div className="w-1/4">Reference Range</div>
          <div className="w-1/6">Status</div>
        </div>
        
        {/* Test Rows */}
        {tests.map(test => (
          <BloodTestResultRow key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default BloodTestCategory;
