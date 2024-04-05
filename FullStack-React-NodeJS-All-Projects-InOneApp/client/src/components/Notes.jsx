import React, { useContext } from 'react'
import UserContext from '../context/userContext';

const Notes = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='max-h-full'>
      {
        user
          ?
          <div className='iframe-container' >
            <iframe src="https://notes-in-folders-meg.netlify.app/" allowFullScreen ></iframe>
          </div>
          :
          <div style={{
            backgroundColor: '#d32f2f', /* Deep red background */
            color: '#fff', /* White text for contrast */
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'left', /* Left-aligned text for formality */
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Subtle shadow for depth */
            maxWidth: '700px',
            margin: '20px auto', /* Center div with more margin */
            fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' /* Modern, sans-serif font */
          }}>
            <h1 style={{
              fontSize: '24px', /* Conservative font size */
              borderBottom: '2px solid #fff', /* White underline title for emphasis */
              paddingBottom: '10px', /* Spacing under title */
              marginBottom: '20px' /* Spacing after title */
            }}>Access Restricted - Notes</h1>
            <p style={{
              fontSize: '16px', /* Standard text size */
              lineHeight: '1.6',
              marginBottom: '10px' /* Spacing between paragraphs */
            }}>This area is reserved for members only. Please <a href="/login" style={{
              color: '#ffcccb', /* Soft red for links */
              textDecoration: 'none' /* No underline to maintain formality */
            }}>sign in</a> to view this content.</p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6'
            }}>If you are not a member, <a href="/signup" style={{
              color: '#ffcccb',
              textDecoration: 'none'
            }}>register here</a> for access.</p>
          </div>
          
          
          




      }

    </div>
  );
}

export default Notes