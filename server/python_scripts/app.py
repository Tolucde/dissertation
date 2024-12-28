import sys
import json
from recommendation import performance_based_recommendations  # Import your existing model

def get_recommendations():
    # Get arguments passed from Node.js
    input_data = json.loads(sys.argv[1])
    
    user_interests = input_data.get('interests', [])
    current_level = input_data.get('currentLevel', 1)
    performance = input_data.get('performance', 85)

    recommendations = performance_based_recommendations(
        user_performance=performance,
        current_level=current_level,
        user_interests=user_interests,
        top_n=5
    )

    # Print the result as JSON string
    print(json.dumps(recommendations))

if __name__ == '__main__':
    get_recommendations()