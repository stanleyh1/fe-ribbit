import { useState } from 'react'
import { patchCommentVotes } from '../utils/api'

const CommentVotes = (props) => {
const {commentVotes, comment_id} = props
const [addedVotes, setAddedVotes] = useState(0)
const [isError, setIsError] = useState(false)

const handleClick = () => {
setAddedVotes((prevVotes) => {
    return prevVotes + 1
})
patchCommentVotes(comment_id, 1)
.catch(() => {
    setIsError(true)
    setAddedVotes((prevVotes) => {
        return prevVotes - 1
    })
})
}

return (
<>
<p>Votes : {commentVotes + addedVotes}</p>
<button className='btn' onClick={handleClick} >
                Vote for this comment!
</button> 
{isError ? <p>Something went wrong!</p> : null}
</>
)
}

export default CommentVotes;