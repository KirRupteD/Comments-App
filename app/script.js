// IIFE - Immediately Invoked Function Execution
(function(){

    let current_user = null;
    let comments = null;
    let $comment_template = document.querySelector(".card_template");
    let $comment_container = document.querySelector(".comments_container");
    let $comment_section_container = document.querySelector(".comment_section_container");
    
    function initialize_user(user){
        console.log("the user", user);
        document.querySelector(".current_user_image").src =user.image.png
    }

    function display_comment(comment) {
        // Step 2. Render out each indivual comment using the display comment template
        let $card = $comment_template.querySelector(".card").cloneNode({ deep : true});

        $card.querySelector('.profile_pic').src = comment.user.image.png;
        $card.querySelector('.created_at').innerText = comment.createdAt;
        $card.querySelector('.created_at').innerText= comment.createdAt;
        $card.querySelector('.score').innerText = comment.score;
        $card.querySelector('.profile_name').innerText = comment.user.username;
        $card.querySelector('.comment').innerText = comment.content;

        $comment_container.append($card);

        // Step 3 , Check if there are `replies` on the object which is an array
        // If no replies simply exit the function
        if (!comment.replies.length) return;

        // Step 4, Render the replies if there are replies in the array [{...},{...}]
        // Replies are an array of objects 
        _display_replies(comment.replies);

        function _display_replies(replies){
            // Step 5 Make One Copy of the outter comment wrapper and reply container per COMMENT!
            let $comment_wrapper = $comment_template.querySelector(".comment_wrapper").cloneNode({ deep : true});
            let $reply_container = $comment_wrapper.querySelector(".reply_container");

            // Step 6. Since the replies are an array of objects we loop through, and create copies of the comment template
            replies.forEach(reply => {
                let $card = $comment_template.querySelector(".card").cloneNode({ deep : true});
                $card.querySelector('.profile_pic').src = reply.user.image.png;
                $card.querySelector('.created_at').innerText = reply.createdAt;
                $card.querySelector('.created_at').innerText= reply.createdAt;
                $card.querySelector('.score').innerText = reply.score;
                $card.querySelector('.profile_name').innerText = reply.user.username;
                $card.querySelector('.comment').innerText = reply.content;

                // Step 7. Append the newly created card onto the REPLY CONTAINER from Step 5
                $reply_container.append($card);
            });

            $card.after($comment_wrapper); // Step 8. append the comment_wrapper next to the sibbling of the card with go directly next to the 
            // card that is in the current loop....Scroll up you will see this function is attached to ONE SINGLE COMMENT PER LOOP
            
        }
    }

    // Find `.comment_section_template` (display:none) then use the `.comment_section_template` to find the the `.comment_section`
    // Clone `.comment_section` (diplay:block) and then attach it to the `node`
    // Form can now be reusable whereever, just pass in the node where the reply form must be appended
    function display_reply_form($node) {
        let $comment_reply_template = document.querySelector(".comment_reply_template");
        let $comment_reply_form = $comment_reply_template .querySelector(".comment_section").cloneNode({deep:true});
        $node.append($comment_reply_form);
    }
    
async function init() {
    // This will show at the bottom for All comments, always called on initialization
    display_reply_form($comment_section_container);

    try {
        response = await axios.get('../data.json');
        current_user = response.data.currentUser;
        initialize_user(current_user);
        
        comments = [...response.data.comments];
        // Step 1. Get all Comments in JSON file and loop through for each comment
        comments.forEach(comment => display_comment(comment));


    } catch(e) {
        console.log(e.message);
    }
}

init();


})();