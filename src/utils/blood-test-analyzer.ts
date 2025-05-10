import { AbnormalResult, AnalysisResult, BloodTestResult } from "@/types/blood-test";

// Map tests to potentially affected organs when abnormal
const testToOrganMap: Record<string, string[]> = {
  // Complete Blood Count (CBC)
  "Hemoglobin": ["Bone Marrow", "Blood", "Heart", "Lungs"],
  "Hematocrit": ["Bone Marrow", "Blood", "Heart", "Lungs"],
  "Red Blood Cells": ["Bone Marrow", "Spleen", "Kidneys"],
  "White Blood Cells": ["Bone Marrow", "Immune System", "Infection Sites"],
  "Platelets": ["Bone Marrow", "Spleen"],
  "MCV": ["Bone Marrow"],
  "MCH": ["Bone Marrow"],
  "MCHC": ["Bone Marrow"],
  
  // Liver Function Tests
  "ALT": ["Liver"],
  "AST": ["Liver", "Heart", "Muscles"],
  "ALP": ["Liver", "Bones", "Gallbladder"],
  "GGT": ["Liver", "Biliary System"],
  "Bilirubin": ["Liver", "Gallbladder", "Red Blood Cells"],
  "Albumin": ["Liver", "Kidneys"],
  "Total Protein": ["Liver", "Kidneys", "Immune System"],
  
  // Kidney Function Tests
  "Creatinine": ["Kidneys", "Muscles"],
  "BUN": ["Kidneys", "Liver"],
  "eGFR": ["Kidneys"],
  
  // Electrolytes
  "Sodium": ["Kidneys", "Adrenal Glands"],
  "Potassium": ["Kidneys", "Adrenal Glands", "Heart"],
  "Chloride": ["Kidneys", "Lungs"],
  "Bicarbonate": ["Lungs", "Kidneys"],
  "Calcium": ["Parathyroid Glands", "Kidneys", "Bones"],
  "Magnesium": ["Kidneys", "Parathyroid Glands", "Intestines"],
  "Phosphate": ["Kidneys", "Parathyroid Glands", "Bones"],

  // Lipids
  "Total Cholesterol": ["Liver", "Cardiovascular System"],
  "LDL": ["Liver", "Cardiovascular System"],
  "HDL": ["Liver", "Cardiovascular System"],
  "Triglycerides": ["Liver", "Pancreas", "Cardiovascular System"],
  
  // Glucose Metabolism
  "Glucose": ["Pancreas", "Liver", "Adrenal Glands"],
  "HbA1c": ["Red Blood Cells", "Pancreas"],
  
  // Thyroid Tests
  "TSH": ["Pituitary Gland", "Thyroid"],
  "Free T4": ["Thyroid"],
  "Free T3": ["Thyroid"],
  
  // Others
  "CRP": ["Immune System", "Inflammation Sites"],
  "ESR": ["Immune System", "Inflammation Sites"],
  "Uric Acid": ["Kidneys", "Joints"],
  "Iron": ["Intestines", "Bone Marrow", "Liver"],
  "Ferritin": ["Liver", "Spleen", "Bone Marrow"],
  "Vitamin B12": ["Stomach", "Intestines", "Bone Marrow"],
  "Folate": ["Intestines", "Bone Marrow"],
  "Vitamin D": ["Skin", "Liver", "Kidneys"]
};

// Explanations for abnormal values
const abnormalValueExplanations: Record<string, Record<'high' | 'low', string>> = {
  "Hemoglobin": {
    high: "May indicate polycythemia, dehydration, or lung disease.",
    low: "May indicate anemia, blood loss, or nutritional deficiencies."
  },
  "Hematocrit": {
    high: "May indicate polycythemia, dehydration, or lung disease.",
    low: "May indicate anemia, blood loss, or fluid overload."
  },
  "Red Blood Cells": {
    high: "May indicate polycythemia, dehydration, or lung disease.",
    low: "May indicate anemia, blood loss, or bone marrow disorders."
  },
  "White Blood Cells": {
    high: "May indicate infection, inflammation, or certain types of leukemia.",
    low: "May indicate bone marrow disorders, autoimmune conditions, or severe infections."
  },
  "Platelets": {
    high: "May indicate inflammation, infection, or bone marrow disorders.",
    low: "May indicate immune disorders, bone marrow problems, or increased platelet destruction."
  },
  "ALT": {
    high: "May indicate liver damage, hepatitis, or medication effect.",
    low: "Rarely clinically significant."
  },
  "AST": {
    high: "May indicate liver damage, heart issues, or muscle injury.",
    low: "Rarely clinically significant."
  },
  "ALP": {
    high: "May indicate liver or bone disorders, or bile duct obstruction.",
    low: "May indicate malnutrition or zinc deficiency."
  },
  "Creatinine": {
    high: "May indicate kidney dysfunction or reduced kidney blood flow.",
    low: "May indicate decreased muscle mass or malnutrition."
  },
  "BUN": {
    high: "May indicate kidney dysfunction, dehydration, or high protein diet.",
    low: "May indicate liver disease, malnutrition, or overhydration."
  },
  "Glucose": {
    high: "May indicate diabetes, stress response, or certain medications.",
    low: "May indicate excess insulin, liver disease, or adrenal insufficiency."
  },
  "Sodium": {
    high: "May indicate dehydration, certain medications, or hormonal conditions.",
    low: "May indicate overhydration, heart failure, kidney or liver disease."
  },
  "Potassium": {
    high: "May indicate kidney dysfunction, medication effects, or cell damage.",
    low: "May indicate diarrhea, vomiting, or kidney issues that cause potassium loss."
  },
  "Total Cholesterol": {
    high: "May indicate increased risk of cardiovascular disease.",
    low: "May indicate malnutrition or certain genetic conditions."
  },
  "LDL": {
    high: "May indicate increased risk of cardiovascular disease.",
    low: "Generally considered beneficial."
  },
  "HDL": {
    high: "Generally considered beneficial for cardiovascular health.",
    low: "May indicate increased risk of cardiovascular disease."
  },
  "Triglycerides": {
    high: "May indicate increased risk of cardiovascular disease, diabetes, or liver disease.",
    low: "Generally not clinically significant."
  },
  "TSH": {
    high: "May indicate hypothyroidism (underactive thyroid).",
    low: "May indicate hyperthyroidism (overactive thyroid)."
  }
};

// Default explanation for tests not in the explanations map
const defaultExplanation = {
  high: "Value is above the normal reference range. This may require clinical correlation.",
  low: "Value is below the normal reference range. This may require clinical correlation."
};

export function analyzeBloodTests(bloodTests: BloodTestResult[]): AnalysisResult {
  // Identify abnormal values
  const abnormalValues: AbnormalResult[] = bloodTests.filter(test => {
    return test.value < test.referenceRange.min || test.value > test.referenceRange.max;
  }).map(test => {
    const status = test.value < test.referenceRange.min ? 'low' : 'high';
    return {
      testName: test.name,
      value: test.value,
      unit: test.unit,
      referenceRange: test.referenceRange,
      status
    };
  });

  // Identify potentially affected organs based on abnormal values
  const affectedOrgansSet = new Set<string>();
  abnormalValues.forEach(abnormal => {
    const possibleOrgans = testToOrganMap[abnormal.testName] || [];
    possibleOrgans.forEach(organ => affectedOrgansSet.add(organ));
  });
  const affectedOrgans = Array.from(affectedOrgansSet);

  // Create explanation
  let explanation = "";
  if (abnormalValues.length > 0) {
    explanation = "Based on the abnormal values, there may be issues with: ";
    explanation += abnormalValues.map(abnormal => {
      const testExplanation = abnormalValueExplanations[abnormal.testName] || defaultExplanation;
      return `${abnormal.testName} (${abnormal.status === 'high' ? 'high' : 'low'}: ${testExplanation[abnormal.status]})`;
    }).join("; ");
  } else {
    explanation = "All values are within normal reference ranges.";
  }

  return {
    abnormalValues,
    affectedOrgans,
    explanation
  };
}
