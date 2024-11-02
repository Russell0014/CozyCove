import PropTypes from 'prop-types';

const SearchResults = ({ results = [], hasSearched = false }) => {

    if (hasSearched && results.length === 0) {
        return <p className="text-gray-500 text-center p-4">No results found</p>;
    }
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {results.map((result) => (
                <div
                    key={result._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm"
                >
                    <div className="relative h-48">
                        <img
                            src={result.images.picture_url}
                            alt={result.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg mb-2 text-gray-800">
                                {result.name}
                            </h3>
                            <span className="text-lg font-bold text-indigo-600">
                                ${result.price.$numberDecimal}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {result.summary || 'No description available'}
                        </p>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-500">
                                {result.address.market}
                            </span>
                            {result.review_scores?.review_scores_rating && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-sm text-gray-600">
                                        {result.review_scores.review_scores_rating}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

SearchResults.propTypes = {

        results: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            images: PropTypes.shape({
                picture_url: PropTypes.string.isRequired
            }).isRequired,
            price: PropTypes.shape({
                $numberDecimal: PropTypes.string.isRequired
            }).isRequired,
            summary: PropTypes.string,
            address: PropTypes.shape({
                market: PropTypes.string.isRequired
            }).isRequired,
            review_scores: PropTypes.shape({
                review_scores_rating: PropTypes.number
            })
        })),
        hasSearched: PropTypes.bool
    };

export default SearchResults;