document.addEventListener('DOMContentLoaded', function() {
    const memeForm = document.getElementById('memeForm');
    const memeContainer = document.getElementById('memeContainer');

    memeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const topText = document.getElementById('topText').value;
        const bottomText = document.getElementById('bottomText').value;

        if (topText.trim() === '' || bottomText.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        fetchCatImage(topText, bottomText);
        memeForm.reset();
    });

    function fetchCatImage(topText, bottomText) {
        fetch('https://api.thecatapi.com/v1/images/search?limit=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const catImageUrl = data[0].url;
                createMeme(catImageUrl, topText, bottomText);
            })
            .catch(error => {
                console.error('There was a problem with fetching cat images:', error);
            });
    }

    function createMeme(imageUrl, topText, bottomText) {
        const memeDiv = document.createElement('div');
        memeDiv.classList.add('meme');

        const memeImg = document.createElement('img');
        memeImg.src = imageUrl;
        memeDiv.appendChild(memeImg);

        const topTextDiv = document.createElement('div');
        topTextDiv.innerText = topText;
        memeDiv.appendChild(topTextDiv);

        const bottomTextDiv = document.createElement('div');
        bottomTextDiv.innerText = bottomText;
        memeDiv.appendChild(bottomTextDiv);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function() {
            memeDiv.remove();
        });
        memeDiv.appendChild(deleteBtn);

        memeContainer.appendChild(memeDiv);
    }
});
