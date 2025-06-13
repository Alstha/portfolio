import { useState, useEffect } from 'react'

interface FeedbackForm {
  name: string
  rating: number
  comment: string
}

export default function Feedback() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackForm>({
    name: '',
    rating: 0,
    comment: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(true)
    }, 15000) // 15 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      })

      if (response.ok) {
        setShowFeedback(false)
        alert('Thank you for your feedback!')
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showFeedback) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[var(--background)]/90 backdrop-blur-sm rounded-2xl border border-[var(--border)]/50 p-6 shadow-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            How is my portfolio looking?
          </h3>
          <button
            onClick={() => setShowFeedback(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={feedback.name}
              onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
              required
              className="w-full px-4 py-2 bg-[var(--background)]/50 border border-[var(--border)]/50 rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] mb-2">How do you feel about it?</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFeedback({ ...feedback, rating })}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    feedback.rating === rating
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--background)]/50 text-[var(--text-muted)] hover:bg-[var(--background)]/80'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              placeholder="Any comments? (optional)"
              value={feedback.comment}
              onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
              className="w-full px-4 py-2 bg-[var(--background)]/50 border border-[var(--border)]/50 rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !feedback.name || !feedback.rating}
              className="px-6 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 