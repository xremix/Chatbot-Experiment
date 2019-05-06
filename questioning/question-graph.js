var path = [];
      var question = "I want to know about product Kugelschreiber"
      var questions = [
        {
          index: 0,
          answerText: "Hello",
          validator: function(){return false},
          questions: [

          ]
        },{
          index: 1,
          answerText: "Which product?",
          validator: function(){return true},
          questions: [
            {
              index: 0,
              answerText: "Product XY is very expensive",
              validator: function(){return false},
              questions: null
            },
            {
              index: 1,
              answerText: "This Product is perfect for your use case",
              validator: function(){return true},
              questions: null
            }
          ]
        }
      ]




      function findAnswer(p, q){
          var i;
          var questionsToFind = questions;
          if(q){
            while(i = q.pop()){
              questionsToFind = questionsToFind[i].questions;
            } 
          }

          for (var i = 0; i < questionsToFind.length; i++) {
            if(questionsToFind[i].validator()){
              if(!questionsToFind[i].questions){
                path = null;
              }else{
                path.push(questionsToFind[i].index);
              }
              return questionsToFind[i];
            }
          }

          path = null;
          return {
            answerText: "I don't know what you mean",
            validator: function(){return true},
            questions: null
          };
      }


      // console.log(findAnswer("hi").answerText);
      console.log(findAnswer("I got a question for a product", path).answerText);
      console.log(findAnswer("A pen", path).answerText);
