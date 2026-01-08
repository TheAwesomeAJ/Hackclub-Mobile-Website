'use client';
import { useState, useTransition } from 'react';
import type { FeedbackData, ActionResponse } from '@/types/feedback';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export default function FeedbackPage() {
  const [opinion, setOpinion] = useState<'good' | 'bad' | null>(null);
  const [message, setMessage] = useState('');
  const [slackId, setSlackId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeOpinion = opinion;

  function submit(e?: React.SyntheticEvent) {
    e?.preventDefault();
    if (!opinion || !message) return;

    startTransition(async () => {
      const feedback: FeedbackData = {
        opinion,
        message,
        url: window.location.href,
        slackId,
      };

      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: feedback.url, feedback }),
      }).then((res) => res.json() as Promise<ActionResponse>);

      setSubmitted(true);
      setMessage('');
      setOpinion(null);
      setSlackId('');
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Thanks for your feedback!</h1>
        <button
          className={cn(buttonVariants({ variant: 'secondary' }))}
          onClick={() => setSubmitted(false)}
        >
          Submit Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <div className="flex gap-2 mb-4">
        <button
          className={cn(buttonVariants({ variant: activeOpinion === 'good' ? 'default' : 'outline' }))}
          onClick={() => setOpinion('good')}
        >
          <ThumbsUp /> Good
        </button>
        <button
          className={cn(buttonVariants({ variant: activeOpinion === 'bad' ? 'destructive' : 'outline' }))}
          onClick={() => setOpinion('bad')}
        >
          <ThumbsDown /> Bad
        </button>
      </div>

      <form className="flex flex-col gap-3" onSubmit={submit}>
        <textarea
          placeholder="Leave your feedback..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded-lg p-3 resize-none w-full"
        />
        <input
          type="text"
          placeholder="Slack ID (optional, for DM)"
          value={slackId}
          onChange={(e) => setSlackId(e.target.value)}
          className="border rounded-lg p-3 w-full"
        />
        <button type="submit" disabled={isPending} className={cn(buttonVariants({ variant: 'default' }))}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
