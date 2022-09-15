import React, { useState, useEffect } from 'react'

// closure
function News() {

    // let dataResults = []
    // console.log(dataResults);
    // console.log("I've been rendered");
    const [count, setCount] = useState(0)
    const [articles, setArticles] = useState([]) //hold the articles from our API
    const [filteredArr, setFilteredArr] = useState([])
    const [filteredText, setFilteredText] = useState("")

    console.log(articles);  //state

    //componentDidMount 
    //componentDidUpdate
    useEffect(() => {

        const newsData = async () => {
            let response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0cf790498275413a9247f8b94b3843fd')
            let data = await response.json()
            // console.log(data);
            setArticles(data.articles)
            setFilteredArr(data.articles)
        }
        newsData()
    }, [])

    const handleChange = (e) => {
        setFilteredText(e.target.value)
        console.log('input has changed', e.target.value);
        let filteredArticles = articles.filter(articleObj => {
            return articleObj.title.toLowerCase().includes(filteredText.toLowerCase())
        })
        setFilteredArr(filteredArticles)
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <input type="text" value={filteredText} onChange={handleChange} />
            <ul>
                {filteredArr.map((article, index) => {
                    return <li key={index}>
                        <h2>{article.title}</h2>
                        <img src={article.urlToImage} alt="" height="200px" />
                        <p>{article.description}</p>

                    </li>
                })}
            </ul>
        </>
    )
}

export default News