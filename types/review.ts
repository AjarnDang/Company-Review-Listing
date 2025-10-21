export interface Review {
  id: string;
  companyId: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  title: string;
  content: {
    en: string;
    th: string;
  };
  date: string;
  verified: boolean;
  helpful: number;
  companyReply?: {
    content: {
      en: string;
      th: string;
    };
    date: string;
  };
}

