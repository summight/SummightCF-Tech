
export interface User {
  name: string;
  email: string;
  password?: string;
}

export interface Example {
  title: string;
  code: string;
}

export interface Assignment {
  title: string;
  description: string;
}

export interface Week {
  id: number;
  title: string;
  description: string;
  content: string[];
  videoUrls: string[];
  examples: Example[];
  assignment: Assignment;
}

export interface Course {
  title: string;
  description: string;
  weeks: Week[];
}