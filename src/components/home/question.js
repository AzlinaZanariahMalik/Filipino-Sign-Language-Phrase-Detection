import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, Button, Checkbox } from 'antd';
const { TextArea } = Input;

const Result = () =>{
  return(
    <p>Your Question has been sent.</p>
  );
};
function AppQuestion() {
  const [result, showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
     .sendForm("service_a5czqy4","template_r0jiy9a",e.target,"user_NxMahzNrLGnHRzU0WOlyI")
     .then(
       (result) => {
         console.log(result.text);
       },
       (error) => {
         console.log(error.text);
       }
     ); 
     e.target.reset();
     showResult(true);
   
};
setTimeout(() =>{
  showResult(false)
}, 3000)
//form need to refract not working on react library
  return (
    <div id="question" className="block questionBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2> <i className="fas fa-question-circle"></i>  Ask a Question</h2>
          <p>Send your questions here.</p>
        </div>
    
        <Form  
          name="ask"
          className="ask-form"    
        >
          <form className="formInput" action="" onSubmit={sendEmail} >
           <div className="formBox">
             <br />
             <input className="form-control" type="text" name="username" placeholder="Username" required />
             <br />
             <input className="form-control" type="email" name="user_email" placeholder="Email" required />
             <br />
             <input className="form-control" type="text" name="subject" placeholder="Subject" required />
             <br />
             <textarea className="form-control" type="text" name="message" placeholder="Enter Your Questions here.." required></textarea>
             <br />
             <button>Send</button>
             <br />
             <div className="status">{result ? <Result/> : null}</div>
           </div>
          </form>
         
        </Form>
      </div>
    </div>  
  );
}

export default AppQuestion;