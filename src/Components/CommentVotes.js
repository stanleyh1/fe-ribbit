import { useState } from 'react'
import { patchCommentVotes } from '../utils/api'

const CommentVotes = (props) => {
const {commentVotes, comment_id} = props
const [addedVotes, setAddedVotes] = useState(0)
const [isError, setIsError] = useState(false)
const [disableUp, setDisableUp] = useState(false)
const [disableDown, setDisableDown] = useState(false)

const handleUpVoteClick = () => {
setAddedVotes((prevVotes) => {
    setDisableUp(true)
    return prevVotes + 1
})
patchCommentVotes(comment_id, 1)
.catch(() => {
    setIsError(true)
    setAddedVotes((prevVotes) => {
        setDisableUp(true)
        return prevVotes - 1
    })
})
}

const handleDownVoteClick = () => {
    setAddedVotes((prevVotes) => {
        setDisableDown(true)
        return prevVotes - 1
    })
    patchCommentVotes(comment_id, -1)
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
<p>Votes : {commentVotes + addedVotes}</p>
<button className='btn' disabled={disableDown} onClick={handleDownVoteClick}>👎</button>
<text>Vote for this comment!</text>
<button className='btn' disabled={disableUp} onClick={handleUpVoteClick}>👍</button>
{isError ? <p>Something went wrong!</p> : null}
</>
)
}

export default CommentVotes;