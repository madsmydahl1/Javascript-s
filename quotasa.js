var modifyResponse = (response) => {
    try {
        // Check if the response status is 304
        if (response.status === 304) {
            console.log("Response status is 304 - Not Modified");
            // Optionally force refresh logic here if needed
            return response; // Return unchanged response
        }

        // Proceed to modify the response for other statuses
        if (response.body) {
            let body = JSON.parse(response.body);
            if (body.hasOwnProperty("max") && body.max === 0) {
                body.max = 100; // Update the 'max' value to 100
            }
            response.body = JSON.stringify(body);
        }
    } catch (error) {
        console.log("Error modifying the JSON response: " + error.message);
        // Optionally return an unchanged response if there's an error
    }
    return response;
};

modifyResponse($response);