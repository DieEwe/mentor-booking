// src/lib/dummyData.ts

export interface Event {
    id: number;
    date: string;
    time: string;
    company: string;
    address: string;
    saeule: number; // 1-8
    saeuleDescription: string;
    mentorName?: string;
    coachName?: string;
    backupMentorName?: string;
  }
  
  export interface User {
    email: string;
    password: string;
    nickname?: string;
    role: 'mentor' | 'coach';
    firstName: string;
    lastName: string;
    showLastName: boolean;     // whether or not to display last name
    description?: string;
    visibleDisability?: boolean;
    nonVisibleDisability?: boolean;
    showDisability?: boolean;
  }
  
  export let events: Event[] = [
    {
      id: 1,
      date: '2025-02-10',
      time: '10:00',
      company: 'Pledger Corp',
      address: '1234 Company St.',
      saeule: 1,
      saeuleDescription: 'Introduction & Setup',
      mentorName: '',
      coachName: 'Alice',
      backupMentorName: '',
    },
    {
      id: 2,
      date: '2025-02-15',
      time: '14:00',
      company: 'ABC Ltd',
      address: '5678 Main St.',
      saeule: 3,
      saeuleDescription: 'Coaching Fundamentals',
      mentorName: '',
      coachName: 'Bob',
      backupMentorName: '',
    },
  ];
  
  export let users: User[] = [
    {
      email: 'mentor@example.com',
      password: 'mentor123',
      nickname: 'MentorJohn',
      role: 'mentor',
      firstName: 'John',
      lastName: 'Doe',
      showLastName: false,
      description: '',
      visibleDisability: false,
      nonVisibleDisability: false,
      showDisability: false
    },
    {
      email: 'coach@example.com',
      password: 'coach123',
      nickname: 'CoachJane',
      role: 'coach',
      firstName: 'Jane',
      lastName: 'Smith',
      showLastName: false,
      description: '',
      visibleDisability: false,
      nonVisibleDisability: false,
      showDisability: false
    }
  ];
  