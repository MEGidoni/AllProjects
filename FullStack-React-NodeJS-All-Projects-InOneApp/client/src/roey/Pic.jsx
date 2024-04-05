import React, { useState, useEffect } from 'react';

const Pic = ({ product_name }) => {


// =================================================================================================================

    const [hits, setHits] = useState([]);
    const doapi = async (para) => {
        const url = `https://pixabay.com/api/?key=42273281-ac99308934da16e398efe65d1&q=${para}&image_type=photo&pretty=true&safesearch=true`;
        try {

            let response = await fetch(url);

            let data = await response.json();

            setHits(data.hits);

        } catch (err) {
            console.log(err);
            console.log("Error fetching");
        }
    }

    useEffect(() => {
        doapi(`${product_name}`);
    }, [])




// =================================================================================================================================

    return (
        <div>
            {hits.length > 0 && <img className='h-auto w-auto rounded-lg' src={hits[10]?.previewURL?hits[10].previewURL:hits[0].previewURL} alt="Product Picture" />}
        </div>
    )
}

export default Pic