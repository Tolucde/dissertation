import sys
import pandas as pd
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from nltk.stem.porter import PorterStemmer
from sklearn.preprocessing import LabelEncoder


# Load and preprocess data
script_dir = os.path.dirname(os.path.abspath(__file__))
# Load and preprocess data
data = pd.read_csv(os.path.join(script_dir, 'Coursera.csv'))
# data = pd.read_csv('./Coursera.csv')
# print(data)
# Preprocessing functions
def preprocess_data():
    # Modify the original DataFrame columns
    data['Course Name'] = data['Course Name'].str.replace(' ', ',')
    data['Course Name'] = data['Course Name'].str.replace(',,', ',')
    data['Course Name'] = data['Course Name'].str.replace(':', '')
    data['Course Description'] = data['Course Description'].str.replace(' ', ',')
    data['Course Description'] = data['Course Description'].str.replace(',,', ',')
    data['Course Description'] = data['Course Description'].str.replace('_', '')
    data['Course Description'] = data['Course Description'].str.replace(':', '')
    data['Course Description'] = data['Course Description'].str.replace('(', '')
    data['Course Description'] = data['Course Description'].str.replace(')', '')
    data['Skills'] = data['Skills'].str.replace('(', '')
    data['Skills'] = data['Skills'].str.replace(')', '')

    # Create tags
    data['tags'] = data['Course Name'] + data['Difficulty Level'] + data['Course Description'] + data['Skills']

    # Create a new DataFrame (explicit copy)
    new_df = data[['Course Name', 'Difficulty Level', 'Course Rating', 'tags']].copy()  # Added required columns
    new_df['tags'] = new_df['tags'].str.replace(',', ' ')
    new_df['Course Name'] = new_df['Course Name'].str.replace(',', ' ')
    new_df.rename(columns={'Course Name': 'course_name'}, inplace=True)
    new_df['tags'] = new_df['tags'].apply(lambda x: x.lower())
    return new_df
# preprocess_data()

# Function to recommend courses
def recommend(course, new_df, similarity):
    course = course.replace(':', '').lower().strip()  # Normalize input
    new_df['course_name'] = new_df['course_name'].str.lower().str.strip()  # Normalize dataset
    if course not in new_df['course_name'].values:
        raise ValueError(f"The course '{course}' was not found in the dataset.")
    course_index = new_df[new_df['course_name'] == course].index[0]
    distances = similarity[course_index]
    course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:7]
    # Return list of dictionaries with course and difficulty
    return [{'course': new_df.iloc[i[0]].course_name, 'difficulty': new_df.iloc[i[0]]['Difficulty Level']} for i in course_list]



# # Function to perform clustering
def cluster_recommendations(n_clusters=5):
    data['Difficulty_Level_Num'] = data['Difficulty Level'].map({'Beginner': 1, 'Intermediate': 2, 'Advanced': 3})
    features = pd.get_dummies(data[['Difficulty_Level_Num']])
    scaler = MinMaxScaler()
    scaled_features = scaler.fit_transform(features)
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    data['Cluster'] = kmeans.fit_predict(scaled_features)
    return data[['Course Name', 'Cluster']]

# Function for performance-based recommendations
# Function for performance-based recommendations
def performance_based_recommendations(user_interests, difficulty_level, top_n=5, n_clusters=5):
    # Ensure all interests are strings (in case of invalid input)
    user_interests = [str(interest).lower() for interest in user_interests]

    # Preprocess course data to create tags and ensure they exist
    new_df = preprocess_data()

    # Preprocess the user's interests into a single lowercased string
    user_interests_str = ' '.join(user_interests)

    # Preprocess course tags for clustering
    new_df['interest_match'] = new_df['tags'].apply(lambda x: all(interest in x for interest in user_interests))  # Match all interests
    new_df['difficulty_match'] = new_df['Difficulty Level'] == difficulty_level
    
    # Convert categorical data (Difficulty Level) into numerical format for clustering
    le = LabelEncoder()
    new_df['Difficulty_Level_Num'] = le.fit_transform(new_df['Difficulty Level'])
    
    # Add feature columns for KMeans clustering
    features = new_df[['interest_match', 'difficulty_match', 'Difficulty_Level_Num']]
    
    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    new_df['Cluster'] = kmeans.fit_predict(features)

    # Filter courses based on user interests and difficulty level
    filtered_data = new_df[
        (new_df['interest_match'] == True) & 
        (new_df['Difficulty Level'] == difficulty_level)
    ]
    
    # If no courses match all user interests, recommend the ones that match any of the interests
    if filtered_data.empty:
        filtered_data = new_df[
            (new_df['tags'].str.contains('|'.join(user_interests), case=False)) &
            (new_df['Difficulty Level'] == difficulty_level)
        ]
    
    # Sort the filtered data by course rating (descending)
    sorted_courses = filtered_data.sort_values('Course Rating', ascending=False)
    
    return sorted_courses[['course_name', 'Difficulty Level']].head(top_n).apply(
        lambda x: {'course': x['course_name'], 'difficulty': x['Difficulty Level']}, axis=1
    ).tolist()



# Example Usage
# user_interests = ['finance']  # Replace with user-provided interests
# user_difficulty_level = 'Advanced'  # Replace with user's preferred difficulty level
# print("\nPersonalized Cold-Start Recommendations based on Interests, Difficulty Level, and KMeans Clustering:")
# print(performance_based_recommendations(user_interests, user_difficulty_level))

# Main execution block to call the appropriate function
if __name__ == "__main__":
    function_name = sys.argv[1]  # First argument is the function to call
    if function_name == "recommend":
        course = sys.argv[2]
        new_df = preprocess_data()  # Ensure preprocess_data is called
        cv = CountVectorizer(max_features=5000, stop_words='english')
        vectors = cv.fit_transform(new_df['tags']).toarray()
        similarity = cosine_similarity(vectors)
        recommendations = recommend(course, new_df, similarity)
        # Convert recommendations to JSON-friendly string
        print("\n".join([f"{{'course': '{r['course']}', 'difficulty': '{r['difficulty']}'}}" for r in recommendations]))
    elif function_name == "cluster":
        recommendations = cluster_recommendations()
        print(recommendations)
    elif function_name == "performance":
        top_n = int(sys.argv[4])  # Number of recommendations
        n_clusters = int(sys.argv[5])  # Number of clusters
        user_interests = sys.argv[2].split(",")  # Get the user interests as a list of strings
        difficulty_level = sys.argv[3]  # Difficulty level

        recommendations = performance_based_recommendations(user_interests, difficulty_level, top_n, n_clusters)
        print("\n".join([f"{{'course': '{r['course']}', 'difficulty': '{r['difficulty']}'}}" for r in recommendations]))
    else:
        print("Invalid function name")


