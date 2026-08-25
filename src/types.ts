export interface SubScoreItem {
  name: string;
  maxPoints: number;
  scoredPoints: number;
  status: 'strong' | 'moderate' | 'weak' | 'missing' | 'not-detected';
  notes: string;
}

export interface CategoryDetail {
  name: string;
  totalPoints: number; // 100
  scoredPoints: number;
  shortDefinition: string;
  keyFinding: string;
  items: SubScoreItem[];
}

export interface AuditInput {
  websiteUrl: string;
  brandName: string;
  industry: string;
  mainService: string;
  country: string;
  competitors?: string;
  executiveName?: string;
  authorName?: string;
}

export interface BadgeItem {
  label: string;
  status: 'success' | 'warning' | 'danger';
}

export interface ChecklistRow {
  area: string;
  status: 'Valid' | 'Partial' | 'Needs Improvement' | 'Missing' | 'Low' | 'Strong';
  impact: string;
  recommendation: string;
}

export interface RoadmapPhase {
  title: string;
  timeline: string;
  items: string[];
}

export interface RecommendationItem {
  recommendation: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'High' | 'Medium' | 'Low';
  timeline: string;
  whyItMatters: string;
}

export interface CompetitorRow {
  competitorName: string;
  trustSignals: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  authorVisibility: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  schemaUsage: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  brandMentions: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  contentDepth: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  aiCitationReadiness: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
}

export interface AuditReportData {
  websiteUrl: string;
  brandName: string;
  industry: string;
  mainService: string;
  country: string;
  competitors?: string[];
  executiveName?: string;
  authorName?: string;
  analyzedAt: string;
  
  overallScore: number; // Out of 500
  snapshotScore: number; // Out of 100
  
  categories: {
    foundation: CategoryDetail;
    executive: CategoryDetail;
    author: CategoryDetail;
    experience: CategoryDetail;
    ai_visibility: CategoryDetail;
  };
  
  executiveSummary: {
    text: string; // 3-5 sentences
    badges: BadgeItem[];
  };
  
  businessImpact: {
    missedOrganicTraffic: string;
    potentiallyWastedAdSpend: string;
    lowerCustomerConfidence: string;
  };
  
  aiVisibilityStrength: {
    organizationEntity: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    authorPersonEntity: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    knowledgeGraphReadiness: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    schemaCoverage: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    digitalShadowStrength: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    aiCitationReadiness: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
    informationGainScore: 'Strong' | 'Moderate' | 'Weak' | 'Missing';
  };
  
  checklist: ChecklistRow[];
  
  roadmap: {
    phase1: RoadmapPhase;
    phase2: RoadmapPhase;
    phase3: RoadmapPhase;
  };
  
  recommendations: RecommendationItem[];
  
  competitorComparison?: CompetitorRow[];
}
