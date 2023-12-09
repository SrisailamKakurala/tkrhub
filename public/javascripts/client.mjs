const page = document.querySelector('#page');
const postbtn = document.querySelector('#post');


(function reloadPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            // console.log('Posts fetched:', posts);
            posts.forEach(post => {
                // console.log(post);
                appendPost(post.title, post.content, post.createdAt)
            })
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
})()




const title = document.querySelector('#title');
const textarea = document.querySelector('#textarea');
postbtn.addEventListener('click', (event) => {
    // console.log(event);
    var titleVal = title.value;
    var textareaVal = textarea.value;
    if (titleVal != '' && textareaVal != '') {
        // console.log('clicked')
        appendPost(titleVal.trim(), textareaVal.trim());
        title.value = titleVal.trim();
        textarea.value = textareaVal.trim();
    }

})


function appendPost(titleVal, textareaVal, createdAt) {
    const post = `
    <section id="postSection" class="md:w-[80%] w-[100%] bg-white mx-auto rounded shadow-xl p-7 flex flex-col gap-3 mb-[50px] border-b-4 border-slate-700 rounded" >
            <div class="w-full flex flex-col gap-3 md:p-2 p-1">
                <h1 id="title" class="text-green-800 text-xl font-bold whitespace-normal">${titleVal}</h1>
                <pre id="content" class="whitespace-pre-wrap">${textareaVal}</pre>
            </div>

            <div class="text-slate-700 md:px-2 p-2 bg-green-600 w-1/3 text-center mx-auto text-white rounded-full">${createdAt || 'recent post'}</div>

    </section>
    `


    // Create a new DOMParser
    var parser = new DOMParser();

    // Parse the HTML string
    var doc = parser.parseFromString(post, 'text/html');

    // Access the parsed <div> element
    var divElement = doc.body.firstChild;

    // Now you can use the divElement as a regular DOM element
    // console.log(divElement); // You can use it as needed in your code

    page.insertBefore(divElement, page.firstChild)


}

