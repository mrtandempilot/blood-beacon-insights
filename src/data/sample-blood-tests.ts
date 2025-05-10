
import { BloodTestCategory, BloodTestResult } from "@/types/blood-test";

export const bloodTestCategories: BloodTestCategory[] = [
  { id: "cbc", name: "Complete Blood Count" },
  { id: "lft", name: "Liver Function Tests" },
  { id: "kft", name: "Kidney Function Tests" },
  { id: "electrolytes", name: "Electrolytes" },
  { id: "lipids", name: "Lipid Profile" },
  { id: "glucose", name: "Glucose Metabolism" },
  { id: "thyroid", name: "Thyroid Function" }
];

// Initial sample data with mostly normal values
export const sampleBloodTests: BloodTestResult[] = [
  // Complete Blood Count
  { 
    id: "hgb", 
    name: "Hemoglobin", 
    value: 14.5, 
    unit: "g/dL", 
    referenceRange: { min: 12, max: 16 }, 
    categoryId: "cbc" 
  },
  { 
    id: "hct", 
    name: "Hematocrit", 
    value: 43, 
    unit: "%", 
    referenceRange: { min: 36, max: 46 }, 
    categoryId: "cbc" 
  },
  { 
    id: "rbc", 
    name: "Red Blood Cells", 
    value: 4.8, 
    unit: "million/µL", 
    referenceRange: { min: 4.2, max: 5.4 }, 
    categoryId: "cbc" 
  },
  { 
    id: "wbc", 
    name: "White Blood Cells", 
    value: 5.5, 
    unit: "thousand/µL", 
    referenceRange: { min: 4.5, max: 11.0 }, 
    categoryId: "cbc" 
  },
  { 
    id: "plt", 
    name: "Platelets", 
    value: 250, 
    unit: "thousand/µL", 
    referenceRange: { min: 150, max: 450 }, 
    categoryId: "cbc" 
  },

  // Liver Function Tests
  { 
    id: "alt", 
    name: "ALT", 
    value: 28, 
    unit: "U/L", 
    referenceRange: { min: 7, max: 56 }, 
    categoryId: "lft" 
  },
  { 
    id: "ast", 
    name: "AST", 
    value: 24, 
    unit: "U/L", 
    referenceRange: { min: 8, max: 48 }, 
    categoryId: "lft" 
  },
  { 
    id: "alp", 
    name: "ALP", 
    value: 110, 
    unit: "U/L", 
    referenceRange: { min: 45, max: 115 }, 
    categoryId: "lft" 
  },
  { 
    id: "bilirubin", 
    name: "Bilirubin", 
    value: 0.8, 
    unit: "mg/dL", 
    referenceRange: { min: 0.1, max: 1.2 }, 
    categoryId: "lft" 
  },
  { 
    id: "albumin", 
    name: "Albumin", 
    value: 4.0, 
    unit: "g/dL", 
    referenceRange: { min: 3.4, max: 5.4 }, 
    categoryId: "lft" 
  },

  // Kidney Function Tests
  { 
    id: "creatinine", 
    name: "Creatinine", 
    value: 0.9, 
    unit: "mg/dL", 
    referenceRange: { min: 0.6, max: 1.2 }, 
    categoryId: "kft" 
  },
  { 
    id: "bun", 
    name: "BUN", 
    value: 15, 
    unit: "mg/dL", 
    referenceRange: { min: 7, max: 20 }, 
    categoryId: "kft" 
  },
  { 
    id: "egfr", 
    name: "eGFR", 
    value: 105, 
    unit: "mL/min/1.73m²", 
    referenceRange: { min: 90, max: 120 }, 
    categoryId: "kft" 
  },

  // Electrolytes
  { 
    id: "sodium", 
    name: "Sodium", 
    value: 140, 
    unit: "mmol/L", 
    referenceRange: { min: 135, max: 145 }, 
    categoryId: "electrolytes" 
  },
  { 
    id: "potassium", 
    name: "Potassium", 
    value: 4.2, 
    unit: "mmol/L", 
    referenceRange: { min: 3.5, max: 5.1 }, 
    categoryId: "electrolytes" 
  },
  { 
    id: "chloride", 
    name: "Chloride", 
    value: 102, 
    unit: "mmol/L", 
    referenceRange: { min: 98, max: 107 }, 
    categoryId: "electrolytes" 
  },
  { 
    id: "calcium", 
    name: "Calcium", 
    value: 9.5, 
    unit: "mg/dL", 
    referenceRange: { min: 8.5, max: 10.2 }, 
    categoryId: "electrolytes" 
  },

  // Lipid Profile
  { 
    id: "total_chol", 
    name: "Total Cholesterol", 
    value: 195, 
    unit: "mg/dL", 
    referenceRange: { min: 125, max: 200 }, 
    categoryId: "lipids" 
  },
  { 
    id: "ldl", 
    name: "LDL", 
    value: 128, 
    unit: "mg/dL", 
    referenceRange: { min: 0, max: 100 }, 
    categoryId: "lipids" 
  },
  { 
    id: "hdl", 
    name: "HDL", 
    value: 45, 
    unit: "mg/dL", 
    referenceRange: { min: 40, max: 60 }, 
    categoryId: "lipids" 
  },
  { 
    id: "triglycerides", 
    name: "Triglycerides", 
    value: 150, 
    unit: "mg/dL", 
    referenceRange: { min: 0, max: 150 }, 
    categoryId: "lipids" 
  },

  // Glucose Metabolism
  { 
    id: "glucose", 
    name: "Glucose", 
    value: 95, 
    unit: "mg/dL", 
    referenceRange: { min: 70, max: 99 }, 
    categoryId: "glucose" 
  },
  { 
    id: "hba1c", 
    name: "HbA1c", 
    value: 5.5, 
    unit: "%", 
    referenceRange: { min: 4.0, max: 5.6 }, 
    categoryId: "glucose" 
  },

  // Thyroid Function
  { 
    id: "tsh", 
    name: "TSH", 
    value: 2.5, 
    unit: "mIU/L", 
    referenceRange: { min: 0.4, max: 4.0 }, 
    categoryId: "thyroid" 
  },
  { 
    id: "ft4", 
    name: "Free T4", 
    value: 1.2, 
    unit: "ng/dL", 
    referenceRange: { min: 0.8, max: 1.8 }, 
    categoryId: "thyroid" 
  }
];

// Define some abnormal blood test profiles for demo purposes
export const liverProblemSample: BloodTestResult[] = sampleBloodTests.map(test => {
  if (test.name === "ALT") {
    return { ...test, value: 85 }; // Elevated ALT
  }
  if (test.name === "AST") {
    return { ...test, value: 78 }; // Elevated AST
  }
  if (test.name === "ALP") {
    return { ...test, value: 130 }; // Slightly elevated ALP
  }
  return test;
});

export const kidneySample: BloodTestResult[] = sampleBloodTests.map(test => {
  if (test.name === "Creatinine") {
    return { ...test, value: 2.1 }; // Elevated creatinine
  }
  if (test.name === "BUN") {
    return { ...test, value: 28 }; // Elevated BUN
  }
  if (test.name === "eGFR") {
    return { ...test, value: 55 }; // Reduced eGFR
  }
  if (test.name === "Potassium") {
    return { ...test, value: 5.5 }; // Elevated potassium
  }
  return test;
});

export const anemiaSample: BloodTestResult[] = sampleBloodTests.map(test => {
  if (test.name === "Hemoglobin") {
    return { ...test, value: 10.5 }; // Low hemoglobin
  }
  if (test.name === "Hematocrit") {
    return { ...test, value: 32 }; // Low hematocrit
  }
  if (test.name === "Red Blood Cells") {
    return { ...test, value: 3.9 }; // Low RBC
  }
  if (test.name === "Iron") {
    return { ...test, value: 40, unit: "µg/dL", referenceRange: { min: 60, max: 170 }, categoryId: "cbc" }; // Low iron
  }
  return test;
});

export const diabetesSample: BloodTestResult[] = sampleBloodTests.map(test => {
  if (test.name === "Glucose") {
    return { ...test, value: 185 }; // High glucose
  }
  if (test.name === "HbA1c") {
    return { ...test, value: 7.8 }; // High HbA1c
  }
  return test;
});

export const thyroidSample: BloodTestResult[] = sampleBloodTests.map(test => {
  if (test.name === "TSH") {
    return { ...test, value: 7.8 }; // High TSH (hypothyroidism)
  }
  if (test.name === "Free T4") {
    return { ...test, value: 0.6 }; // Low Free T4
  }
  return test;
});

export const bloodTestProfiles = [
  { name: "Normal Sample", data: sampleBloodTests },
  { name: "Liver Problem", data: liverProblemSample },
  { name: "Kidney Problem", data: kidneySample },
  { name: "Anemia", data: anemiaSample },
  { name: "Diabetes", data: diabetesSample },
  { name: "Hypothyroidism", data: thyroidSample }
];
