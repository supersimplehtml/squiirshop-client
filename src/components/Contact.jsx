import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    to: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/process/contact', formData);
      
      if (response.status === 200) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          to: '',
          message: ''
        });
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="contact-container" style={{
      padding: '2rem',
      minHeight: '100vh',
      background: 'linear-gradient(270deg, #240046 0%, #ff6d00 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
      }}>
        Get in Touch with Us!
      </h1>
      
      {status === 'success' && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          Message sent successfully!
        </div>
      )}

      {status === 'error' && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          Failed to send message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="name"
            style={{
              color: 'white',
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter your name"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="email"
            style={{
              color: 'white',
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}
          >
            From (Email Address)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="to"
            style={{
              color: 'white',
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}
          >
            To (Name)
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter recipient email"
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label 
            htmlFor="message"
            style={{
              color: 'white',
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1.1rem'
            }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              minHeight: '150px',
              resize: 'vertical'
            }}
            placeholder="Enter your message"
          />
        </div>

        <button 
          type="submit"
          disabled={status === 'sending'}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            border: 'none',
            background: status === 'sending' ? '#cccccc' : 'white',
            color: '#ff6d00',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              transform: status === 'sending' ? 'none' : 'translateY(-2px)',
              boxShadow: status === 'sending' ? 'none' : '0 5px 15px rgba(0,0,0,0.3)'
            }
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
