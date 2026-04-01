export interface RootCause {
  rank: number;
  cause: string;
}

export interface DiagnosticStep {
  step: number;
  action: string;
  measurement: string;
  expected_value: string;
  tool: string;
}

export interface TestPoint {
  label: string;
  expected: string;
}

export interface Part {
  name: string;
  part_number: string;
}

export interface ErrorCodeRecord {
  id: string;
  brand: string;
  appliance: string;
  subtype: string;
  applicable_models: string[];
  code: string;
  name: string;
  subsystem: string;
  severity: "INFO" | "WARNING" | "FAULT" | "CRITICAL";
  description: string;
  root_causes: RootCause[];
  diagnostic_steps: DiagnosticStep[];
  test_points: TestPoint[];
  reset_procedure: string;
  parts_likely_needed: Part[];
  related_codes: string[];
  notes?: string;
}
