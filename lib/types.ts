export type resumeType = {
  data : {
    title: string;
    resumeId: string;
    userEmail: string | undefined;
    userName: string | null | undefined;
  }
};

export type EnableNextProps = {
  enableNext: (v: boolean) => void;
};

export type AiSummeryListProps = {
  summary: string;
  experienceLevel: string;
}

export interface ExperienceListProps {
  id : number
  title?: string;
  companyName?: string;
  city?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  workSummary?: string;
}

export type EducationalListProps = {
  id : number
  universityName ?: string,
  startDate ?: string,
  endDate ?: string,
  degree ?: string,
  major? : string,
  description?: string,
  grade? : string
}

export type SkillProps = {
  id : number,
  name ?: string,
  rating ?: number
}

export type ProjectList = {
  id : number,
  projectName : string,
  projectUrl  :string,
  projectDescription : string
}

export type CertificateList = {
  id : number,
  certificateName : string,
  certificateDescription : string
}

export type AchievementList = {
  id : number,
  achievementDescription : string
}