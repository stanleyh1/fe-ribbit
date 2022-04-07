import { useState } from 'react'
import { patchVotes } from '../utils/api'

export default function Votes(props) {
const {votes, article_id} = props
const [addedVotes, setAddedVotes] = useState(0)
const [isError, setIsError] = useState(false)

const handleClick = () => {
setAddedVotes((prevVotes) => {
    return prevVotes + 1
})
patchVotes(article_id, 1)
.catch(() => {
    setIsError(true)
    setAddedVotes((prevVotes) => {
        return prevVotes - 1
    })
})
}

return (
<>
<p className='votes'>Votes : {votes + addedVotes}</p>
<button className='btn' onClick={handleClick} >👎</button> 
<text>Vote for this article!</text>
<button className='btn'>👍</button>
{isError ? <p>Something went wrong!</p> : null}
</>
)
}