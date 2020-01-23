export default function GetSubReddit(subReddit) {
    fetch("https://www.reddit.com/r/" + subReddit + ".json")
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log(myJson.data.children[0].data.subreddit);
            sessionStorage.setItem(
                "dataFrom_r/" + subReddit,
                JSON.stringify({ subRedditData: myJson })
            );
        });
}
