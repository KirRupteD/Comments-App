// IIFE - Immediately Invoked Function Execution
(function(){

    let current_user = null;
    let comments = null;
    let $comment_template = document.querySelector(".card_template");
    let $comment_container = document.querySelector(".comments_container");
    
    function initialize_user(user){
        console.log("the user", user);
        document.querySelector(".current_user_image").src =user.image.png
    }

    function display_comment(comment) {
        console.log(comment);
        let $card = $comment_template.querySelector(".card").cloneNode({ deep : true});

        $card.querySelector('.profile_pic').src = comment.user.image.png;
        $card.querySelector('.created_at').innerText = comment.createdAt;
        $card.querySelector('.created_at').innerText= comment.createdAt;
        $card.querySelector('.score').innerText = comment.score;
        $card.querySelector('.profile_name').innerText = comment.user.username;
        $card.querySelector('.comment').innerText = comment.content;

        $comment_container.append($card);
    }

    
    // Create function that copies the node populate it and then appends to the paretn container... this is for comments
async function init() {
    try {
        response = await axios.get('../data.json');
        current_user = response.data.currentUser;
        initialize_user(current_user);
  
        comments = [...response.data.comments];
        comments.forEach(comment => display_comment(comment));


    } catch(e) {
        console.log(e.message);
    }
}

init();


})();