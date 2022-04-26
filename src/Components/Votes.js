import { useState } from 'react';
import { patchVotes } from '../utils/api';

export default function Votes(props) {
const {votes, article_id} = props
const [addedVotes, setAddedVotes] = useState(0)
const [isError, setIsError] = useState(false)
const [disableUp, setDisableUp] = useState(false)
const [disableDown, setDisableDown] = useState(false)

const handleUpVoteClick = () => {
setAddedVotes((prevVotes) => {
    setDisableUp(true)
    return prevVotes + 1
})

patchVotes(article_id, 1)
.catch(() => {
    setIsError(true)
    setDisableUp(true)
    setAddedVotes((prevVotes) => {
        return prevVotes - 1
    })
})
}

const handleDownVoteClick = () => {
    setDisableDown(true)
    setAddedVotes((prevVotes) => {
        return prevVotes - 1
    })

    patchVotes(article_id, -1)
    .catch(() => {
    setIsError(true)
    setDisableDown(true)
    setAddedVotes((prevVotes) => {
        return prevVotes + 1
    })
})
}



return (
<>
<p className='votes'>Votes : {votes + addedVotes}</p>
<button className='btn' disabled={disableDown} onClick={handleDownVoteClick}>👎</button> 
<text> Vote for this article! </text>
<button className='btn' disabled={disableUp} onClick={handleUpVoteClick}>👍</button>
{isError ? <p>Something went wrong!</p> : null}
</>
)
}