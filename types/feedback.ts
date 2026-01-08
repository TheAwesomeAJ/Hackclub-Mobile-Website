export interface FeedbackData {
  opinion: 'good' | 'bad';
  url?: string;
  message: string;
  slackId?: string; // Optional, to DM the user
}

export interface ActionResponse {
  slackTs: string;
}
