import React, { useState } from 'react';
import axios from 'axios';

function EmailForm() {
  const [emails, setEmails] = useState('');
  const [names, setNames] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEmailsChange = (event) => {
    setEmails(event.target.value);
  };

  const handleNamesChange = (event) => {
    setNames(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleSubjectChange = (event) =>{
    setSubject(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/send-email', { emails,names, message , subject });
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred while sending the email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Enter Email Addresses (comma-separated):
          <input type="text" value={emails} onChange={handleEmailsChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Names (comma-separated):
          <input type="text" value={names} onChange={handleNamesChange} />
        </label>
      </div>
      <div>
        <label>
          Subject:
          <input value={subject} onChange={handleSubjectChange} />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea value={message} onChange={handleMessageChange} />
        </label>
      </div>
      <button type="submit" disabled={loading}>Send</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Email sent successfully!</p>}
    </form>
  );
}

export default EmailForm;