var friends = require("../data/friends.js");

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        // take the result's surbey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        // this variable will calculate the diffrence between the user's scores and the scores of 
        // each user in the DB
        var totalDifference = 0;

        // here we loop through all the friend possiblities in the DB
        for(var i=0; i<friends.length; i++){
            console.log(friends[i].name);
            totalDifference = 0;

        // we then loop through all the scores of each friend
        for (var j=0; j< friends[i].scores[j]; j++) {

        // we calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // if the sum of the differences is less than the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference){

            // reset the bestMatch to be the new friend
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
            }
        }


        }
        // finally save the user's data to the DB
        friends.push(userData);
        // return JSON with the user's bestMatch, used by html in next page
        res.json(bestMatch);

    });
}