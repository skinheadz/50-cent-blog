import React, {useState} from 'react';

//import {useRouter} from 'next/router'

export default function SendPost() {
    const [author, setAuthor] = useState("");
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");
  
    //   Form validation
    // const [errors, setErrors] = useState({});
  
    // //   Setting button text
    // const [buttonText, setButtonText] = useState("Send");
  
    // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // const [showFailureMessage, setShowFailureMessage] = useState(false);
    // if (!!errors) console.log("errors", errors);
    //const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { author, header, message }
        try {
          const response = await fetch('/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
          //console.log(response);
          if (response.status !== 200) {
            console.log('something went wrong')
          } else {
            resetForm()
            console.log('form submitted successfully !!!')
            // router.push({
            //   pathname: '/'
            // });
            location.replace('/');
            };       
        } catch (error) {
          console.log('there was an error submitting', error)
        }
      }
      
      const resetForm = () => {
        setAuthor('')
        setHeader('')
        setMessage('')
      };

    return (
      <>
        <form onSubmit={ handleSubmit }>
            <h1 className="header">
              Send your favorite 50 Cent finding:
            </h1>
  
            <label
              htmlFor="author"
              className="subheader"
            >
              Anonymous name/Email
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              name="author"
              class="input"
              required
            />
  
            <label
              htmlFor="header"
              className="subheader"
            >
              Blogpost Header
            </label>
            <input
              type="text"
              name="header"
              value={header}
              onChange={(e) => {
                setHeader(e.target.value);
              }}
              class="input"
              required
            />

            <label
              htmlFor="message"
              className="subheader"
            >
              Blogpost Body
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              class="textarea"
              required
            ></textarea>

            <div className="flex flex-row items-center justify-start">
            <button type="submit" class="submit">
            Send  
              </button>
            </div>


          
          </form>
      </>
    );
  }
