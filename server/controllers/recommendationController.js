const { spawn } = require('child_process');

// Function to recommend based on course
const recommendCourse = (req, res) => {
    const courseName = req.query.course;
    
    // Call Python script with the function name 'recommend' and course name
    const python = spawn('python', ['python_scripts/recommendation.py', 'recommend', courseName]);

    let result = '';
    python.stdout.on('data', (data) => {
        result += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    python.on('close', (code) => {
        if (code === 0) {
            res.json({ recommendations: result.split('\n') });
        } else {
            res.status(500).json({ error: 'Error in Python script' });
        }
    });
};

// Function for clustering-based recommendations
const clusterRecommendations = (req, res) => {
    const python = spawn('python', ['python_scripts/recommendation.py', 'cluster']);

    let result = '';
    python.stdout.on('data', (data) => {
        result += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    python.on('close', (code) => {
        if (code === 0) {
            res.json({ recommendations: result });
        } else {
            res.status(500).json({ error: 'Error in Python script' });
        }
    });
};

// Function for performance-based recommendations
const performanceRecommendations = (req, res) => {
    const {user_interests, difficulty_level, top_n = 5, n_clusters = 5} = req.body;
    
    const python = spawn('python', [
        'python_scripts/recommendation.py',
        'performance',   
        user_interests,
        difficulty_level, 
        top_n.toString(),
        n_clusters.toString()
    ]);

    let result = '';
    python.stdout.on('data', (data) => {
        result += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error('Python Error:', data.toString());
    });

    python.on('close', (code) => {
        if (code === 0) {
            try {
                // Split the output into lines and parse each line as JSON
                const recommendations = result
                    .trim()
                    .split('\n')
                    .filter(line => line) // Remove empty lines
                    .map(line => {
                        try {
                            // Parse the string as JSON object
                            return JSON.parse(line.replace(/'/g, '"'));
                        } catch (e) {
                            console.error('Error parsing line:', line);
                            return null;
                        }
                    })
                    .filter(item => item !== null); // Remove any failed parses

                res.json({ recommendations });
            } catch (error) {
                console.error('Error processing recommendations:', error);
                res.status(500).json({ error: 'Error processing recommendations' });
            }
        } else {
            res.status(500).json({ error: 'Error in Python script' });
        }
    });
};
module.exports = { recommendCourse, clusterRecommendations, performanceRecommendations };
