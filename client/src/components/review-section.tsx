import { useQuery } from "@tanstack/react-query";
import { type Review } from "@shared/schema";

interface ReviewSectionProps {
  providerId: string;
}

export default function ReviewSection({ providerId }: ReviewSectionProps) {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/providers", providerId, "reviews"],
    queryFn: async () => {
      const response = await fetch(`/api/providers/${providerId}/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return response.json();
    }
  });

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Recently";
    const now = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="border-b border-gray-200 pb-6 animate-pulse">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.patientName}</h4>
                  <p className="text-warm-gray text-sm">{formatDate(review.createdAt)}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="text-warm-gray leading-relaxed">{review.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comment text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-warm-gray">Be the first to leave a review for this provider.</p>
          </div>
        )}
      </div>
      
      {reviews.length > 0 && (
        <button className="text-primary-custom font-medium mt-4 hover:text-primary-custom/80">
          Read All Reviews ({reviews.length})
        </button>
      )}
    </div>
  );
}
