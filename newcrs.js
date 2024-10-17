var modifyResponse = (response) => {
    try {
        // Parse the response body
        let body = JSON.parse(response.body);

        // Modify the 'max' field if it exists and is 0
        if (body.hasOwnProperty("max") && body.max === 0) {
            body.max = 100; // Update the 'max' value to 100
        }

        // Modify 'remaining' or other relevant fields if needed
        if (body.hasOwnProperty("remaining") && body.remaining === 0) {
            body.remaining = 100; // Optionally update remaining requests
        }

        // Modify resetTime if it exists
        if (body.hasOwnProperty("resetTime")) {
            // Example: Set reset time far into the future (adjust as needed)
            body.resetTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days from now
        }

        // Stringify the modified body back to response
        response.body = JSON.stringify(body);
    } catch (error) {
        console.log("Error modifying the JSON response: " + error.message);
    }

    return response;
};

modifyResponse($response);