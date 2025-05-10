
export interface BloodTestResult {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  categoryId: string;
}

export interface BloodTestCategory {
  id: string;
  name: string;
}

export interface AbnormalResult {
  testName: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: 'high' | 'low';
}

export interface AnalysisResult {
  abnormalValues: AbnormalResult[];
  affectedOrgans: string[];
  explanation: string;
}
