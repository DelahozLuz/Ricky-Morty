import React, { useState } from 'react';

const CommentSection = ({ character, goBack }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg relative">
     
      <button 
        onClick={goBack} 
        className="text-white absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700"
      >
        ✖
      </button>
      
      <h2 className="text-xl text-white">{character.name}</h2>
      <div className="mt-4">
        <textarea
          placeholder="Escribe un comentario..."
          className="w-full p-2 text-gray-700 bg-gray-200 rounded-md"
          rows="3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Agregar Comentario
        </button>
      </div>
      <div className="mt-4">
        <h4 className="text-white">Comentarios:</h4>
        {comments.length === 0 ? (
          <p className="text-gray-400">No hay comentarios aún.</p>
        ) : (
          <ul className="text-gray-300 text-sm">
            {comments.map((comment, index) => (
              <li key={index} className="mt-1">{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
