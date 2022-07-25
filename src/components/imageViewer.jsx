import React from 'react'

const imageViewer = ({ imageUrl }) => {
    const closeImageViewer = () => {
        const imageViewer = document.querySelector('#image-viewer')
        imageViewer.classList?.remove('active')
    }

    return (
        <>
            <div id="image-viewer">
                <span className="close" onClick={() => closeImageViewer()}>&times;</span>
                <img src={imageUrl} className="modal-content" id="full-image" />
            </div>
        </>
    )
}

export default imageViewer